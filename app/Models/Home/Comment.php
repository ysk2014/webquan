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
    protected $fillable = array('id', 'aid', 'uid', 'content', 'fid', 'addtime');


    /**
     * 根据文章ID取得评论的内容
     * 
     * @return array
     */
    public function getCommentsByAid($aid, $page)
    {
        return $this->select(array('comment.*','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','comment.uid','=','user.id')
                    ->where('aid', $aid)
                    ->skip($page*8)->take(8)
                    ->get()
                    ->toArray();
    }


    /**
     * 根据ID取得评论的内容
     * 
     * @return array
     */
    public function getOneCommentById($id)
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
        return array('id'=>$this->insertGetId($data),'addtime'=>$data['addtime']);
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
    public function delCommentByUid($aid, $uid)
    {
        return $this->where('aid', $aid)->where('uid', $uid)->delete();
    }

    /**
     * 删除文章id的所有评论
     * 
     * @param $aid
     */
    public function delCommentsByAid($aid)
    {
        return $this->where('aid', $aid)->delete();
    }

    /**
     * 获取文章id的评论总数
     * 
     * @param $aid
     */
    public function countCommentByAid($aid)
    {
        return $this->where('aid', $aid)->count();
    }


}
