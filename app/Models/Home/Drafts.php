<?php namespace App\Models\Home;

use App\Models\Base;

/**
 * 草稿表模型
 *
 * @author ysk
 */
class Drafts extends Base
{
    /**
     * 表名
     *
     * @var string
     */
    protected $table = 'drafts';


    /**
     * 可以被集体附值的表的字段
     *
     * @var string
     */
    protected $fillable = array('id', 'title', 'content', 'description', 'logo_dir', 'uid', 'cid', 'aid', 'tags', 'addtime','update_time');

    /**
     * 增加草稿
     * 
     * @param array $data 所需要插入的信息
     */
    public function addDraft(array $data)
    {
        return $this->insertGetId($data);
    }

    /**
     * 编辑草稿
     * 
     * @param array $data 所需要更新的信息
     */
    public function editDraft(array $data, $id)
    {
        return $this->where('id','=', intval($id))->update($data);
    }

    /**
     * 删除草稿
     * 
     * @param array $ids 文章的ID
     */
    public function delDrafts(array $ids)
    {
        return $this->destroy($ids);
    }

    /**
     * 根据草稿id获取草稿信息
     * 
     * @param intval $id 草稿的ID
     */
    public function getDraftById($id)
    {
        return $this->select(array('drafts.*','user.username','user.logo_dir as userUrl','cloumn.name as cloumnName'))
                    ->leftJoin('user','drafts.uid','=','user.id')
                    ->leftJoin('cloumn','drafts.cid','=','cloumn.id')
                    ->where('drafts.id','=', intval($id))
                    ->first();
    }

    /**
     * 根据草稿id获取草稿信息
     * 
     * @param intval $id 草稿的ID
     */
    public function getDraftSingleById($id)
    {
        return $this->select('*')
                    ->where('id','=', intval($id))
                    ->get()
                    ->toArray();
    }

    /**
     * 根据用户id获取草稿信息列表
     * 
     * @param intval $cid 专题的ID
     */
    public function getDraftsByUid($uid,$page)
    {
        return $this->select(array('drafts.*','cloumn.name as cloumn','user.username','user.logo_dir as userUrl'))
                    ->leftJoin('user','drafts.uid','=','user.id')
                    ->leftJoin('cloumn','drafts.cid','=','cloumn.id')
                    ->where('drafts.uid','=', intval($uid))
                    ->orderBy('drafts.addtime','desc')
                    ->skip($page*20)->take(20)
                    ->get()
                    ->toArray();
    }

    /**
     * 根据专题id数组获取草稿总数
     * 
     * @param array $cids 专题的ID
     */
    public function getDraftsCountByUid($uid)
    {
        return $this->where('uid', $uid)->count();
    }

}
