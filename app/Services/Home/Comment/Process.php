<?php namespace App\Services\Home\Comment;

use Lang;
use App\Models\Home\Article as ArticleModel;
use App\Models\Home\Comment as CommentModel;
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
                $result['childen'][] = $this->dealData($data,$value);
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
     * 增加评论
     */
    public function addComment($data)
    {
        
        if( ! $this->commentValidate->add($data)) return array('error'=>true,'msg'=>$this->commentValidate->getErrorMessage());

        $receive_id = $data['receive_id'];
        unset($data['receive_id']);

        $result = $this->commentModel->addComment($data);
        if($result['id'])
        {
            $this->articelModel->incrementById('comment',$data['aid']);
            $this->redis->hincrby('article_'.$data['aid'],'comment',1);

            $this->sendNews($data,$receive_id);
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
    public function sendNews($data,$receive_id)
    {
        $newsData = [];
        $newsData['aid'] = $data['aid']; 
        $newsData['send_id'] = $data['uid']; 
        $newsData['receive_id'] = $receive_id; 
        $newsData['addtime'] = $data['addtime']; 

        $this->newsModel->addNew($newsData);
    }

    /**
     * 删除评论
     */
    public function delComment($cid,$aid)
    {
        $cid = array($cid);
        
        if($this->commentModel->delComment($cid) != false)
        {
            $this->articelModel->decrementById('comment',$aid);
            $this->redis->hincrby('article_'.$aid,'comment',-1);
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
    public function getCommentsByAid($data)
    {
        if(!isset($data['aid'])) return array('error'=>true,'msg'=>'没有文章id');

        $page = isset($data['page']) ? $data['page'] : 0;

        $result = $this->commentModel->getCommentsByAid($data['aid'],$page);

        if($result)
        {
            $count = $this->commentModel->countCommentByAid($data['aid']);
            if( (intval($page)+1)*8 < $count ) {
                $next = true;
            } else {
                $next = false;
            }
            return array('error'=>false, 'data'=>$this->dealCommentData($result), 'next'=>$next);
        }
        else
        {
            return array('error'=>true, 'msg'=>'没有文章评论了', 'next'=>false);
        }
    }

}