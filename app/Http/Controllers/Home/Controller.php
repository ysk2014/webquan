<?php namespace App\Http\Controllers\Home;

use Illuminate\Routing\Controller as BaseController;
use App\Services\User\Login\Process as LoginProcess;

abstract class Controller extends BaseController {

	public $userinfo;

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
	}

}
