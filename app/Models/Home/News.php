<?php namespace App\Models\Home;

use App\Models\Base;

/**
 * 消息表模型
 *
 * @author ysk
 */
class News extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'news';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'rid', 'content', 'type', 'status', 'addtime');


    /**
     * 根据用户ID取得消息
     * 
     * @return array
     */
    public function getNewsByUid($uid, $page)
    {
        return $this->select('*')
                    ->where('rid', $uid)
                    ->orderBy('addtime','desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 根据消息分类取得消息列表
     * 
     * @return array
     */
    public function getNewsByType($uid , $type, $page)
    {
        return $this->select('*')
                    ->where('rid', $uid)
                    ->where('type', $type)
                    ->orderBy('addtime','desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 未读消息id
     * 
     * @return array
     */
    public function getNewsIdsByStatus($uid)
    {
        return $this->select('id')
                    ->where('rid', $uid)
                    ->where('status', 0)
                    ->get()
                    ->toArray();
    }

    /**
     * 根据ID取得单个消息
     * 
     * @return array
     */
    public function getOneNewById($id)
    {
        return $this->where('id', $id)->first();
    }

    /**
     * 增加消息
     * 
     * @param array $data 所需要插入的信息
     */
    public function addNew(array $data)
    {
        return $this->insertGetId($data);
    }

    /**
     * 更新消息
     * 
     * @param intval $id 信息id
     */
    public function updateNew($id)
    {
        return $this->where('id','=', intval($id))->update(['status'=>1]);
    }

    /**
     * 更新消息
     * 
     * @param array $ids 信息ids
     */
    public function updateNews(array $ids)
    {
        return $this->whereIn('id', $ids)->update(['status'=>1]);
    }

    /**
     * 删除消息
     * 
     * @param array $data 所需要插入的信息
     */
    public function delNews($ids)
    {
        return $this->destroy($ids);
    }


    /**
     * 获取消息数
     * 
     */
    public function countNews($uid)
    {
        return $this->where('rid', $uid)->count();
    }


    /**
     * 获取类型的消息数
     * 
     * @param $aid
     */
    public function countNewsByType($uid,$type)
    {
        return $this->where('rid', $uid)->where('type', $type)->count();
    }

    /**
     * 获取未读的消息数
     * 
     * @param $aid
     */
    public function countNewsByStatus($uid,$status)
    {
        return $this->where('rid', $uid)->where('status', $status)->count();
    }

}
