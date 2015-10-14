<?php namespace App\Services\Home\Cloumn;

use Lang;
use App\Models\Home\Cloumn as CloumnModel;
use App\Models\Home\UserCareCloumn as UCCModel;
use App\Services\Home\Cloumn\Cloumn as CloumnValidate;
use App\Services\Home\Upload\Process as UploadManager;
use App\Services\SC;
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
    private $cloumnModel;

    /**
     * 专题表单验证对象
     * 
     * @var object
     */
    private $cloumnValidate;

    /**
     * 上传处理对象
     * 
     * @var object
     */
    private $uploadManager;

    /**
     * 关注专题数据模型
     * 
     * @var object
     */
    private $careModel;

    /**
     * 初始化
     */
    public function __construct()
    {
        if( !$this->cloumnModel ) $this->cloumnModel = new CloumnModel();
        if( !$this->cloumnValidate ) $this->cloumnValidate = new CloumnValidate();
        if( !$this->uploadManager) $this->uploadManager = new UploadManager();
        if( !$this->careModel) $this->careModel = new UCCModel();
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
        if( !$this->cloumnValidate->add($data) ) 
            return array('error'=>true,'msg'=>$this->cloumnValidate->getErrorMessage());
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
        if( !$this->cloumnValidate->edit($data)) return array('error'=>true, 'msg'=>$this->cloumnValidate->getErrorMessage());

        $id = intval($data->id); unset($data->id);
        // 更新数据库
        $this->cloumnModel->edit($data->toArray(),$id);
        return array('error'=>false, 'msg'=>'更新成功');
        // if( $this->cloumnModel->edit($data->toArray(),$id) !== false) return array('error'=>false, 'msg'=>'更新成功');
        // // 更新失败
        // return array('error'=>true, 'msg'=>'更新失败');
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

        return array('error'=>true, 'msg'=>'删除失败');
    }

    /**
     * 获取专题
     *
     * @param intval $data
     * @access public
     * @return boolean true|false
     */
    public function getCloumnById($cid,$uid)
    {
        if(!isset($cid)) return array('error'=>true, 'msg'=>'参数没有设置');

        $result = $this->cloumnModel->getCloumnById($cid);
        if($result) 
        {
            if($uid!=0 && $this->careModel->getCareId($cid,$uid)) {
                $result['careStatus'] = true;
            } else {
                $result['careStatus'] = false;
            }
            $this->cloumnModel->incrementData('view', $cid);
            return array('error'=>false, 'data'=>$result);
        } 
        else 
        {
            return array('error'=>true, 'msg'=>'查询失败');
        }

    }

    /**
     * 获取用户创建的专题
     *
     * @param intval $uid
     * @access public
     * @return boolean true|false
     */
    public function getCloumnsByUid($data)
    {
        if(!isset($data['uid'])) return array('error'=>true, 'msg'=>'参数没有设置');

        $page = isset($data['page']) ? $data['page'] : 0;

        $result = $this->cloumnModel->getCloumnsByUid($data['uid'],$page);
        if($result) 
        {
            $careArr = $this->careModel->getCidsByUid($data['uid']);
            $cids = [];
            foreach ($careArr as $key => $value) {
                array_push($cids, $value['cid']);
            }

            foreach ($result as $key => $val) {
                if(in_array($val['id'], $cids)) {
                    $result[$key]['myCare'] = true;
                } else {
                    $result[$key]['myCare'] = false;
                }
            }

            $count = $this->cloumnModel->countCloumnByUid($data['uid']);
            if( (intval($page)+1)*20 < $count ) {
                $next = true;
            } else {
                $next = false;
            }
            return array('error'=>false, 'data'=>$result, 'next'=>$next);
        } 
        else 
        {
            return array('error'=>true, 'msg'=>'没有专题');
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
        $way = isset($data['way']) ? $data['way'] : 'addtime';
        $page = isset($data['page']) ? $data['page'] : 0;

        $cloumns = $this->cloumnModel->getCloumns($way,$page);
        if($cloumns) 
        {
            $uid = SC::getLoginSession()['id'];
            $careArr = $this->careModel->getCidsByUid($uid);
            $cids = [];
            foreach ($careArr as $key => $value) {
                array_push($cids, $value['cid']);
            }

            foreach ($cloumns as $key => $val) {
                if(in_array($val['id'], $cids)) {
                    $cloumns[$key]['myCare'] = true;
                } else {
                    $cloumns[$key]['myCare'] = false;
                }
            }

            $count = $this->cloumnModel->countCloumn();
            if( (intval($page)+1)*20 < $count ) {
                $next = true;
            } else {
                $next = false;
            }
            return array('error'=>false, 'data'=>$cloumns, 'next'=>$next);
        }
        else 
        {
            return array('error'=>true, 'msg'=>'没有专题');
        }

    }

    /**
     * 获取用户关注的专题
     *
     * @param intval $uid
     * @access public
     * @return boolean true|false
     */
    public function getCareCloumnsByUid($data)
    {
        if(!isset($data['uid'])) return array('error'=>true, 'msg'=>'参数没有设置');

        $page = isset($data['page']) ? $data['page'] : 0;

        $result = $this->careModel->getCloumnsByUid($data['uid'],$page);
        if($result) 
        {
            foreach ($result as $key => $val) {
                $result[$key]['myCare'] = true;
            }

            $count = $this->careModel->countCaresByUid($data['uid']);
            if( (intval($page)+1)*20 < $count ) {
                $next = true;
            } else {
                $next = false;
            }
            return array('error'=>false, 'data'=>$result, 'next'=>$next);
        } 
        else 
        {
            return array('error'=>true, 'msg'=>'没有关注的专题');
        }

    }

    /**
     * 上传专题头像
     * 
     * @param object $file
     * @param object $id
     * @access public
     * @return array
     */
    public function uploadLogo($file,$id,$logoDir) 
    {
        if(!isset($file)) return array('error'=>true,'msg'=>'没有上传文件');

        if(empty($logoDir)) {
            $config = array('path'=>'cloumn-logo');
        } else {
            $status = preg_match('/\/upload_path\/cloumn-logo\/(.{1,})?\./', $logoDir,$fileName);
            if($status) {
                $config = array('path'=>'cloumn-logo','fileName'=>$fileName[1]);
            } else {
                $config = array('path'=>'cloumn-logo');
            }
        }

        $this->uploadManager->setParam($config);

        $result = $this->uploadManager->setFile($file)->upload();

        if($result['success']) {
            $resultArr = array('error'=>false,'data'=>$result['url']);
        } else {
            $resultArr = array('error'=>true,'msg'=>'上传logo失败');
        }

        return $resultArr;
    }

    /**
     * 处理关注
     * 
     * @param  $data
     */
    public function dealCare($data,$method) 
    {
        if(!isset($data)) return array('error'=>true,'msg'=>'没有数据');

        if($method=="POST") {
            $id=$this->careModel->add($data);
            $msg='关注';
        } else if($method=="DELETE") {
            $id=$this->careModel->del($data);
            $msg='取消';
        }
        
        if($id) {
            if($method=="POST") {
                $this->cloumnModel->incrementData('care',$data['cid']);
            } else if($method=="DELETE") {
                $this->cloumnModel->decrementData('care',$data['cid']);
            }
            return array('error'=>false, 'msg'=>$msg.'成功');
        } else {
            return array('error'=>true, 'msg'=>$msg.'失败');
        }
    }


}