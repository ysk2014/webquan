<?php 
namespace App\Services\Email;

use App\Services\BaseProcess;
use App\Models\User as UserModel;
use Mail,Redis;

/**
* 发生邮件处理器
*
* @author ysk
*/

class Process extends BaseProcess
{
    /**
     * redis缓存链接
     * 
     * @var object
     */
    private $redis;

    /**
     * 用户模型
     * 
     * @var object
     */
    private $userModel;

	function __construct()
	{
		if( !$this->redis) $this->redis = Redis::connection();
		if( !$this->userModel) $this->userModel = new userModel();
	}
	// 发送验证码
	public function sendVerifyCode($email) 
	{
		
		$user = $this->userModel->getUidByEmail($email);

		if(!$user) {
			return array('error'=>true,'msg'=>'该邮箱还没有注册');
		}

		$verifyCode = rand(100000,999999);
		$this->redis->set($email,$verifyCode);
		$this->redis->set($email.$verifyCode,$user['id']);

		$data = ['email'=>$email, 'rand'=>$verifyCode];
		Mail::send('emails.password', $data, function($message) use($data)
		{
		    $message->to($data['email'], $data['rand'])->subject('【重要】web圈验证码');
		});

		$result = ['error'=>false,'data'=>$user['id']];
		return $result;
	}

	public function checkVerifyCode($email,$code) {
		if($code == $this->redis->get($email)) {

			$uid = $this->redis->get($email.$code);

			$this->redis->del($email);
			$this->redis->del($email.$code);

			$result = ['error'=>false,'data'=>$uid];
		} else {
			$result = ['error'=>true,'data'=>$this->redis->get($email),'code'=>$code];
		}
		return $result;
	}
}