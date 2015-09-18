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
    protected $fillable = array('id', 'title', 'description', 'logo_dir', 'uid', 'view', 'count', 'care', 'tag','addtime');

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
    public function getCloumns($data='addtime')
    {
        return $this->select(array('cloumn.*','user.*'))
                    ->leftJoin('user','cloumn.uid','=','user.id')
                    ->orderBy('cloumn.'.$data,'desc')
                    ->get()
                    ->toArray();
    }


    /**
     * 根据专题名称获取专题信息
     * 
     * @param string $title 专题的名称
     */
    public function getInfoByTitle($title)
    {
        return $this->where('title','=', $title)->first();
    }


    /**
     * 获取专题某个字段
     * 
     * @param string $data 专题的字段
     * @param intval $id 专题的ID
     */
    public function getDataById($data,$id)
    {
        return $this->select($data)
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
