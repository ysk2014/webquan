<?php namespace App\Services\Home\Cloumn;

use App\Services\AbstractParam;

/**
 * 专题操作有关的参数容器，固定参数，方便分离处理。
 *
 * @author ysk
 */
class CloumnSave extends AbstractParam
{
    protected $title;

    protected $description;

    protected $uid;

    protected $view;

    protected $count;

    protected $care;

    protected $is_contribute;

    protected $is_check;

    protected $last_time;

    protected $addtime;

    protected $id;

    public function setTitle($title)
    {
        $this->title = $this->attributes['title'] = $title;
        return $this;
    }

    public function setDescription($description)
    {
        $this->description = $this->attributes['description'] = $description;
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

    public function setCount($count)
    {
        $this->count = $this->attributes['count'] = $count;
        return $this;
    }

    public function setCare($care)
    {
        $this->care = $this->attributes['care'] = $care;
        return $this;
    }

    public function setIsContribute($is_contribute)
    {
        $this->is_contribute = $this->attributes['is_contribute'] = $is_contribute;
        return $this;
    }

    public function setIsCheck($is_check)
    {
        $this->is_check = $this->attributes['is_check'] = $is_check;
        return $this;
    }

    public function setLastTime($last_time)
    {
        $this->last_time = $this->attributes['last_time'] = $last_time;
        return $this;
    }

    public function setAddtime($addtime)
    {
        $this->addtime = $this->attributes['addtime'] = $addtime;
        return $this;
    }

    public function setId($id)
    {
        $this->id = $this->attributes['id'] = $id;
        return $this;
    }

}
