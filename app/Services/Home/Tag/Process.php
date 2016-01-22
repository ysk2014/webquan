<?php namespace App\Services\Home\Tag;

use Lang;
use App\Models\Home\Tag as TagModel;
use App\Services\BaseProcess;

/**
 * 标签相关处理
 *
 * @author ysk
 */
class Process extends BaseProcess
{
    /**
     * 标签数据模型
     *
     * @var object
     */
    private $tagModel;


    /**
     * 初始化
     */
    public function __construct()
    {
        if( !$this->tagModel ) $this->tagModel = new TagModel();
    }

    /**
    * 添加标签
    *
    * @param object $data;
    * @access public
    * @return boolean true|false
    */
    public function addTag(\App\Services\Home\Tag\TagSave $data)
    {
        // 保存到数据库
        $id=$this->tagModel->addTag($data->toArray());
        if($id) return array('error'=>false, 'msg'=>'创建成功', 'data'=>$id);
        // 保存失败
        return array('error'=>true, 'msg'=>'创建失败');
    }

    /**
     * 编辑标签
     *
     * @param object $data
     * @access public
     * @return boolean true|false
     */
    public function editTag(\App\Services\Home\Tag\TagSave $data)
    {
        if( !isset($data->id) ) return array('error'=>true, 'msg'=>'参数没有设置');

        $id = intval($data->id); unset($data->id);
        // 更新数据库
        $this->tagModel->edit($data->toArray(),$id);
        return array('error'=>false, 'msg'=>'更新成功');
    }

    /**
     * 删除标签
     *
     * @param array $ids
     * @access public
     * @return boolean true|false
     */
    private function delTag($ids)
    {
        if( !is_array($ids) ) return array('error'=>true, 'msg'=>'参数没有设置');

        if($this->tagModel->delTag($ids) !== false) return array('error'=>false, 'msg'=>'删除成功');

        return array('error'=>true, 'msg'=>'删除失败');
    }

    /**
     * 获取单个标签
     *
     * @param intval $data
     * @access public
     * @return boolean true|false
     */
    public function getTagByName($data)
    {
        if(!isset($data)) return array('error'=>true, 'msg'=>'参数没有设置');
        
        $result = $this->tagModel->getTagByName($data);
        
        if ($result) {
            return array('error'=>false, 'data'=>$result);
        } else {
            return array('error'=>true, 'msg'=>'没有标签');
        }
        
    }

    /**
     * 获取
     *
     * @param intval $data
     * @access public
     * @return boolean true|false
     */
    public function getTagsLikeName($data)
    {
        if(!isset($data)) return array('error'=>true, 'msg'=>'参数没有设置');
        
        $result = $this->tagModel->getTagsLikeName($data);
        
        return array('error'=>false, 'data'=>$result);
    }
    /**
     * 获取所有标签
     *
     * @access public
     * @return array
     */
    public function getAllTags()
    {
        $count = $this->tagModel->getCount();
        if (!empty($count)) {
            $result = $this->tagModel->getAllTags();

            if (!empty($result)) {
                if ($count>18) {
                    return array('error'=>false, 'data'=>$result,'next'=>true);
                } else {
                    return array('error'=>false, 'data'=>$result, 'next'=>false);
                }
            } else {
                return array('error'=>true, 'msg'=>'查询所有标签失败');
            }
        } else {
            return array('error'=>true, 'count'=>0);
        }
    }
}