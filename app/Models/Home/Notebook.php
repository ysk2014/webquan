<?php namespace App\Models\Home;


/**
 * 个人笔记文件夹表模型
 *
 * @author jiang
 */
class Notebook extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'notebook';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'name', 'uid', 'count', 'addtime');

    /**
     * 增加个人笔记文件夹
     * 
     * @param array $data 所需要插入的信息
     */
    public function addNotebook(array $data)
    {
        return $this->insertGetId($data);
    }

    /**
     * 编辑笔记本
     * 
     * @param array $data 所需要更新的信息
     */
    public function editNotebook(array $data, $id)
    {
        return $this->where('id','=', intval($id))->update($data);
    }

    /**
     * 删除笔记本
     * 
     * @param array $ids 笔记本的ID
     */
    public function delNotebook(array $ids)
    {
        return $this->destroy($ids);
    }

    /**
     * 根据笔记本id获取信息
     * 
     * @param intval $id 笔记本的ID
     */
    public function getNotebookById($id)
    {
        return $this->where('id','=', intval($id))->first();
    }

    /**
     * 根据用户id获取笔记本
     * 
     * @param intval $uid 用户的ID
     */
    public function getNotebooksByUid($uid)
    {
        return $this->where('article.uid','=', intval($uid))
                    ->get()
                    ->toArray();
    }

    /**
     * 自增数量
     * 
     * @param intval $id 专题的ID
     */
    public function increment($data,$id)
    {
        return $this->where('id','=', intval($id))
                    ->increment($data);
    }

    /**
     * 自减数量
     * 
     * @param intval $id 专题的ID
     */
    public function decrement($data,$id)
    {
        return $this->where('id','=', intval($id))
                    ->decrement($data);
    }  
}
