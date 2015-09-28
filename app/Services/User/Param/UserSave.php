<?php
namespace App\Services\User\Param;

use App\Services\AbstractParam;

/**
* 用户相关操作的参数容器，固定参数方便处理
*
* @author ysk
*/
class UserSave extends AbstractParam
{
	
    protected $username;

    protected $realname;

    protected $email;

    protected $job;

    protected $sex;

    protected $city;

    protected $description;

    protected $password;

    protected $addtime;

    protected $id;

    public function setName($username)
    {
        $this->username = $this->attributes['username'] = $name;
        return $this;
    }

    public function setRealname($realname)
    {
        $this->realname = $this->attributes['realname'] = $realname;
        return $this;
    }

    public function setPassword($password)
    {
        $this->password = $this->attributes['password'] = $password;
        return $this;
    }

    public function setId($id)
    {
        $this->id = $this->attributes['id'] = $id;
        return $this;
    }

    public function setEmail($email)
    {
        $this->email = $this->attributes['email'] = $email;
        return $this;
    }

    public function setJob($job)
    {
        $this->job = $this->attributes['job'] = $job;
        return $this;
    }

    public function setSex($sex)
    {
        $this->sex = $this->attributes['sex'] = $sex;
        return $this;
    }

    public function setCity($city)
    {
        $this->city = $this->attributes['city'] = $city;
        return $this;
    }

    public function setDescription($description)
    {
        $this->description = $this->attributes['description'] = $description;
        return $this;
    }

    public function setAddTime($addtime)
    {
        $this->addtime = $this->attributes['addtime'] = $addtime;
        return $this;
    }
}
?>