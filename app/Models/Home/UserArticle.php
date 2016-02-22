<?php namespace App\Models\Home;
use App\Models\Base;

/**
 * 用户和文章关系表模型
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
     * type的值， 0：推荐，1：收藏
     */
    protected $fillable = array('id', 'aid', 'author_id', 'uid', 'type', 'addtime');

    /**
     * 增加
     *
     * @param array $data 所需要插入的信息
     */
    public function add(array $data)
    {
        return $this->insertGetId($data);
    }

    /**
     * 删除
     * 
     *
     * @param array $ids
     */
    public function del(array $ids)
    {
        return $this->destroy($ids);
    }


    /**
     * 获取ids
     * 
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
     *
     * @param intval $id 用户的ID
     */
    public function getArticlesByUid($uid,$page,$type=0)
    {
        return $this->select(array('article.*','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('article','user_article.aid','=','article.id')
                    ->leftJoin('user','user_article.author_id','=','user.id')
                    ->where('user_article.uid','=', intval($uid))
                    ->where('user_article.type','=', intval($type))
                    ->skip($page*20)->take(20)
                    ->orderBy('user_article.addtime','desc')
                    ->get()
                    ->toArray();
    }

    /**
     * 获取推荐文章的所有用户id
     * 
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

    /**
     * 根据用户id和类型获取文章总数
     * @param intval $id 用户的ID
     */
    public function getCountByType($uid, $type)
    {
        return $this->where('uid','=',$uid)->where('type','=',$type)->count();
    }

}
