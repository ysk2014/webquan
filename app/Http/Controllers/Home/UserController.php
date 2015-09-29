<?php namespace App\Http\Controllers\Home;

use App\Services\User\Login\Process as LoginProcess;
use  App\Services\User\Process as UserActionProcess;
use App\Services\SC;
use App\Models\User;
use Request;

class UserController extends Controller {


	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{

	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home.app');
	}

	/**
	* 登陆注册页面
	*/
	public function login($way)
	{
		// $isLogin = (new LoginProcess())->getProcess()->hasLogin();
		// if($isLogin) return redirect('home.app');
		return view('home.app');
	}

	/**
	* 设置
	*/
	public function settings()
	{
		return view('home.app');
	}

    /**
     * 开始登录处理
     *
     * @param App\Services\User\Login\Process $loginProcess 登录核心处理
     * @access public
     */
	public function getProc(LoginProcess $loginProcess)
	{
		$username = Request::input('username');
		$password = Request::input('password');
		// 进行表单验证
		if($error = $loginProcess->getProcess()->validate($username,$password)){
			 return response()->json(['msg' => $error, 'error' => true]);
		}
		// 开始登陆验证
		$userInfo = $loginProcess->getProcess()->check($username,$password);
		
		return response()->json($userInfo);
	}

    /**
     * 开始注册处理
     *
     * @param App\Services\User\Process $process 用户核心处理
     * @access public
     */
	public function addUser(UserActionProcess $manager)
	{
		$data = (array) Request::input('data');
		$data['addtime'] = time();

		$param = new \App\Services\User\Param\UserSave();
		$param->setAttributes($data);

		$result = $manager->addUser($param);

		return $result;
	}

    /**
     * 编辑用户信息
     *
     * @param App\Services\User\Process $process 用户核心处理
     * @access public
     */
	public function editUser(UserActionProcess $manager)
	{
		$data = (array) Request::input('data');
		// $data['addtime'] = time();
		$param = new \App\Services\User\Param\UserSave();
		$param->setAttributes($data);

		$result = $manager->editUser($param);
		
		return response()->json($result);
	}

    /**
     * 删除用户
     *
     * @access public
     */
	public function delUser()
	{
		$id = Request::input('id');
		$ids = [$id];
		$result = $manager->delUser($ids);
		return response()->json($result);
	}

    /**
     * 修改密码
     *
     * @param App\Services\User\Process $process 用户核心处理
     * @access public
     */
	public function modifyPassword(UserActionProcess $manager)
	{
		$data = (array) Request::input('data');

		$param = new \App\Services\User\Param\UserModifyPassword();
		$param->setAttributes($data);

		$result = $manager->modifyPassword($param);
		
		return response()->json($result);
	}

    /**
     * 获取登录用户的信息
     */
    public function getUserInfoByLogin(LoginProcess $loginProcess)
    {
		$isLogin = (new LoginProcess())->getProcess()->hasLogin();
		unset($isLogin->password);
		$data = $isLogin ? ['userInfo'=>$isLogin] : [];
		return response()->json($data);
    }

    /**
     * 根据用户的id获取用户的信息
     */
    public function getUserInfoById(UserActionProcess $manager)
    {
		$id = intval(Request::input('id'));
		$result = $manager->getUserInfoById($id);
		return response()->json($result);
    }

    /**
     * 检查用户名是否占用
     */
    public function checkUserName(UserActionProcess $manager)
    {
		$username = intval(Request::input('username'));
		$result = $manager->checkUserName($username);
		return response()->json($result);
    }

    /**
     * 更新头像
     */
    public function updateLogo(UserActionProcess $manager)
    {
		$file = Request::file('logo-image-file');
		$id = Request::input('id')
		$result = $manager->uploadLogo($file,$id);
		return response()->json($result);
    }

    /**
     * 登录退出
     */
    public function getOut(LoginProcess $loginProcess)
    {
        $loginProcess->getProcess()->logout();
        return redirect('/');
    }

}
