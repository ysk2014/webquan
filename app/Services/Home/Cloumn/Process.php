<?php namespace App\Services\Home\Cloumn;

use Lang;
use App\Models\Home\Cloumn as CloumnModel;
use App\Models\Home\UserCareCloumn as UCCModel;
use App\Services\Home\Cloumn\Cloumn as CloumnValidate;
use App\Services\BaseProcess;

/**
 * 专题相关处理
 *
 * @author ysk
 */
class Process extends BaseProcess
{
    /**
     * 专题数据模型
     *
     * @var object
     */
    public $cloumnModel;

    /**
     * 用户关注专题数据模型
     *
     * @var object
     */
    public $uccModel;

    /**
     * 专题的表单验证
     *
     * @var object
     */
    public $cloumnValidate;

    /**
     * 初始化
     */
    public function __construct()
    {
        if( !$this->cloumnModel ) $this->cloumnModel = new CloumnModel();
        if( !$this->cloumnValidate ) $this->cloumnValidate = new CloumnValidate();
        if( !$this->uccModel ) $this->uccModel = new UCCModel();
    }

    /**
    * 添加专题
    *
    * @param object $data;
    * @access public
    * @return boolean true|false
    */
    public function addCloumn(\App\Services\Home\Cloumn\CloumnSave $data)
    {
        // 表单验证
        if(!$this->cloumnValidate->add($data)) return array('error'=>true, 'msg'=>$this->cloumnValidate->getErrorMessage());
        // 保存到数据库
        $id=$this->cloumnModel->add($data->toArray());
        if($id) return array('error'=>false, 'msg'=>'创建成功', 'data'=>$id);
        // 保存失败
        return array('error'=>true, 'msg'=>'创建失败');
    }

    /**
     * 编辑专题
     *
     * @param object $data
     * @access public
     * @return boolean true|false
     */
    public function editCloumn(\App\Services\Home\Cloumn\CloumnSave $data)
    {
        if( !isset($data->id) ) return array('error'=>true, 'msg'=>'参数没有设置');
        // 表单验证
        if(!$this->cloumnValidate->edit($data)) return array('error'=>true, 'msg'=>$this->cloumnValidate->getErrorMessage());
        $id = intval($data->id); unset($data->id);
        // 更新数据库
        if( $this->cloumnModel->edit($data,$id) !== false) return array('error'=>false, 'msg'=>'更新成功');
        // 更新失败
        return array('error'=>true, 'msg'=>'更新失败');
    }

    /**
     * 删除专题
     *
     * @param array $ids
     * @access public
     * @return boolean true|false
     */
    private function delCloumn($ids)
    {
        if( !is_array($ids) ) return array('error'=>true, 'msg'=>'参数没有设置');

        if($this->cloumnModel->deleteCloumn($ids) !== false) return array('error'=>false, 'msg'=>'删除成功');

        return return array('error'=>true, 'msg'=>'删除失败');
    }

    /**
     * 获取专题
     *
     * @param intval $data
     * @access public
     * @return boolean true|false
     */
    public function getCloumnById($data)
    {
        if(!isset($data)) return array('error'=>true, 'msg'=>'参数没有设置');
        $result = $this->cloumnModel->getCloumnById($data);
        if($result) 
        {
            return array('error'=>false, 'data'=>$result);
        } 
        else 
        {
            return array('error'=>true, 'msg'=>'查询失败');
        }

    }

    /**
     * 获取所有专题，并排序
     *
     * @param intval $data
     * @access public
     * @return boolean true|false
     */
    public function getCloumns($data)
    {
        $way = isset($data) ? $data : 'addtime';
        $cloumns = $this->cloumnModel->getCloumns($data);
        if($cloumns) 
        {
            return array('error'=>false, 'data'=>$cloumns);
        }
        else 
        {
            return array('error'=>true, 'data'=>'查询失败');
        }

    }

}