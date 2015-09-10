<?php
namespace App\Services\User;

use App\Models\User as UserModel;
use App\Services\User\UserValidate;
use App\Services\BaseProcess;
use Lang;

/**
* 用户处理
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
    private $userModel;

    /**
     * 用户表单验证对象
     * 
     * @var object
     */
    private $userValidate;

    /**
     * 初始化
     *
     * @access public
     */
	function __construct()
	{
        if( ! $this->userModel) $this->userModel = new UserModel();
        if( ! $this->userValidate) $this->userValidate = new UserValidate();
	}

	/**
	* 增加新的用户
	*
	* @param object $data;
	* @access public
	* @return boolean true|false
	*/
	public function addUser(\App\Services\User\Param\UserSave $data)
	{
		// 进行用户表单验证
		if( !$this->userValidate->add($data)) return $this->setErrorMsg($this->userValidate->getErrorMessage());
		// 检测改用户名是否已存在
		if($this->userModel->getUserByName($data->name)) return  $this->setErrorMsg(Lang::get('用户名已经存在'));

		$data->setPassword(md5($data->password));

		// 开始保存到数据库
		if($this->userModel->addUser($data->toArray()) !== false ) return true;

		return $this->setErrorMsg('注册失败');
	}

    /**
     * 删除用户
     * 
     * @param array $data
     * @access public
     * @return boolean true|false
     */
	public function delUser($ids)
	{
		if( !is_array($ids) ) return false;

		if($this->userModel->deleteUser($ids) !== false) return true;

		return $this->setErrorMsg(Lang::get('删除失败'));
	}

    /**
     * 编辑用户
     * 
     * @param object $data
     * @access public
     * @return boolean true|false
     */
    public function editUser(\App\Services\User\Param\UserSave $data)
    {
    	if( !isset($data->id)) return $this->setErrorMsg(Lang::get('没有用户id'));
    	// 进行用户表单验证
    	if( !$this->userValidate->edit($data)) return $this->setErrorMsg($this->userValidate->getErrorMessage());

    	$id = intval($data->id); 
    	unset($data->id);

    	if( $this->userModel->editUser($data->toArray(),$id) !== false ) return true;
    	return $this->setErrorMsg(Lang::get('common.action_error'));
    }

    /**
     * 修改自己的密码
     * 
     * @return true|false
     */
    public function modifyPassword(\App\Services\User\Param\UserModifyPassword $params)
    {
    	// 进行用户表单验证
    	if( !$this->userValidate->password($params)) return $this->setErrorMsg($this->userValidate->getErrorMessage());

    	$userInfo = \App\Services\SC::getLoginSession();
    	if( $userInfo->password != md5($params->oldPassword)) return $this->setErrorMsg(Lang::get('user.old_password_wrong'));
    	$updateData = ['password' => md5($params->newPassword)];
    	if($this->userModel->editUser($updateData,$params->id) !== false)  return true; 
    	return $this->setErrorMsg(Lang::get('common.action_error'));
    }
}
?>