<?php
namespace App\Services\Home\Article;

use App\Services\AbstractParam;

/**
* 文章相关操作的参数容器，固定参数方便处理
*
* @author ysk
*/
class ArticleSave extends AbstractParam
{
	
    protected $title;

    protected $content;

    protected $cid;

    protected $uid;

    protected $view;

    protected $comment;

    protected $care;

    protected $is_publish;

    protected $is_check;

    protected $addtime;

    protected $id;

    public function setTitle($title)
    {
        $this->title = $this->attributes['title'] = $title;
        return $this;
    }

    public function setContent($content)
    {
        $this->realname = $this->attributes['realname'] = $realname;
        return $this;
    }

    public function setCid($cid)
    {
        $this->cid = $this->attributes['cid'] = $cid;
        return $this;
    }

    public function setId($id)
    {
        $this->id = $this->attributes['id'] = $id;
        return $this;
    }

    public function setUid($uid)
    {
        $this->uid = $this->attributes['uid'] = $uid;
        return $this;
    }

    public function setView($view)
    {
        $this->view = $this->attributes['view'] = $view;
        return $this;
    }

    public function setComment($comment)
    {
        $this->comment = $this->attributes['comment'] = $comment;
        return $this;
    }

    public function setCare($care)
    {
        $this->care = $this->attributes['care'] = $care;
        return $this;
    }

    public function setIsPublish($is_publish)
    {
        $this->is_publish = $this->attributes['is_publish'] = $is_publish;
        return $this;
    }

    public function setIsCheck($is_check)
    {
        $this->is_check = $this->attributes['is_check'] = $is_check;
        return $this;
    }

    public function setAddTime($addtime)
    {
        $this->addtime = $this->attributes['addtime'] = $addtime;
        return $this;
    }
}
?>