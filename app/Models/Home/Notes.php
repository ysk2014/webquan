<?php namespace App\Models\Home;

use App\Models\Base;

/**
 * 文集表模型
 *
 * @author ysk
 */
class Notes extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'notes';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'title', 'content', 'description', 'logo_dir', 'uid', 'cid', 'tags', 'addtime','update_time');

    /**
     * 增加文集
     * 
     * @param array $data 所需要插入的信息
     */
    public function addNote(array $data)
    {
        return $this->insertGetId($data);
    }

    /**
     * 编辑文集
     * 
     * @param array $data 所需要更新的信息
     */
    public function editNote(array $data, $id)
    {
        return $this->where('id','=', intval($id))->update($data);
    }

    /**
     * 删除文集
     * 
     * @param array $ids 文章的ID
     */
    public function delNotes(array $ids)
    {
        return $this->destroy($ids);
    }

    /**
     * 根据文集id获取信息
     * 
     * @param intval $id 文集的ID
     */
    public function getNoteById($id)
    {
        return $this->select(array('notes.*','user.username','user.logo_dir as userUrl','cloumn.name as cloumnName'))
                    ->leftJoin('user','notes.uid','=','user.id')
                    ->leftJoin('cloumn','notes.cid','=','cloumn.id')
                    ->where('notes.id','=', intval($id))
                    ->first();
    }


    /**
     * 根据用户id获取文集信息列表
     * 
     * @param intval $uid 用户的ID
     */
    public function getNotesByUid($uid,$nids,$page)
    {
        return $this->select(array('notes.*','cloumn.name as cloumn','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','notes.uid','=','user.id')
                    ->leftJoin('cloumn','notes.cid','=','cloumn.id')
                    ->where('notes.uid','=', intval($uid))
                    ->whereNotBetween('notes.id', $nids)
                    ->orderBy('notes.addtime','desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 根据用户id数组获取文集总数
     * 
     * @param  $uid 用户的ID
     */
    public function getNotesCountByUid($uid)
    {
        return $this->where('uid', $uid)->count();
    }

}
