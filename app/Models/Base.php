<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
* 数据模型基类
*/
class Base extends Model
{
	/**
     * 关闭自动维护updated_at、created_at字段
     * 
     * @var boolean
     */
    public $timestamps = false;
}

?>