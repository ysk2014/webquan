<?php namespace App\Models\Home;

use App\Models\Base;

/**
 * 文章表模型
 *
 * @author ysk
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
    protected $fillable = array('id', 'title', 'content', 'description', 'logo_dir', 'uid', 'cid', 'view', 'tags', 'praise', 'store', 'comment', 'is_publish', 'update_time', 'addtime');

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
        return $this->select(array('article.*','user.username','user.logo_dir as userUrl','cloumn.name as cloumnName'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->leftJoin('cloumn','article.cid','=','cloumn.id')
                    ->where('article.id','=', intval($id))
                    ->first();
    }

    /**
     * 根据用户id获取文章信息列表
     * 
     * @param intval $cid 专题的ID
     */
    public function getArtsByUid($uid,$way='addtime',$page,$is_publish=1)
    {
        return $this->select(array('article.*','cloumn.name as cloumn','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->leftJoin('cloumn','article.cid','=','cloumn.id')
                    ->where('article.uid','=', intval($uid))
                    ->where('article.is_publish','=',$is_publish)
                    ->orderBy('article.'.$way,'desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }


    /**
     * 根据单个专题id获取文章信息
     * 
     * @param intval $cid 专题的ID
     */
    public function getArtsByCid($cid,$way='addtime',$page)
    {
        return $this->select(array('article.*','cloumn.name as cloumn','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->leftJoin('cloumn','article.cid','=','cloumn.id')
                    ->where('article.cid','=', intval($cid))
                    ->where('article.is_publish','=',1)
                    ->orderBy('article.'.$way,'desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 根据专题id数组获取文章信息
     * 
     * @param array $cids 专题的ID
     * @param $page 分页
     */
    public function getArtsByCids($cids,$page)
    {
        return $this->select(array('article.*','cloumn.name as cloumn','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->leftJoin('cloumn','article.cid','=','cloumn.id')
                    ->whereIn('article.cid', $cids)
                    ->where('article.is_publish','=',1)
                    ->orderBy('article.addtime','desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }



    /**
     * 获取已公布的所有文章信息
     * 
     * @param $data 排序
     * @param $page 分页
     */
    public function getAllArticle($data='addtime',$page)
    {
        return $this->select(array('article.*','cloumn.name as cloumn','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->leftJoin('cloumn','article.cid','=','cloumn.id')
                    ->orderBy('article.'.$data,'desc')
                    ->where('article.is_publish','=',1)
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 模糊查询标签名称的文章列表
     * 
     * @param $data 便签关键字name和分页page
     */
    public function getArtsLikeTagName($data)
    {
        return $this->select(array('article.*','cloumn.name as cloumn','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->leftJoin('cloumn','article.cid','=','cloumn.id')
                    ->orderBy('article.addtime','desc')
                    ->where('article.is_publish','=',1)
                    ->where('article.tags','like','%'.$data['name'].'%')
                    ->skip($data['page']*20)->take(20)
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
    public function incrementById($data,$id,$len=1)
    {
        return $this->where('id','=', intval($id))
                    ->increment($data,$len);
    }

    /**
     * 自减数量
     * 
     * @param intval $id 专题的ID
     */
    public function decrementById($data,$id,$len=1)
    {
        return $this->where('id','=', intval($id))
                    ->decrement($data,$len);
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

    /**
     * 根据专题id数组获取文章总数
     * 
     * @param array $cids 专题的ID
     */
    public function getArtsCountByCids($cids)
    {
        return $this->whereIn('cid', $cids)->count();
    }

    /**
     * 根据专题id数组获取文章总数
     * 
     * @param array $cids 专题的ID
     */
    public function getArtsCountByUid($uid)
    {
        return $this->where('uid', $uid)->count();
    }

    /**
     * 模糊查询标签名称的文章总数
     * 
     * @param $name 标签名称
     */
    public function getArtsCountLikeTagName($name)
    {
        return $this->where('tags','like','%'.$name.'%')->count();
    }

}
