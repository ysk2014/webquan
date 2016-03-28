<?php namespace App\Http\Controllers\Home;

use App\Services\User\Login\Process as LoginProcess;
use  App\Services\User\Process as UserActionProcess;
use App\Widget\Home\Common as WidgetCommon;
use App\Services\SC;
use App\Models\User;
use Request;

class UserController extends Controller {

	protected $widget;

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// 判断用户是否登录
        $isLogin = (new LoginProcess())->getProcess()->hasLogin();
        if (empty($isLogin)) {
            $this->userinfo = false;
        } else {
            $this->userinfo = ['id'=>$isLogin['id'],'nick'=>$isLogin['name'],'userUrl'=>$isLogin['logo_dir']];
        }
        $this->isLogin = $isLogin;
		
		$this->widget = new WidgetCommon();
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index($id=0)
	{
		if ($id!=0) {
			$uid = $id;
			
			$userInfo = $this->isLogin;
			
			if ($userInfo['id'] != $id) {
				$uid = $id;
				$userInfo = (new UserActionProcess())->getUserInfoById($id)['data'];
			} else {
				$uid = $userInfo['id'];
			}

			unset($userInfo['password']);
		
			// 已经发布的文章列表
			$articles = $this->widget->articlesByUid($uid);

			//缓存
			$cacheSecond = config('home.cache_control');
	        $time = date('D, d M Y H:i:s', time() + $cacheSecond) . ' GMT';

			return response()->view('home/user/index', compact('userInfo','articles'))->header('Cache-Control', 'max-age='.$cacheSecond)->header('Expires', $time);
		} else {
			abort(404);
		}
	}

	/**
	* 帐号设置
	*/
	public function settings($id=0)
	{

		$userInfo = $this->isLogin;
		unset($userInfo['password']);

		return response()->view('home/user/setting', compact('userInfo'));
	}


	/**
	* 登陆注册页面
	*/
	public function login($way)
	{
		return view('home.app');
	}

	/**
	* 密码重置页面
	*/
	public function forget()
	{
		return view('home.forget');
	}

	/**
     * 第三方登录绑定页面
     */
    public function authPage(UserActionProcess $manager)
    {
    	
		return view('home.user.auth');
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
			 return response()->json(['msg' => $error, 'rc' => 1001]);
		}
		// 开始登陆验证
		$userInfo = $loginProcess->getProcess()->check($username,$password);
		
		return response()->json($userInfo);
	}

    /**
     * 处理用户信息
     *
     * @param App\Services\User\Process $process 用户核心处理
     * @access public
     */
	public function dealUser(UserActionProcess $manager,$id=0)
	{
		$method = Request::method();
		$param = new \App\Services\User\Param\UserSave();

		if($method=="POST") {

			$data = (array) Request::input('data');
			$data['addtime'] = time();

			$param->setAttributes($data);
			$result = $manager->addUser($param);

		} else if($method=="PUT") {
			$data = (array) Request::input('data');

			$param->setAttributes($data);
			$result = $manager->editUser($param);
		} else {
			$result = array('rc'=>405,'msg'=>'路由匹配失败');
		}

		return $result;
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
     * 重置密码
     *
     * @access public
     */
	public function resetPassword(UserActionProcess $manager)
	{
		$uid =  Request::input('code');
		$newPassword =  Request::input('newPassword');

		$result = $manager->resetPassword($uid,$newPassword);
		
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
    public function getUserInfoById(UserActionProcess $manager,$id=0)
    {
		$result = $manager->getUserInfoById($id);
		return response()->json($result);
    }

    /**
     * 检查用户名是否占用
     */
    public function checkUserName(UserActionProcess $manager)
    {
		$username = Request::input('username');
		$result = $manager->checkUserName($username);
		return response()->json($result);
    }

    /**
     * 更新头像
     */
    public function updateLogo(UserActionProcess $manager,$id=0)
    {
		$file = Request::file('logo');

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

    /**
     * 我的消息页
     */
    public function getNews(UserActionProcess $manager,$id=0) 
    {
    	$data = Request::input('data');
    	if (empty($data)) {
    		$data = ['uid'=>$id];
    	}
    	$news = $manager->getNews($data);
    	return response()->view('home/user/news', compact('news'));
    }
    /**
     * 未读消息总数
     */
    public function getNewsCountByStatus(UserActionProcess $manager) 
    {
    	$uid = Request::input('uid');
    	$result = $manager->getNewsCountByStatus($uid);
    	return response()->json($result);
    }

    /**
     * 更新消息
     */
    public function updateNews(UserActionProcess $manager) 
    {
    	$data = Request::input('data');
    	$result = $manager->updateNews($data);
    	return response()->json($result);
    }
}
