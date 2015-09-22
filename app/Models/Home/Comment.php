<?php namespace App\Models\Home;

use Illuminate\Database\Eloquent\Model;

/**
 * 评论表模型
 *
 * @author ysk
 */
class Comment extends Model
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'comment';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'aid', 'uid', 'content', 'addtime');


    /**
     * 根据文章ID取得评论的内容
     * 
     * @return array
     */
    public function getContentByAid($aid)
    {
        return $this->where('aid', $aid)->get()->toArray();
    }


    /**
     * 根据ID取得评论的内容
     * 
     * @return array
     */
    public function getOneContentById($id)
    {
        return $this->where('id', $id)->first()->toArray();
    }

    /**
     * 增加评论
     * 
     * @param array $data 所需要插入的信息
     */
    public function addComment(array $data)
    {
        return $this->insertGetId($data);
    }

    /**
     * 删除评论
     * 
     * @param array $data 所需要插入的信息
     */
    public function delComment($ids)
    {
        return $this->destroy($ids);
    }

    /**
     * 根据用户id删除评论
     * 
     * @param $aid,$uid
     */
    public function delContentByUid($aid, $uid)
    {
        return $this->where('aid', $aid)->where('uid', $uid)->delete();
    }

    /**
     * 删除文章id的所有评论
     * 
     * @param $aid
     */
    public function delContentByAid($aid)
    {
        return $this->where('aid', $aid)->delete();
    }

}
