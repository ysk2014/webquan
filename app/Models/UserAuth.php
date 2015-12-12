<?php
namespace App\Models;

use App\Models\Base;

/**
* 用户表模型
*/
class UserAuth extends Base
{
	/**
	* 数据表名
	*
	* @var string 
	*/
	protected $table = 'user_auth';

	/**
	* 可以被集体附值的表的字段
	*
	* @var string 
	*/
	protected $fillable = array('id', 'uid', 'openid', 'type', 'addtime');

    /**
     * 取得用户的信息，根据用户名
     * 
     * @param string $username 用户名
     */
    public function InfoByOid($openid)
    {
        return $this->where('openid', $openid)->first();
    }

    /**
     * 增加用户
     * 
     * @param array $data 所需要插入的信息
     */
    public function addUserAuth(array $data)
    {
        return $this->create($data);
    }

}
?>