<?php namespace App\Models\Home;
use App\Models\Base;

/**
 * 用户推荐文章表模型
 *
 * @author ysk
 */
class UserPraiseArticle extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'user_praise_article';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'aid', 'uid', 'addtime');

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
                    ->delete();
    }

    /**
     * 获取推荐id
     * 
     */
    public function getPraiseId($aid,$uid)
    {
        return $this->select('id')
                    ->where('uid','=',intval($uid))
                    ->where('aid','=',intval($aid))
                    ->first();
    }

    /**
     * 获取用户推荐的所有文章
     * 
     * @param intval $id 用户的ID
     */
    public function getArticlesByUid($uid,$page)
    {
        return $this->select(array('article.*'))
                    ->leftJoin('article','user_praise_article.aid','=','article.id')
                    ->where('user_praise_article.uid','=', intval($uid))
                    ->skip($page*24)->take(24)
                    ->orderBy('user_praise_article.addtime','desc')
                    ->get()
                    ->toArray();
    }

    /**
     * 获取推荐文章的所有用户id
     * 
     * @param intval $id 文章的ID
     */
    public function getUidsByAid($aid)
    {
        return $this->select('uid')
                    ->where('aid','=', intval($aid))
                    ->orderBy('addtime','desc')
                    ->get()
                    ->toArray();
    }

}
