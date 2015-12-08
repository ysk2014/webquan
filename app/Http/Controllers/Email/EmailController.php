<?php namespace App\Http\Controllers\Email;

use Illuminate\Routing\Controller as BaseController;
use App\Services\User\Login\Process as LoginProcess;
use App\Services\Email\Process as EmailProcess;
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
	 * 
	 *
	 */
	public function index(EmailProcess $deal)
	{
		$email = Request::input('email');

		$result = $deal->sendVerifyCode($email);

		return response()->json($result);
	}

	public function checkVerifyCode(EmailProcess $deal) 
	{
		$verifyCode = Request::input('verifyCode');

		$result = $deal->checkVerifyCode($verifyCode);

		return response()->json($result);
	}


}
