<?php namespace App\Models\Home;

use App\Models\Base;
/**
 * 标签表模型
 *
 * @author jiang
 */
class Tag extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'tag';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'name', 'description', 'addtime');

    /**
     * 增加标签
     * 
     * @param array $data 所需要插入的信息
     */
    public function addTag(array $data)
    {
        return $this->insertGetId($data);
    }

    /**
     * 编辑标签
     * 
     * @param array $data 所需要更新的信息
     */
    public function editTag(array $data, $id)
    {
        return $this->where('id','=', intval($id))->update($data);
    }

    /**
     * 删除标签
     * 
     * @param array $ids 笔记本的ID
     */
    public function delTag(array $ids)
    {
        return $this->destroy($ids);
    }

    /**
     * 获取所有标签信息
     * 
     */
    public function getAllTags()
    {
        return $this->skip(0)->take(18)->get()->toArray();
    }

    /**
     * 获取所有标签信息
     * 
     */
    public function getCount()
    {
        return $this->count();
    }

    /**
     * 根据标签name获取标签信息
     * 
     * @param string $name
     */
    public function getTagByName($name)
    {
        return $this->where('name','=', $name)->first();
    }

    /**
     * 根据标签name获取所有标签信息
     * 
     * @param string $name
     */
    public function getTagsLikeName($name)
    {
        return $this->where('name','like', '%'.$name.'%')->get()->toArray();
    }

 
}
