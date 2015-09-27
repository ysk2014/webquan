<?php namespace App\Models\Home;

use App\Models\Base;

/**
 * 文章表模型
 *
 * @author jiang
 */
class Article extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'article';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'title', 'content', 'description', 'logo_dir', 'uid', 'cid', 'view', 'care', 'comment', 'is_publish', 'addtime');

    /**
     * 增加文章
     * 
     * @param array $data 所需要插入的信息
     */
    public function addArticle(array $data)
    {
        return $this->insertGetId($data);
    }

    /**
     * 编辑文章
     * 
     * @param array $data 所需要更新的信息
     */
    public function editArticle(array $data, $id)
    {
        return $this->where('id','=', intval($id))->update($data);
    }

    /**
     * 删除文章
     * 
     * @param array $ids 文章的ID
     */
    public function delArticle(array $ids)
    {
        return $this->destroy($ids);
    }

    /**
     * 根据文章id获取文章信息
     * 
     * @param intval $id 文章的ID
     */
    public function getArtById($id)
    {
        return $this->select(array('article.*','user.username','cloumn.title as cloumnName'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->leftJoin('cloumn','article.cid','=','cloumn.id')
                    ->where('article.id','=', intval($id))
                    ->first();
    }

    /**
     * 根据专题id获取文章信息
     * 
     * @param intval $cid 专题的ID
     */
    public function getArtsByCid($cid,$way='addtime',$page)
    {
        return $this->select(array('article.*','user.username'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->where('article.cid','=', intval($cid))
                    ->orderBy($way,'desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 获取已公布的所有文章信息
     * 
     * @param $data 排序
     */
    public function getAllArticle($data='addtime',$page)
    {
        return $this->select(array('article.*','user.username'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->orderBy('article.'.$data,'desc')
                    ->where('article.is_publish','=',0)
                    ->skip($page*10)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 获取专题is_publish
     * 
     * @param intval $id 专题的ID
     */
    public function getPublishById($id)
    {
        return $this->select('is_publish')
                    ->where('id','=', intval($id))
                    ->first();
    }


    /**
     * 自增数量
     * 
     * @param intval $id 专题的ID
     */
    public function incrementById($data,$id)
    {
        return $this->where('id','=', intval($id))
                    ->increment($data);
    }

    /**
     * 自减数量
     * 
     * @param intval $id 专题的ID
     */
    public function decrementById($data,$id)
    {
        return $this->where('id','=', intval($id))
                    ->decrement($data);
    }  

    /**
     * 获取文章总数
     * 
     */
    public function countArticle()
    {
        return $this->count();
    } 

    /**
     * 获取根据专题id文章总数
     * 
     * @param intval $id 专题的ID
     */
    public function countArticleByCid($cid)
    {
        return $this->where('cid','=',intval($cid))->count();
    }

}
