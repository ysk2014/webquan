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

    protected $description;

    protected $logo_dir;

    protected $cid;

    protected $uid;

    protected $nid;

    protected $view;

    protected $comment;

    protected $tags;

    protected $praise;

    protected $store;

    protected $update_time;

    protected $addtime;

    protected $id;

    public function setTitle($title)
    {
        $this->title = $this->attributes['title'] = $title;
        return $this;
    }

    public function setContent($content)
    {
        $this->content = $this->attributes['content'] = $content;
        return $this;
    }

    public function setDescription($description)
    {
        $this->description = $this->attributes['description'] = $description;
        return $this;
    }

    public function setLogoDir($logo_dir)
    {
        $this->logo_dir = $this->attributes['logo_dir'] = $logo_dir;
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

    public function setNid($nid)
    {
        $this->aid = $this->attributes['nid'] = $nid;
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

    public function setTags($tags)
    {
        $this->tags = $this->attributes['tags'] = $tags;
        return $this;
    }

    public function setPraise($praise)
    {
        $this->praise = $this->attributes['praise'] = $praise;
        return $this;
    }

    public function setStore($store)
    {
        $this->store = $this->attributes['store'] = $store;
        return $this;
    }

    public function setAddTime($addtime)
    {
        $this->addtime = $this->attributes['addtime'] = $addtime;
        return $this;
    }

    public function setUpdateTime($update_time)
    {
        $this->update_time = $this->attributes['update_time'] = $update_time;
        return $this;
    }
}
?>