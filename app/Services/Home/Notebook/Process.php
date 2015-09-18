<?php
namespace App\Services\Home\Notebook;

use App\Models\Notebook as NotebookModel;
use App\Services\BaseProcess;
use Lang;


/**
* 笔记本处理
*
* @author ysk
*/
class Process extends BaseProcess
{
    /**
     * 笔记本模型
     * 
     * @var object
     */
    private $notebookModel;


    /**
     * 初始化
     *
     * @access public
     */
	function __construct()
	{
        if( ! $this->notebookModel) $this->notebookModel = new NotebookModel();
	}

	/**
	* 增加笔记本
	*
	* @param object $data;
	* @access public
	* @return boolean true|false
	*/
	public function addNotebook(\App\Services\Home\Notebook\NotebookSave $data)
	{
		$resultArr = [];
		// 进行笔记本表单验证
		if( !$data->name ) 
			return array('error'=>true,'msg'=>'笔记本名称不能为空');

		$id = $this->notebookModel->addNotebook($data->toArray());
		if( $id != false) {
			$resultArr = array('error'=>false, 'msg'=>'创建成功', 'data'=>$id);
		} else {
			$resultArr = array('error'=>true, 'msg'=>'创建失败');
		}
		return $resultArr;
	}

	/**
	* 删除笔记本
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function delNotebook($ids)
	{
		$resultArr = [];
		if( !is_array($ids) ) return array('error'=>true,'msg'=>'没有笔记本id');

		if($this->notebookModel->delNotebook($ids) != false) {
			$resultArr = array('error'=>false, 'msg'=>'删除成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'删除失败');
		}
		return $resultArr;
	}


	/**
	* 编辑笔记本
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function editNotebook(\App\Services\Home\Notebook\NotebookSave $data)
	{	
		$resultArr = [];
		if( !isset($data->id) ) return array('error'=>true,'msg'=>'没有笔记本id');
		// 进行笔记本表单验证
		if( !$data->name ) return array('error'=>true, 'msg'=>'笔记本名称不能为空');

		$id = intval($data->id);
		unset($data->id);

		if($this->notebookModel->editNotebook($data, $id) != false) {
			$resultArr = array('error'=>false, 'msg'=>'编辑成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'编辑失败');
		}
		return $resultArr;
	}

	/**
	* 获取笔记本列表
	*
	* @param intval $uid;
	* @access public
	* @return array
	*/
	public function getNotebooksByUid($uid)
	{
		$notebooksInfo = $this->notebookModel->getNotebooksByUid($uid);
		if($notebooksInfo) {
			return array('error'=>false,'data'=>$notebooksInfo);
		} else {
			return array('error'=>true,'msg'=>'获取笔记本信息失败');
		}
	}


}

?>