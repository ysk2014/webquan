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
    protected $fillable = array('id', 'rid', 'content', 'type', 'addtime');


    /**
     * 根据用户ID取得消息
     * 
     * @return array
     */
    public function getNewsByUid($uid, $page)
    {
        return $this->select(array('news.*','user.username','article.title'))
                    ->leftJoin('user','news.send_id','=','user.id')
                    ->leftJoin('article','news.aid','=','article.id')
                    ->where('receive_id', $uid)
                    ->orderBy('news.addtime','desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 根据用户ID取得已读和未读消息
     * 
     * @return array
     */
    public function getNewsByUnread($uid , $unread, $page)
    {
        return $this->select(array('news.*','user.username','article.title'))
                    ->leftJoin('user','news.send_id','=','user.id')
                    ->leftJoin('article','news.aid','=','article.id')
                    ->where('receive_id', $uid)
                    ->where('unread', $unread)
                    ->orderBy('news.addtime','desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 未读消息id
     * 
     * @return array
     */
    public function getNewsIdsByUnread($uid)
    {
        return $this->select('id')
                    ->where('receive_id', $uid)
                    ->where('unread', 1)
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
        return $this->where('id','=', intval($id))->update(['unread'=>0]);
    }

    /**
     * 更新消息
     * 
     * @param array $ids 信息ids
     */
    public function updateNews(array $ids)
    {
        return $this->whereIn('id', $ids)->update(['unread'=>0]);
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
        return $this->where('receive_id', $uid)->count();
    }


    /**
     * 获取未读的消息数
     * 
     * @param $aid
     */
    public function countNewsByUid($uid)
    {
        return $this->where('receive_id', $uid)->where('unread', 1)->count();
    }


}
