<?php namespace App\Services\Home\Cloumn;

use App\Services\AbstractParam;

/**
 * 专题操作有关的参数容器，固定参数，方便分离处理。
 *
 * @author ysk
 */
class CloumnSave extends AbstractParam
{
    protected $name;

    protected $count;

    protected $view;
    
    protected $care;

    protected $logo_dir;

    protected $description;

    protected $uid;

    protected $update_time;

    protected $addtime;

    protected $id;

    public function setName($name)
    {
        $this->name = $this->attributes['name'] = $name;
        return $this;
    }

    public function setCount($count)
    {
        $this->count = $this->attributes['count'] = $count;
        return $this;
    }

    public function setView($view)
    {
        $this->view = $this->attributes['view'] = $view;
        return $this;
    }

    public function setCare($care)
    {
        $this->care = $this->attributes['care'] = $care;
        return $this;
    }

    public function setLogoDir($logo_dir)
    {
        $this->logo_dir = $this->attributes['logo_dir'] = $logo_dir;
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

    public function setUpdataTime($update_time)
    {
        $this->update_time = $this->attributes['update_time'] = $update_time;
        return $this;
    }

    public function setUid($uid)
    {
        $this->uid = $this->attributes['uid'] = $uid;
        return $this;
    }

    public function setId($id)
    {
        $this->id = $this->attributes['id'] = $id;
        return $this;
    }

}
