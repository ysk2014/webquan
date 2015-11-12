<?php namespace App\Services\Home\Tag;

use App\Services\AbstractParam;

/**
 * 标签操作有关的参数容器，固定参数，方便分离处理。
 *
 * @author ysk
 */
class TagSave extends AbstractParam
{
    protected $name;

    protected $description;

    protected $addtime;

    protected $id;

    public function setName($name)
    {
        $this->name = $this->attributes['name'] = $name;
        return $this;
    }

    public function setDescription($description)
    {
        $this->description = $this->attributes['description'] = $description;
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
