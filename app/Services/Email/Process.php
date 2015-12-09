<?php 
namespace App\Services\Email;

use App\Services\BaseProcess;

/**
* 发生邮件处理器
*
* @author ysk
*/

class Process extends BaseProcess
{
	/**
     * 用户模型
     * 
     * @var object
     */
    public static $verifyCode;

	function __construct()
	{
		# code...
	}

	/**
     * 发送验证码
     * 
     * @params $email 邮箱
     */
	public function sendVerifyCode($email) 
	{
		self::$verifyCode = rand(100000,999999);

		$data = ['email'=>$email, 'rand'=>self::$verifyCode];
		Mail::send('emails.password', $data, function($message) use($data)
		{
		    $message->to($data['email'], $data['rand'])->subject('【重要】web圈验证码');
		});

		$result = ['error'=>false];
		return $result;
	}

	/**
     * 匹配验证码
     * 
     * @params $email 邮箱 
     */
	public function checkVerifyCode($code) {
		if($code == self::$verifyCode) {
			$result = ['error'=>false];
		} else {
			$result = ['error'=>true];
		}
	}
}