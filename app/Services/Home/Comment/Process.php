<?php namespace App\Services\Home\Comment;

use Lang;
use App\Models\Home\Comment as CommentModel;
use App\Services\Home\Comment\CommentValidate;
use App\Services\BaseProcess;

/**
 * 评论相关处理
 *
 * @author ysk
 */
class Process extends BaseProcess
{

    /**
     * 文章模型
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
     * 初始化
     *
     * @access public
     */
    function __construct()
    {
        if( ! $this->commentModel) $this->commentModel = new CommentModel();
        if( ! $this->commentValidate) $this->commentValidate = new CommentValidate();
    }

    /**
     * 增加评论
     */
    public function addComment($data)
    {
        
        if( ! $this->commentValidate->add($data)) return array('error'=>true,'msg'=>$this->commentValidate->getErrorMessage());

        $result = $this->commentModel->addComment($data);
        if($result['id'])
        {
            return array('error'=>false,'data'=>$result);
        }
        else
        {
            return array('error'=>true, 'msg'=>'添加失败');
        }
    }

    /**
     * 删除评论
     */
    public function delContent($id)
    {
        $cid = array($id);
        
        if($this->commentModel->delContent($cid) != false)
        {
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
    public function delContentByUid($aid,$uid)
    {
        
        
        if($this->commentModel->delContentByUid($aid,$uid) != false)
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
    public function delContentByAid($aid)
    {
        
        
        if($this->commentModel->delContentByAid($aid) != false)
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
    public function getContentByAid($aid)
    {
        if(!isset($aid)) return array('error'=>true,'msg'=>'没有文章id');

        $data = $this->commentModel->getContentByAid($aid);

        if($data)
        {
            return array('error'=>false, 'data'=>$data);
        }
        else
        {
            return array('error'=>true, 'msg'=>'获取文章评论失败');
        }
    }

}