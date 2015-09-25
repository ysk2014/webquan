<?php
namespace App\Services\Home\Notebook;

use App\Services\AbstractParam;

/**
* 笔记本相关操作的参数容器，固定参数方便处理
*
* @author ysk
*/
class NotebookSave extends AbstractParam
{
	
    protected $name;

    protected $uid;

    protected $count;

    protected $addtime;

    protected $id;

    public function setName($name)
    {
        $this->name = $this->attributes['name'] = $name;
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

    public function setCount($count)
    {
        $this->count = $this->attributes['count'] = $count;
        return $this;
    }

    public function setAddTime($addtime)
    {
        $this->addtime = $this->attributes['addtime'] = $addtime;
        return $this;
    }
}
?>