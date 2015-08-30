<?php namespace App\Models\Home;


use App\Models\Base;

/**
 * 专题表模型
 *
 * @author ysk
 */
class Cloumn extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'cloumn';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'title', 'description', 'uid', 'view', 'count', 'care', 'is_contribute', 'is_check', 'last_time', 'addtime');

    /**
     * 增加专题
     * 
     * @param array $data 所需要插入的信息
     */
    public function add(array $data)
    {
        return $this->insertGetId($data);
    }

    /**
     * 编辑专题
     * 
     * @param array $data 所需要更新的信息
     */
    public function edit(array $data, $id)
    {
        return $this->where('id','=', intval($id))->update($data);
    }

    /**
     * 删除专题
     * 
     * @param array $ids 专题的ID
     */
    public function deleteCloumn(array $ids)
    {
        return $this->destroy($ids);
    }

    /**
     * 获取专题信息
     * 
     * @param intval $id 专题的ID
     */
    public function getCloumnById($id)
    {
        return $this->select(array('cloumn.*','user.name as uname'))
                    ->leftJoin('user','cloumn.uid','=','user.id')
                    ->where('cloumn.id','=', intval($id))
                    ->first();
    }

    /**
     * 获取所有专题信息
     * 
     * @param $data 排序
     */
    public function getCloumns($data)
    {
        return $this->select(array('cloumn.*','user.*'))
                    ->leftJoin('user','cloumn.uid','=','user.id')
                    ->orderBy('cloumn.'.$data,'desc')
                    ->get()
                    ->toArray();
    }

    /**
     * 获取专题check
     * 
     * @param intval $id 专题的ID
     */
    public function getCheckById($id)
    {
        return $this->select('is_check')
                    ->where('id','=', intval($id))
                    ->first();
    }

    /**
     * 获取专题contribute
     * 
     * @param intval $id 专题的ID
     */
    public function getContributeById($id)
    {
        return $this->select('is_contribute')
                    ->where('id','=', intval($id))
                    ->first();
    }

    /**
     * 自增数量
     * 
     * @param intval $id 专题的ID
     */
    public function incrementData($data,$id)
    {
        return $this->where('id','=', intval($id))
                    ->increment($data);
    }

    /**
     * 自减数量
     * 
     * @param intval $id 专题的ID
     */
    public function decrementData($data,$id)
    {
        return $this->where('id','=', intval($id))
                    ->decrement($data);
    } 


}
