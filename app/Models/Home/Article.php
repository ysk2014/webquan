<?php namespace App\Models\Home;


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
    protected $fillable = array('id', 'title', 'content', 'uid', 'cid', 'view', 'care', 'comment', 'is_publish', 'is_check', 'addtime');

    /**
     * 增加文章
     * 
     * @param array $data 所需要插入的信息
     */
    public function addArticle(array $data)
    {
        return $this->create($data);
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
     * @param array $ids 专题的ID
     */
    public function delArticle(array $ids)
    {
        return $this->destroy($ids);
    }

    /**
     * 获取文章信息
     * 
     * @param intval $id 专题的ID
     */
    public function getArtById($id)
    {
        return $this->select(array('article.*','user.*'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->where('article.id','=', intval($id))
                    ->first();
    }

    /**
     * 获取所有专题信息
     * 
     * @param $data 排序
     */
    public function getArts($data)
    {
        return $this->select(array('article.*','user.*'))
                    ->leftJoin('user','article.uid','=','user.id')
                    ->orderBy('article.'.$data,'desc')
                    ->get()
                    ->toArray();
    }

    /**
     * 获取专题check
     * 
     * @param intval $id 专题的ID
     */
    public function getCheckById($id)
    {
        return $this->select('is_check')
                    ->where('id','=', intval($id))
                    ->first();
    }


    /**
     * 自增数量
     * 
     * @param intval $id 专题的ID
     */
    public function increment($data,$id)
    {
        return $this->where('id','=', intval($id))
                    ->increment($data);
    }

    /**
     * 自减数量
     * 
     * @param intval $id 专题的ID
     */
    public function decrement($data,$id)
    {
        return $this->where('id','=', intval($id))
                    ->decrement($data);
    }  
}
