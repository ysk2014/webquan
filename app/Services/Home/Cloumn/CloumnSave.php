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

    protected $count;

    protected $addtime;

    protected $id;

    public function setTitle($title)
    {
        $this->title = $this->attributes['title'] = $title;
        return $this;
    }

    public function setCount($count)
    {
        $this->count = $this->attributes['count'] = $count;
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
