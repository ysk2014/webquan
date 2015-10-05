<?php namespace App\Models\Home;
use App\Models\Base;

/**
 * 用户关注专题表模型
 *
 * @author ysk
 */
class UserCareCloumn extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'user_care_cloumn';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'cid', 'uid', 'addtime');

    /**
     * 增加关注
     * 
     * @param array $data 所需要插入的信息
     */
    public function add(array $data)
    {
        return $this->create($data);
    }


    /**
     * 取消关注
     * 
     * @param array $ids 专题的ID
     */
    public function del($data)
    {
        return $this->where('uid','=',intval($data['uid']))
                    ->where('cid','=',intval($data['cid']))
                    ->delete();
    }

    /**
     * 获取用户关注的所有专题
     * 
     * @param intval $id 用户的ID
     */
    public function getCloumnsByUid($uid,$page)
    {
        return $this->select(array('cloumn.*'))
                    ->leftJoin('cloumn','user_care_cloumn.cid','=','cloumn.id')
                    ->where('user_care_cloumn.uid','=', intval($uid))
                    ->skip($page*24)->take(24)
                    ->orderBy('user_care_cloumn.addtime','desc')
                    ->get()
                    ->toArray();
    }

    /**
     * 获取用户关注的所有专题
     * 
     * @param intval $id 用户的ID
     */
    public function getCidsByUid($uid)
    {
        return $this->select('cid')
                    ->where('uid','=', intval($uid))
                    ->orderBy('addtime','desc')
                    ->get()
                    ->toArray();
    }

    /**
     * 获取专题总数
     * 
     */
    public function countCaresByUid($uid)
    {
        return $this->where('uid','=',$uid)->count();
    } 

    /**
     * 获取关注该专题的所有用户信息
     * 
     * @param $cid 专题id
     */
    public function getUsersByCid($cid)
    {
        return $this->select(array('user.*'))
                    ->leftJoin('user','cloumn.uid','=','user.id')
                    ->where('user_care_cloumn.cid','=', intval($cid))
                    ->orderBy('user_care_cloumn.addtime','desc')
                    ->get()
                    ->toArray();
    }

}
