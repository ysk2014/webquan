<?php 
namespace App\Services\User\Login;

use Config;
use App\Services\User\Login\AbstractProcess;

/**
* 登陆处理
* @author ysk
*/

class Process{

	/**
	*
	* 登陆处理对象
	*
	* @var object
	*
	*/
	private $process;

	/**
	*
	* 初始化
	*
	* @var object
	*
	*/
	public function __construct(){

		$useProcess = '\\App\\Services\\User\\Login\\Process' . ucfirst(Config::get('sys.login_process'));
		$class = new $useProcess();
		$check = $class instanceOf AbstractProcess;
		if(!$check) throw new \Exception("login process class must be instanceof AbstractProcess!!");

		if(! $this->process) $this->process = $class;
	}

	/**
	*
	* 返回登陆处理对象
	*
	* @var object
	*
	*/
	public function getProcess(){

		return $this->process;
	}
}

?>