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

                $resultArr = ['rc'=>0, 'msg'=>'登录成功'];
            } else {
                $resultArr = array('rc'=>1005, 'msg'=>'查询user表失败');
            }
        } else {
            $resultArr = array('rc'=>1004, 'msg'=>'该用户没有注册');
        }
        return $resultArr;
    }

	/**
	* 绑定新的用户
	*
	* @param object $data;
	* @access public
	* @return array $resultArr
	*/
	public function addUser($data)
	{
        $resultArr = [];
        $userInfo = [];

        $validate = $this->validate($data['username'],$data['password']);
        if ($validate['rc']!=0) {
            return $validate;
        }

        $userInfo['logo_dir'] = $data['auth']['avatar'];
        $userInfo['username'] = $data['username'];
		$userInfo['password'] = md5($data['password']);
        $userInfo['addtime'] = time();

		// 开始保存到数据库
        $uid = $this->userModel->addUser($userInfo);

		if ( $uid ) {
            $authData = $data['auth'];
            unset($data['auth']['nick']);
            unset($data['auth']['avatar']);
            $authData['uid'] = $uid;
            if( $this->userAuthModel->addUserAuth($authData) != false ) {

                $arr = [];
                $arr['last_login_time'] = time();
                $arr['last_login_ip'] = Request::ip();
                $this->userModel->updateLastLoginInfo($uid, $arr);

                $userInfo['id'] = $uid;
                $userInfo['openid'] = $authData['openid'];
                $userInfo['type'] = $authData['type'];

                $userInfo['last_login_time'] = $arr['last_login_time'];
                $userInfo['last_login_ip'] = $arr['last_login_ip'];

                SC::setLoginSession($userInfo);

                $resultArr = ['rc'=>0, 'msg'=>'登录成功'];
            } else {
                $resultArr = array('rc'=>1005, 'msg'=>'user表添加数据失败');
            }
        } else {
            $resultArr = array('rc'=>1004, 'msg'=>'登录失败');
        }

        return $resultArr;
	}

    // 绑定老用户
    public function bindUser($data)
    {
        $resultArr = [];

        $userInfo = $this->userModel->infoByName($data['username']);
var_dump($userInfo);exit;
        if(count($userInfo) === 0) 
        {
            $result = ['rc'=>1002, 'msg'=>'您还没有注册，请先去注册吧'];
            return $result;
        }

        $sign = $userInfo['password'];
        if($sign == strtolower(md5($password)))
        {

            if (empty($userInfo->logo_dir)) {
                $this->userModel->editUser($userInfo->id,array('logo_dir'=>$data['auth']['avatar']));
            }

            $authData = $data['auth'];
            unset($data['auth']['nick']);
            unset($data['auth']['avatar']);
            $authData['uid'] = $userInfo->id;

            if( $this->userAuthModel->addUserAuth($authData) != false ) {
                $data['last_login_time'] = time();
                $data['last_login_ip'] = Request::ip();
                $this->userModel->updateLastLoginInfo($userInfo->id, $data);

                $userInfo['openid'] = $authData['openid'];

                SC::setLoginSession($userInfo);
                SC::setUserPermissionSession($userInfo['status']);
                $result = ['rc'=>0, 'data'=>'登录成功'];
            } else {
                $result = ['rc'=>1005, 'msg'=>'绑定老用户sql语句执行错误'];
            }
            
        } else {
            $result = ['rc'=>1003, 'msg'=>'密码错误'];
        }
        return $result;
        
    }

    /**
     * 检测post过来的数据
     * 
     * @param string $username 用户名
     * @param string $password 密码
     * @access public
     * @return false|string
     */
    public function validate($username, $password)
    {
        // $this->checkCsrfToken();
        $data = array( 'name' => $username, 'password' => $password );
        $rules = array( 'name' => 'required|min:1', 'password' => 'required|min:6', 'email' => 'required' );
        $messages = array(
            'name.required' => Lang::get('请输入用户名'),
            'name.min' => Lang::get('login.please_input_name'),
            'password.required' => Lang::get('请输入密码'),
            'password.min' => Lang::get('密码不能小于6位'),
            'email.required' => Lang::get('邮箱不能为空')
        );
        $validator = Validator::make($data, $rules, $messages);
        if ($validator->fails())
        {
            return array('rc'=>1003, 'msg'=>$validator->messages()->first());
        }
        return array('rc'=>0, 'msg'=>'检查正确');
    }

}
?>