<?php 
namespace App\Services\User\Login;

abstract class AbstractProcess{

	/**
	*  判断是否登陆
	*/
	abstract public function hasLogin();

	/**
	*  登陆退出
	*/
	abstract public function logout();

	/**
	*  检测登录
	*/
	abstract public function check($username, $password);

	/**
	*  登录的数据验证
	*/
	abstract public function validate($username, $password);

	/**
	*  登录密钥
	*/
	abstract public function setPublicKey();
}

?>