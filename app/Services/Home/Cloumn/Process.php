<?php namespace App\Services\Home\Cloumn;

use Lang;
use App\Models\Home\Cloumn as CloumnModel;
use App\Models\Home\Article as ArticleModel;
use App\Models\Home\Notes as NoteModel;
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
     * 文章数据模型
     *
     * @var object
     */
    private $articleModel;

    /**
     * 草稿数据模型
     *
     * @var object
     */
    private $noteModel;

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
        if (!$this->articleModel) $this->articleModel = new ArticleModel();
        if (!$this->noteModel) $this->noteModel = new NoteModel();
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
            return array('rc'=>3001,'msg'=>$this->cloumnValidate->getErrorMessage());
        // 保存到数据库
        $id=$this->cloumnModel->add($data->toArray());
        if($id) return array('rc'=>0, 'msg'=>'创建成功', 'data'=>$id);
        // 保存失败
        return array('rc'=>3002, 'msg'=>'创建失败');
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
        if( !isset($data->id) ) return array('rc'=>0, 'msg'=>'参数没有设置');
        // 表单验证
        if( !$this->cloumnValidate->edit($data)) return array('rc'=>3001, 'msg'=>$this->cloumnValidate->getErrorMessage());

        $id = intval($data->id); unset($data->id);
        // 更新数据库
        $this->cloumnModel->edit($data->toArray(),$id);
        return array('rc'=>0, 'msg'=>'更新成功');
    }

    /**
     * 删除专题
     *
     * @param array $ids
     * @access public
     * @return boolean true|false
     */
    public function delCloumn($ids)
    {
        if( !is_array($ids) ) return array('rc'=>3001, 'msg'=>'参数没有设置');

        if($this->cloumnModel->deleteCloumn($ids) !== false) {
            // 删除文章
            $this->articleModel->delArticleByCid($ids[0]);
            // 删除note草稿
            $this->noteModel->delNotesByCid($ids[0]);

            return array('rc'=>0, 'msg'=>'删除成功');
        } else {
            return array('rc'=>3003, 'msg'=>'删除失败');
        }
    }

    /**
     * 检查专题名是否唯一
     *
     * @param $name
     * @access public
     * @return array
     */
    public function checkName($name,$id=0)
    {
        if( !isset($name) ) return array('rc'=>3001, 'msg'=>'参数没有设置');

        $result = $this->cloumnModel->getInfoByName($name);

        if ($result !== null && $id==0) {
            return array('rc'=>0, 'msg'=>'专题名不唯一', 'unique'=>0);
        } else {
            return array('rc'=>0, 'msg'=>'专题名唯一', 'unique'=>1);
        }

    }

    /**
     * 获取专题信息和作者信息
     *
     * @param intval $data
     * @access public
     * @return boolean true|false
     */
    public function getCloumnById($cid,$uid)
    {
        if(!isset($cid)) return array('rc'=>3001, 'msg'=>'参数没有设置');

        $result = $this->cloumnModel->getCloumnById($cid);
        if($result) 
        {
            if($uid!=0 && $this->careModel->getCareId($cid,$uid)) {
                $result['careStatus'] = true;
            } else {
                $result['careStatus'] = false;
            }
            $this->cloumnModel->incrementData('view', $cid);
            return array('rc'=>0, 'data'=>$result);
        } 
        else 
        {
            return array('rc'=>3005, 'msg'=>'查询失败');
        }

    }

    /**
     * 获取用户创建的专题列表
     *
     * @param intval $uid
     * @access public
     * @return array
     */
    public function getInfoById($cid) {
        if (!isset($cid)) return array('rc'=>3001, 'msg'=>'参数没有设置');

        $result = $this->cloumnModel->getInfoById($cid);

        if ($result) {
            return array('rc'=>0, 'data'=>$result);
        } else {
            return array('rc'=>3006, 'msg'=>'没有专题');
        }
    }

    /**
     * 获取用户创建的专题列表
     *
     * @param intval $uid
     * @access public
     * @return array
     */
    public function getCloumnsByUid($data)
    {
        if(!isset($data['uid'])) return array('rc'=>3001, 'msg'=>'参数没有设置');

        $limit = $data['limit'] ? $data['limit'] : 0;

        $result = $this->cloumnModel->getCloumnsByUid($data['uid'],$limit);
        if($result) 
        {
            return array('rc'=>0, 'data'=>$result);
        } 
        else 
        {
            return array('rc'=>3006, 'msg'=>'没有专题');
        }

    }

    /**
     * 获取用户创建的所有专题
     *
     * @param intval $uid
     * @access public
     * @return boolean true|false
     */
    public function getAllCloumnsByUid($uid)
    {
        if(!isset($uid)) return array('rc'=>3001, 'msg'=>'参数没有设置');


        $result = $this->cloumnModel->getAllCloumnsByUid($uid);
        if($result) 
        {
            return array('rc'=>0, 'data'=>$result);
        } 
        else 
        {
            return array('rc'=>3006, 'msg'=>'没有专题');
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
            if( (intval($page)+1)*24 < $count ) {
                $next = true;
            } else {
                $next = false;
            }
            return array('rc'=>0, 'data'=>$cloumns, 'next'=>$next);
        }
        else 
        {
            return array('rc'=>3006, 'msg'=>'没有专题');
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
        if(!isset($data['uid'])) return array('rc'=>3001, 'msg'=>'参数没有设置');

        $page = isset($data['page']) ? $data['page'] : 0;

        $result = $this->careModel->getCloumnsByUid($data['uid'],$page);
        if($result) 
        {
            foreach ($result as $key => $val) {
                $result[$key]['myCare'] = true;
            }

            $count = $this->careModel->countCaresByUid($data['uid']);
            if( (intval($page)+1)*24 < $count ) {
                $next = true;
            } else {
                $next = false;
            }
            return array('rc'=>0, 'data'=>$result, 'next'=>$next);
        } 
        else 
        {
            return array('rc'=>3006, 'msg'=>'没有关注的专题');
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
        if(!isset($file)) return array('rc'=>3001,'msg'=>'没有上传文件');

        if(empty($logoDir)) {
            $fileName = 'cloumn_logo_uid_'.$id.'_'.date('Y', time()) . date('m', time()) . date('d', time());
            $config = array('path'=>'cloumn-logo','fileName'=>$fileName);
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
            $resultArr = array('rc'=>0,'data'=>$result['url']);
        } else {
            $resultArr = array('rc'=>3007,'msg'=>'上传logo失败');
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
        if(!isset($data)) return array('rc'=>3001,'msg'=>'没有数据');

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
            return array('rc'=>0, 'msg'=>$msg.'成功');
        } else {
            return array('rc'=>3008, 'msg'=>$msg.'失败');
        }
    }


}