<?php namespace App\Services\User\Login;

use App\Models\User as UserModel;
// use App\Models\Permission as PermissionModel;
use App\Services\SC;
use App\Services\User\Login\AbstractProcess;
use Validator, Lang;
use Request;

/**
 * 登录处理
 *
 * @author ysk
 */
class ProcessDefault extends AbstractProcess {

    /**
     * 用户模型
     * 
     * @var object
     */
    private $userModel;

    /**
     * 权限模型
     * 
     * @var object
     */
    private $permissionModel;

    /**
     * 初始化
     *
     * @access public
     */
    public function __construct()
    {
        if( ! $this->userModel) $this->userModel = new UserModel();
        // if( ! $this->permissionModel) $this->permissionModel = new PermissionModel();
    }

    /**
     * 登录验证
     *
     * @param string $username 用户名
     * @param string $password 密码
     * @access public
     * @return boolean false|用户的信息
     */
    public function check($username, $password)
    {
        $result = [];
        $userInfo = $this->userModel->InfoByName($username);

        if(count($userInfo) === 0) 
        {
            $result = ['error'=>true, 'msg'=>'您还没有注册，请先去注册吧'];
            return $result;
        }

        $sign = $userInfo['password'];
        if($sign == strtolower(md5($password)))
        {
            $data['last_login_time'] = time();
            $data['last_login_ip'] = Request::ip();
            $this->userModel->updateLastLoginInfo($userInfo->id, $data);
            SC::setLoginSession($userInfo);
            SC::setUserPermissionSession($userInfo['status']);
            // event(new \App\Events\Admin\ActionLog(Lang::get('login.login_sys'), ['userInfo' => $userInfo]));
            $result = ['error'=>false, 'msg'=>'登录成功'];
            return $result;
        } else {
            $result = ['error'=>true, 'msg'=>'密码错误'];
            return $result;
        }
        
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
        $rules = array( 'name' => 'required|min:1', 'password' => 'required|min:6' );
        $messages = array(
            'name.required' => Lang::get('请输入用户名'),
            'name.min' => Lang::get('login.please_input_name'),
            'password.required' => Lang::get('请输入密码'),
            'password.min' => Lang::get('密码不能小于6位')
        );
        $validator = Validator::make($data, $rules, $messages);
        if ($validator->fails())
        {
            return $validator->messages()->first();
        }
        return false;
    }

    /**
     * 手动的验证csrftoken
     */
    private function checkCsrfToken()
    {
        $csrf = new \App\Services\User\Login\CsrfValidate();
        $csrf->tokensMatch();
    }

    /**
     * 设置并返回加密密钥
     *
     * @return string 密钥
     */
    public function setPublicKey()
    {
        return SC::setPublicKey();
    }

    /**
     * 取得刚才设置的加密密钥
     * 
     * @return string 密钥
     */
    public function getPublicKey()
    {
        return SC::getPublicKey();
    }

    /**
     * 删除密钥
     * 
     * @return void
     */
    public function delPublicKey()
    {
        return SC::delPublicKey();
    }

    /**
     * 判断是否已经登录
     *
     * @return boolean true|false
     */
    public function hasLogin()
    {
        return SC::getLoginSession();
    }

    /**
     * 登录退出
     *
     * @return void
     */
    public function logout()
    {
        return SC::delLoginSession();
    }

    /**
     * 权限验证
     *
     * @return boolean true|false
     */
    public function hasPermission()
    {
        return SC::getUserPermissionSession();
    }

}