<?php
namespace App\Services\User;

use App\Services\BaseValidate;
use Validator, Lang;

/**
* 用户表单验证
*
* @author ysk
*/
class UserValidate extends BaseValidate
{
	/**
	* 增加用户的时候的表单验证
	*
	* @access public
	*/
	public function add(\App\Services\User\Param\UserSave $data)
	{
		// 创建验证规则
		$rules = array(
			'username'    => 'required',
			'password'    => 'required',
			'job' 		  => 'required',
			'email'       => 'required'
		);

		// 自定义验证信息
		$messages = array(
			'username.required'    => Lang::get('用户名不能为空'),
			'password.required'    => Lang::get('密码不能为空'),
			'job.required'         => Lang::get('职位不能为空'),
			'email.required'       => Lang::get('邮箱不能为空')
		);

		// 开始验证
		$validator = Validator::make($data->toArray(),$rules,$messages);
		if($validator->fails())
		{
			$this->errorMsg = $validator->messages()->first();
			return false;
		}
		return true;
	}

	/**
	* 修该用户密码的时候的表单验证
	*
	* @access public
	*/
	public function pwd(\App\Services\User\Param\UserModifyPassword $data)
	{
        // 创建验证规则
        $rules = array(
            'oldPassword'  => 'required',
            'newPassword' => 'required',
            'newPasswordRepeat' => 'required',
        );
        
        // 自定义验证消息
        $messages = array(
            'oldPassword.required'  => Lang::get('旧密码不能为空'),
            'newPassword.required'  => Lang::get('新密码不能为空'),
            'newPasswordRepeat.required' => Lang::get('重复密码不能为空')
        );

        //开始验证
        $validator = Validator::make($data->toArray(), $rules, $messages);
        if($validator->fails())
        {
            $this->errorMsg = $validator->messages()->first();
            return false;
        }

        //新密码输入要一致
        if($data->newPassword != $data->newPasswordRepeat)
        {
            $this->errorMsg = Lang::get('新密码输入不一致');
            return false;
        }

        return true;
	}

	/**
	* 编辑用户的时候的表单验证
	*
	* @access public
	*/
	public function edit(\App\Services\User\Param\UserSave $data)
	{
		// 创建验证规则
		$rules = array(
			'username' 	  => 'required',
			// 'password'    => 'required',
			'job' 		  => 'required',
			// 'email'       => 'required'
		);

		// 自定义验证信息
		$messages = array(
			'username.required'    => Lang::get('用户名不能为空'),
			// 'password.required'    => Lang::get('密码不能为空'),
			'job.required'         => Lang::get('职位不能为空'),
			// 'email.required'       => Lang::get('邮箱不能为空')
		);

		// 开始验证
		$validator = Validator::make($data->toArray(),$rules,$messages);
		if($validator->fails())
		{
			$this->errorMsg = $validator->messages()->first();
			return false;
		}
		return true;
	}
}
?>