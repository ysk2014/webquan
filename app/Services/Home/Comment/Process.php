<?php namespace App\Services\Home\Comment;

use Lang;
use App\Models\Home\Article as ArticleModel;
use App\Models\Home\Comment as CommentModel;
use App\Models\User as UserModel;
use App\Models\Home\News as NewsModel;
use App\Services\Home\Comment\CommentValidate;
use App\Services\BaseProcess;
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
     * 消息模型
     * 
     * @var object
     */
    private $newsModel;

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
        if( ! $this->newsModel) $this->newsModel = new NewsModel();
        if( ! $this->commentValidate) $this->commentValidate = new CommentValidate();
        if( ! $this->redis) $this->redis = Redis::connection();
    }


    /**
     * 递归评论数据
     *
     * @param $d   单个数据
     * @param $data  数据数组
     */
    public function dealData($data,$result) {
        foreach ($data as $key => $value) {
            if($value['fid'] == $result['id']) {
                $result['children'][] = $this->dealData($data,$value);
            } 
        }
        return $result;
    }

    /**
     * 评论数据重组处理
     *
     * @param $data   从数据库取出的数据
     */
    public function dealCommentData($data) {
        $result = [];
        foreach ($data as $key => $value) {
            if($value['fid']==0) {
                $result[] = $this->dealData($data,$value);
            }
        }
        return $result;
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

        $tpl = '<a href="/users/"'.$replyInfo['id'].' class="maleskine-author" target="_blank">'.$arr[0].'</a> ';
        
        return str_replace($arr[0],$tpl,$content);
    }

    /**
     * 增加评论
     */
    public function addComment($data)
    {
        
        if( ! $this->commentValidate->add($data)) return array('error'=>true,'msg'=>$this->commentValidate->getErrorMessage());

        if (isset($data['pid']) && !empty($data['pid'])) {
            $data['content'] = $this->dealContent($data['content']);
        }

        $result = $this->commentModel->addComment($data);

        if($result)
        {
            $this->articelModel->incrementById('comment',$data['aid']);
            $this->redis->hincrby('article_'.$data['aid'],'comment',1);

            $this->sendNews($data);

            return array('error'=>false,'data'=>$result);
        }
        else
        {
            return array('error'=>true, 'msg'=>'添加失败');
        }
    }

    /**
     * 发送消息
     */
    public function sendNews($data)
    {
        $author_id = $this->articelModel->getAuthorById($data['aid']);
        $newsData = [];
        $newsData['aid'] = $data['aid']; 
        $newsData['send_id'] = $data['uid']; 
        $newsData['receive_id'] = $author_id; 
        $newsData['addtime'] = $data['addtime']; 

        $this->newsModel->addNew($newsData);
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
            return array('error'=>false,'msg'=>'删除成功');
        }
        else
        {
            return array('error'=>true, 'msg'=>'删除失败');
        }
    }

    /**
     * 根据用户id删除评论
     */
    public function delCommentByUid($aid,$uid)
    {
        
        
        if($this->commentModel->delCommentByUid($aid,$uid) != false)
        {
            return array('error'=>false,'msg'=>'删除成功');
        }
        else
        {
            return array('error'=>true, 'msg'=>'删除失败');
        }
    }

    /**
     * 删除文章id的所有评论
     */
    public function delCommentsByAid($aid)
    {
        
        
        if($this->commentModel->delCommentsByAid($aid) != false)
        {
            return array('error'=>false,'msg'=>'删除成功');
        }
        else
        {
            return array('error'=>true, 'msg'=>'删除失败');
        }
    }

    /**
     * 根据文章ID取得评论的内容
     * 
     * @return array
     */
    public function getCommentsByAid($aid,$page=0)
    {
        if(!isset($aid)) return array('error'=>true,'msg'=>'没有文章id');

        $result = $this->commentModel->getCommentsByAid($aid,$page);

        if($result)
        {
            $count = $this->commentModel->countCommentByAid($aid);
            if( (intval($page)+1)*8 < $count ) {
                $next = true;
            } else {
                $next = false;
            }
            return array('error'=>false, 'data'=>$this->dealCommentData($result), 'next'=>$next, 'count'=>$count);
        }
        else
        {
            return array('error'=>true, 'msg'=>'没有文章评论了', 'next'=>false);
        }
    }

}