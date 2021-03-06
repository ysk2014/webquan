<?php namespace App\Services\Home\Comment;

use Lang;
use App\Models\Home\Article as ArticleModel;
use App\Models\Home\Comment as CommentModel;
use App\Models\User as UserModel;
use App\Services\Home\Comment\CommentValidate;
use App\Services\BaseProcess;
use App\Events\SendNews;
use Redis;

/**
 * 评论相关处理
 *
 * @author ysk
 */
class Process extends BaseProcess
{

    /**
     * 评论模型
     * 
     * @var object
     */
    private $commentModel;

    /**
     * 评论表单验证对象
     * 
     * @var object
     */
    private $commentValidate;

    /**
     * 文章模型
     * 
     * @var object
     */
    private $articelModel;


    /**
     * redis缓存链接
     * 
     * @var object
     */
    private $redis;


    /**
     * 初始化
     *
     * @access public
     */
    function __construct()
    {
        if( ! $this->articelModel) $this->articelModel = new ArticleModel();
        if( ! $this->commentModel) $this->commentModel = new CommentModel();
        if( ! $this->commentValidate) $this->commentValidate = new CommentValidate();
        if( ! $this->redis) $this->redis = Redis::connection();
    }


    /**
     * 对评论内容处理
     *
     * @param $content   
     */
    public function dealContent($content) {
        $arr = explode(' ',$content);
        $replyName = str_replace('@','',$arr[0]);
        $replyInfo = (new UserModel())->infoByName($replyName);

        $tpl = '<a href="/user/'.$replyInfo['id'].'" class="maleskine-author" target="_blank">'.$arr[0].'</a> ';
        
        return array('content'=>str_replace($arr[0],$tpl,$content),'replyInfo'=>$replyInfo);
    }

    /**
     * 增加评论
     */
    public function addComment($data)
    {
        
        if( ! $this->commentValidate->add($data)) return array('rc'=>4001,'msg'=>$this->commentValidate->getErrorMessage());

        if (isset($data['pid']) && !empty($data['pid'])) {
            $dealData=$this->dealContent($data['content']);
            $data['content'] = $dealData['content'];
            $data['reply'] = $dealData['replyInfo'];
        }
        $newsParams = $data;
        unset($data['username']);
        if (isset($data['reply'])) {
            unset($data['reply']);
        } 

        $result = $this->commentModel->addComment($data);

        if($result)
        {
            $this->articelModel->incrementById('comment',$data['aid']);
            $this->redis->hincrby('article_'.$data['aid'],'comment',1);

            //触发发送消息事件
            event(new SendNews($newsParams));
            
            return array('rc'=>0,'data'=>$result);
        }
        else
        {
            return array('rc'=>4002, 'msg'=>'添加失败');
        }
    }

    
    /**
     * 删除评论
     */
    public function delComment($cids,$aid)
    {
        if($this->commentModel->delComment($cids) != false)
        {
            $this->articelModel->decrementById('comment',$aid,count($cids));
            $this->redis->hincrby('article_'.$aid,'comment',-1*count($cids));
            return array('rc'=>0,'msg'=>'删除成功');
        }
        else
        {
            return array('rc'=>4003, 'msg'=>'删除失败');
        }
    }

    /**
     * 根据用户id删除评论
     */
    public function delCommentByUid($aid,$uid)
    {
        
        
        if($this->commentModel->delCommentByUid($aid,$uid) != false)
        {
            return array('rc'=>0,'msg'=>'删除成功');
        }
        else
        {
            return array('rc'=>4003, 'msg'=>'删除失败');
        }
    }

    /**
     * 删除文章id的所有评论
     */
    public function delCommentsByAid($aid)
    {
        
        
        if($this->commentModel->delCommentsByAid($aid) != false)
        {
            return array('rc'=>0,'msg'=>'删除成功');
        }
        else
        {
            return array('rc'=>4003, 'msg'=>'删除失败');
        }
    }

    /**
     * 根据文章ID取得评论的内容
     * 
     * @return array
     */
    public function getCommentsByAid($aid,$page=0)
    {
        if(!isset($aid)) return array('rc'=>4001,'msg'=>'没有文章id');

        $result = $this->commentModel->getCommentsByAid($aid,$page);

        if($result)
        {
            $count = $this->commentModel->countCommentByAid($aid);
            if( (intval($page)+1)*8 < $count ) {
                $next = true;
            } else {
                $next = false;
            }
            return array('rc'=>0, 'data'=>$result, 'next'=>$next, 'count'=>$count);
        }
        else
        {
            return array('rc'=>4005, 'msg'=>'没有文章评论了', 'next'=>false);
        }
    }

}