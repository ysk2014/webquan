<?php
namespace App\Services\Home\Article;

use App\Services\BaseValidate;
use Validator, Lang;

/**
* 文章表单验证
*
* @author ysk
*/
class ArticleValidate extends BaseValidate
{
	/**
	* 增加文章的时候的表单验证
	*
	* @access public
	*/
	public function add(\App\Services\Home\Article\ArticleSave $data)
	{
		// 创建验证规则
		$rules = array(
			'title' 		  => 'required',
			'content'    	  => 'required',
			'description'     => 'description',
			'cid' 		      => 'required',
			'uid'             => 'required',
			'is_publish'      => 'required',
		);

		// 自定义验证信息
		$messages = array(
			'title.required'         => Lang::get('标题不能为空'),
			'content.required'       => Lang::get('内容不能为空'),
			'description.required'   => Lang::get('描述不能为空'),
			'cid.required'           => Lang::get('专题不能为空'),
			'uid.required'           => Lang::get('作者不能为空'),
			'is_publish.required'    => Lang::get('公布不能为空'),
		);

		// 开始验证
		$validator = Validator::make($data->toArray(),$rules,$messages);
		if($validator->fails())
		{
			$this->errorMsg = $validator->messages()->first();
			return false;
		}
		return true;
	}


	/**
	* 编辑文章的时候的表单验证
	*
	* @access public
	*/
	public function edit(\App\Services\Home\Article\ArticleSave $dat)
	{
		$this->add($data);
	}
}
?>