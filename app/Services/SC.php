<?php
namespace App\Services;

use Session, Cookie, Request;

class SC{

	/**
	* 用户登陆的session key
	*/
	CONST LOGIN_MARK_SESSION_KEY = 'LOGIN_MARK_SESSION';

	/**
	* 秘钥 session key
	*/
	CONST PUBLIC_KEY = 'LOGIN_PROCESS_PUBLIC';

    /**
     * 设置用户权限的key
     *
     * @var string
     */
    CONST USER_ACL_SESSION_KEY = 'USER_ACL_SESSION';

    /**
    * 设置登陆成功的session
    *
    * @param array $userinfo 用户的相关信息
    */
    static public function setLoginSession($userinfo){
    	return Session::put(self::LOGIN_MARK_SESSION_KEY,$userinfo);
    }

    /**
    * 返回登陆成功的session
    */
    static public function getLoginSession(){
    	return Session::get(self::LOGIN_MARK_SESSION_KEY);
    }

    /**
    * 删除登陆的session
    *
    * @return viod
    */
    static public function delLoginSession(){
        Session::forget(self::LOGIN_MARK_SESSION_KEY);
        Session::flush();
        Session::regenerate();
    }

    /**
    * 设置并返回加密密钥
    *
    * @return string 密钥
    */
    static public function setPublicKey(){
    	$key = uniqid();
    	Session::put(self::PUBLIC_KEY,$key);
    	return $key;
    }

    /**
    * 取得刚才设置的加密密钥
    *
    * @return string 密钥
    */
    static public function getPublicKey(){

    	return Session::put(self::PUBLIC_KEY);
    }

    /**
    * 删除密钥
    *
    * @return viod
    */
    static public function delPublicKey(){
        Session::forget(self::PUBLIC_KEY);
        Session::flush();
        Session::regenerate();
    }

    /**
    * 把用户权限保存到session中，方便系统使用
    *
	* @param string $acl
	* @access public
	* @return true|false
    */
    static public function setUserPermissionSession($acl){
        return Session::put(self::USER_ACL_SESSION_KEY, $acl);
    }

    /**
     * 返回保存在session中的用户权限信息
     *
     * @access public
     */
    static public function getUserPermissionSession()
    {
        return Session::get(self::USER_ACL_SESSION_KEY);
    }
}
?>