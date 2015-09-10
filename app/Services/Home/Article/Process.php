<?php
namespace App\Services\Home\Article;

use App\Models\Article as ArticleModel;
use App\Services\Home\Article\ArticleValidate;
use App\Services\BaseProcess;
use Lang;


/**
* 文章处理
*
* @author ysk
*/
class Process extends BaseProcess
{
    /**
     * 文章模型
     * 
     * @var object
     */
    private $articleModel;

    /**
     * 用户表单验证对象
     * 
     * @var object
     */
    private $articleValidate;

    /**
     * 初始化
     *
     * @access public
     */
	function __construct()
	{
        if( ! $this->articleModel) $this->articleModel = new ArticleModel();
        if( ! $this->articleValidate) $this->asrticleValidate = new ArticleValidate();
	}

	/**
	* 增加文章
	*
	* @param object $data;
	* @access public
	* @return boolean true|false
	*/
	public function addArticle($data)
	{
		// 进行文章表单验证
		if( !$this->articleValidate->add($data)) return $this->setErrorMsg($this->articleValidate->getErrorMessage());

		if($this->articleModel->addArticle($data) != false) return true;
		return $this->setErrorMsg('添加失败');
	}

	/**
	* 删除文章
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function delArticle($ids)
	{
		if( !is_array($ids) ) return false;

		if($this->articleModel->delArticle($ids) != false) return true;
		return $this->setErrorMsg('删除失败');
	}


	/**
	* 编辑文章
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function editArticle($data)
	{
		if( !is_array($data->id) ) return $this->setErrorMsg('没有文章id');
		// 进行文章表单验证
		if( !$this->articleValidate->edit($data)) return $this->setErrorMsg($this->articleValidate->getErrorMessage());

		$id = intval($data->id);
		unset($data->id);

		if($this->articleModel->editArticle($data, $id) != false) return true;
		return $this->setErrorMsg('编辑失败');
	}



}

?>