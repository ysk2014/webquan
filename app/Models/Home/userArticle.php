<?php namespace App\Models\Home;
use App\Models\Base;

/**
 * 用户推荐文章表模型
 *
 * @author ysk
 */
class UserArticle extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'user_article';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     * type的值， 0：点赞，1：收藏
     */
    protected $fillable = array('id', 'aid', 'uid', 'type', 'addtime');

    /**
     * 增加推荐
     * 
     * @param array $data 所需要插入的信息
     */
    public function add(array $data)
    {
        return $this->create($data);
    }


    /**
     * 取消推荐
     * 
     */
    public function del($data)
    {
        return $this->where('uid','=',intval($data['uid']))
                    ->where('aid','=',intval($data['aid']))
                    ->where('type','=',intval($data['type']))
                    ->delete();
    }

    /**
     * 获取ids
     * 
     */
    public function getIds($aid,$uid)
    {
        return $this->select('id','type')
                    ->where('uid','=',intval($uid))
                    ->where('aid','=',intval($aid))
                    ->get()
                    ->toArray();
    }

    /**
     * 获取id
     * 
     */
    public function getId($aid,$uid,$type)
    {
        return $this->select('id')
                    ->where('uid','=',intval($uid))
                    ->where('aid','=',intval($aid))
                    ->where('type','=',intval($type))
                    ->first();
    }

    /**
     * 获取用户推荐的所有文章
     * 
     * @param intval $id 用户的ID
     */
    public function getArticlesByUid($uid,$page,$type=0)
    {
        return $this->select(array('article.*'))
                    ->leftJoin('article','user_article.aid','=','article.id')
                    ->where('user_article.uid','=', intval($uid))
                    ->where('user_article.type','=', intval($type))
                    ->skip($page*24)->take(24)
                    ->orderBy('user_article.addtime','desc')
                    ->get()
                    ->toArray();
    }

    /**
     * 获取推荐文章的所有用户id
     * 
     * @param intval $id 文章的ID
     */
    public function getUidsByAid($aid,$type=0)
    {
        return $this->select('uid')
                    ->where('aid','=', intval($aid))
                    ->where('type','=', intval($type))
                    ->orderBy('addtime','desc')
                    ->get()
                    ->toArray();
    }

}
