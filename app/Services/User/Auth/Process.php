<?php
namespace App\Services\User\Auth;

use App\Models\User as UserModel;
use App\Models\UserAuth as UserAuthModel;
use App\Services\BaseProcess;
use App\Services\SC;
use Lang,Request;

/**
* 用户处理
*
* @author ysk
*/
class Process extends BaseProcess
{
	
    /**
     * 用户模型
     * 
     * @var object
     */
    private $userModel;

    /**
     * 用户表单验证对象
     * 
     * @var object
     */
    private $userAuthModel;

    /**
     * 初始化
     *
     * @access public
     */
	function __construct()
	{
        if ( ! $this->userModel) $this->userModel = new UserModel();
        if ( ! $this->userAuthModel) $this->userAuthModel = new UserAuthModel();
	}

    /**
    * 检查用户
    *
    * @param object $data;
    * @access public
    * @return array $resultArr
    */
    public function checkUser($data)
    {
        $resultArr = [];
        $authInfo = $this->userAuthModel->InfoByOid($data['openid']);
        if ($authInfo) {
            $userInfo = $this->userModel->getUserById($authInfo['uid']);
            if ($userInfo) {
                $arr = [];
                $arr['last_login_time'] = time();
                $arr['last_login_ip'] = Request::ip();
                $this->userModel->updateLastLoginInfo($authInfo['uid'], $arr);

                $userInfo['openid'] = $authInfo['openid'];
                $userInfo['type'] = $authInfo['type'];

                SC::setLoginSession($userInfo);

                $resultArr = ['error'=>false, 'msg'=>'登录成功'];
            } else {
                $resultArr = array('error'=>true, 'msg'=>'查询user表失败');
            }
        } else {
            $resultArr = $this->addUser($data);
        }
        return $resultArr;
    }

	/**
	* 增加新的用户
	*
	* @param object $data;
	* @access public
	* @return array $resultArr
	*/
	public function addUser($data)
	{
        $resultArr = [];
        $userInfo = [];
		// 检测改用户名是否已存在
		if ($this->userModel->getUserByName($data['nick'])) {
            $userInfo['username'] = $data['openid'];
        } else {
            $userInfo['username'] = $data['nick'];
        }

        $userInfo['logo_dir'] = $data['avatar'];
		$userInfo['password'] = md5('webquan');
        $userInfo['addtime'] = time();

		// 开始保存到数据库
        $uid = $this->userModel->addUser($userInfo);

		if ( $uid ) {
            unset($data['nick']);
            unset($data['avatar']);
            $data['uid'] = $uid;
            if( $this->userAuthModel->addUserAuth($data) != false ) {

                $arr = [];
                $arr['last_login_time'] = time();
                $arr['last_login_ip'] = Request::ip();
                $this->userModel->updateLastLoginInfo($uid, $arr);

                $userInfo['id'] = $uid;
                $userInfo['openid'] = $data['openid'];
                $userInfo['type'] = $data['type'];
                SC::setLoginSession($userInfo);

                $resultArr = ['error'=>false, 'msg'=>'登录成功'];
            } else {
                $resultArr = array('error'=>true, 'msg'=>'user表添加数据失败');
            }
        } else {
            $resultArr = array('error'=>true, 'msg'=>'登录失败');
        }

        return $resultArr;
	}


}
?>