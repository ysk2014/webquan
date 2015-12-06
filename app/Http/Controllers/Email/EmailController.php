<?php namespace App\Http\Controllers\Email;

use Illuminate\Routing\Controller as BaseController;
use App\Services\User\Login\Process as LoginProcess;
use Request,Cache,Mail;

class EmailController extends BaseController {

	// static public $rand;
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

		$rand = rand(100000,999999);

		$data = ['email'=>$email, 'rand'=>$rand];
		Mail::send('emails.password', $data, function($message) use($data)
		{
		    $message->to($data['email'], $data['rand'])->subject('【重要】web圈验证码');
		});
		return response()->json($data);
	}




}
