<?php namespace App\Services\Home\Comment;

use Lang;
use App\Models\Home\Comment as CommentModel;
use App\Models\Home\CommentValidate;
use App\Services\Home\BaseProcess;

/**
 * 评论相关处理
 *
 * @author jiang <mylampblog@163.com>
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

        $cid = $this->commentModel->addComment($data);
        if($cid)
        {
            return array('error'=>false,'data'=>$cid);
        }
        else
        {
            return array('error'=>true, 'msg'=>'添加失败');
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

}