<?php namespace App\Http\Controllers\Home;

use App\Services\User\Login\Process as LoginProcess;

class HomeController extends Controller {

	public $navStatus;

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// $this->middleware('auth');
		$this->navStatus = 'home';
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index(LoginProcess $loginProcess)
	{	
		$data = ['navStatus'=>$this->navStatus];
		$isLogin = (new LoginProcess())->getProcess()->hasLogin();
		if($isLogin) $data = ['navStatus'=>$this->navStatus,'userInfo'=>$isLogin];
		return view('home/home',$data);
	}

}
