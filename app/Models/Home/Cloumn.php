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
    protected $fillable = array('id', 'name', 'description', 'logo_dir', 'uid', 'count', 'view', 'care', 'update_time', 'addtime');

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
        return $this->select(array('cloumn.*','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','cloumn.uid','=','user.id')
                    ->where('cloumn.id','=', intval($id))
                    ->first();
    }
    /**
     * 根据用户id获取专题信息
     * 
     * @param intval $uid 用户的ID
     */
    public function getCloumnByUid($uid)
    {
        return $this->select(array('cloumn.*','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','cloumn.uid','=','user.id')
                    ->where('cloumn.uid','=', intval($uid))
                    ->first();
    }

    /**
     * 根据用户id获取所有专题
     * 
     * @param intval $uid 用户的ID
     */
    public function getAllCloumnsByUid($uid)
    {
        return $this->where('cloumn.uid','=', intval($uid))
                    ->orderBy('addtime','desc')
                    ->get()
                    ->toArray();
    }

    /**
     * 获取所有专题信息
     * 
     * @param $data 排序
     */
    public function getCloumns($data,$page)
    {
        return $this->select(array('cloumn.*','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','cloumn.uid','=','user.id')
                    ->skip($page*24)->take(24)
                    ->orderBy($data,'desc')
                    ->get()
                    ->toArray();
    }


    /**
     * 根据专题名称获取专题信息
     * 
     * @param string $title 专题的名称
     */
    public function getInfoByName($Name)
    {
        return $this->where('title','=', $title)->first();
    }

    /**
     * 获取专题总数
     * 
     */
    public function countCloumnByUid($uid)
    {
        return $this->where('uid','=',$uid)->count();
    } 

    /**
     * 获取专题总数
     * 
     */
    public function countCloumn()
    {
        return $this->count();
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
