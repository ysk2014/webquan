<?php namespace App\Http\Controllers\Email;

use Illuminate\Routing\Controller as BaseController;
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
		$data = ['email'=>'2409551912@qq.com', 'name'=>'yinshikai'];
		Mail::send('emails.password', $data, function($message) use($data)
		{
		    $message->to($data['email'], $data['name'])->subject('欢迎注册我们的网站，请激活您的账号！');
		});
	}




}
