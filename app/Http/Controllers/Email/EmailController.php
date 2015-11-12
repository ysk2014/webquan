<?php namespace App\Http\Controllers\Email;

use Illuminate\Routing\Controller as BaseController;
use App\Services\User\Login\Process as LoginProcess;
use Request,Cache,Mail;

class EmailController extends BaseController {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{

	}

	/**
	 * article
	 *
	 */
	public function index()
	{
		$email = Request::input('email');

		$isLogin = (new LoginProcess())->getProcess()->hasLogin();

		$data = ['email'=>$email, 'name'=>$isLogin['username']];
		Mail::send('emails.password', $data, function($message) use($data)
		{
		    $message->to($data['email'], $data['name'])->subject('欢迎加入我们的社区，请绑定您的邮箱！');
		});
		return response()->json($data);
	}




}
