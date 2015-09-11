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
	* @return array $resultArr
	*/
	public function addUser(\App\Services\User\Param\UserSave $data)
	{
        $resultArr = [];
		// 进行用户表单验证
		if( !$this->userValidate->add($data)) return array('error'=>'true','msg'=>$this->userValidate->getErrorMessage());
		// 检测改用户名是否已存在
		if($this->userModel->getUserByName($data->username)) return array('error'=>true, 'msg'=>'用户名已经存在');

		$data->setPassword(md5($data->password));

		// 开始保存到数据库
		if($this->userModel->addUser($data->toArray()) !== false ) {
            $resultArr = array('error'=> false, 'msg'=>'注册成功');
        } else {
            $resultArr = array('error'=>true, 'msg'=>'注册失败')；
        }
        return $resultArr;
	}

    /**
     * 删除用户
     * 
     * @param array $data
     * @access public
     * @return array
     */
	public function delUser($ids)
	{
        $resultArr = [];
		if( !is_array($ids) ) return array('error'=>true, 'msg'=>'没有获取用户id');

		if($this->userModel->deleteUser($ids) !== false) {
            $resultArr = array('error'=>false, 'msg'=>'删除成功');
        } else {
            $resultArr = array('error'=>true, 'msg'=>'删除失败');
        }
        return $resultArr;
	}

    /**
     * 编辑用户
     * 
     * @param object $data
     * @access public
     * @return array
     */
    public function editUser(\App\Services\User\Param\UserSave $data)
    {
        $resultArr = [];
    	if( !isset($data->id)) return array('error'=>true, 'msg'=>'没有获取用户id');
    	// 进行用户表单验证
    	if( !$this->userValidate->edit($data)) return array('error'=>true, 'msg'=>$this->userValidate->getErrorMessage());

    	$id = intval($data->id); 
    	unset($data->id);

    	if( $this->userModel->editUser($data->toArray(),$id) !== false ) {
            $resultArr = array('error'=>false, 'msg'=>'保存成功');
        } else {
            $resultArr = array('error'=>true, 'msg'=>'保存失败');
        }
        return $resultArr;
    }

    /**
     * 修改自己的密码
     * 
     * @return true|false
     */
    public function modifyPassword(\App\Services\User\Param\UserModifyPassword $params)
    {
        $resultArr = [];
    	// 进行用户表单验证
    	if( !$this->userValidate->password($params)) return array('error'=>true, 'msg'=>$this->userValidate->getErrorMessage());

    	$userInfo = \App\Services\SC::getLoginSession();

    	if( $userInfo->password != md5($params->oldPassword)) return array('error'=>true, 'msg'=>'旧密码错误');

    	$updateData = ['password' => md5($params->newPassword)];

    	if($this->userModel->editUser($updateData,$params->id) !== false)  {
            $resultArr = array('error'=>false, 'msg'=>'修改成功');
        } else {
            $resultArr = array('error'=>true, 'msg'=>'修改失败');
        }
        return $resultArr;
    }

    /**
     * 根据用户id获取用户信息
     * 
     * @param intval $uid
     * @access public
     * @return array
     */
    public function getUserInfoById($uid)
    {
        $resultArr = [];
        if( !isset($uid) ) return array('error'=>true, 'msg'=>'没有获取用户id');

        $userInfo = $this->userModel->getUserById($uid);
        if($userInfo !== false) {
            $resultArr = array('error'=>false, 'data'=>$userInfo);
        } else {
            $resultArr = array('error'=>true, 'msg'=>'删除失败');
        }
        return $resultArr;
    }

}
?>