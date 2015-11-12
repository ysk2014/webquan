<?php
namespace App\Models;

use App\Models\Base;

/**
* bug表模型
*/
class Bug extends Base
{
	/**
	* 数据表名
	*
	* @var string 
	*/
	protected $table = 'bug';

	/**
	* 可以被集体附值的表的字段
	*
	* @var string 
	*/
	protected $fillable = array('id', 'content', 'uid', 'addtime');


    /**
     * 增加bug
     * 
     * @param array $data 所需要插入的信息
     */
    public function addBug(array $data)
    {
        return $this->create($data);
    }
    
    
    /**
     * 删除用户
     * 
     * @param array $ids 权限功能的ID
     */
    public function deleteBug(array $ids)
    {
        return $this->destroy($ids);
    }


    /**
     * 获取所有bug
     * 
     * @return array
     */
    public function getAllBugs()
    {
        return $this->select(array('bug.*','user.username'))
                    ->leftJoin('user','bug.uid','=','user.id')
                    ->get()
                    ->toArray();
    }

}