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
    public function del(array $ids)
    {
        return $this->destroy($ids);
    }

    /**
     * 获取用户关注的所有专题
     * 
     * @param intval $id 用户的ID
     */
    public function getCloumnsByUid($uid)
    {
        return $this->select(array('cloumn.*'))
                    ->leftJoin('user','user_care_cloumn.uid','=','user.id')
                    ->where('user_care_cloumn.uid','=', intval($uid))
                    ->orderBy('user_care_cloumn.addtime','desc')
                    ->get()
                    ->toArray();
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
