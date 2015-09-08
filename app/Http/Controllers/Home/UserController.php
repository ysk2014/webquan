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
	* 登陆页面
	*/
	public function login(LoginProcess $loginProcess)
	{
		$isLogin = (new LoginProcess())->getProcess()->hasLogin();
		if($isLogin) return redirect('home.home');
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
			 return response()->json(['msg' => $error, 'result' => false]);
		}
		// 开始登陆验证
		$userInfo = $loginProcess->getProcess()->check($username,$password);
		
		$result = $userInfo ? ['msg' => '登录成功', 'result' => true]
                                : ['msg' => '登录失败', 'result' => false];
		return response()->json($result);
	}

	/**
	* 注册页面
	*/
	public function register()
	{
		return view('home.app');
	}

    /**
     * 开始注册处理
     *
     * @param App\Services\User\Process $process 登录核心处理
     * @access public
     */
	public function addUser(UserActionProcess $manager)
	{
		$data = (array) Request::input('data');
		$data['addtime'] = time();
		$param = new \App\Services\User\Param\UserSave();
		$param->setAttributes($data);
		if($msg = $manager->addUser($param)){
			 return response()->json(['msg' => '注册成功', 'result' => true]);
		}else{
			$error = $manager->getErrorMessage();
			return response()->json(['msg' => $error, 'result' => false]);
		}
		
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
