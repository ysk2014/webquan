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
	public function addArticle(\App\Services\Home\Article\ArticleSave $data)
	{
		$resultArr = [];
		// 进行文章表单验证
		if( !$this->articleValidate->add($data) ) 
			return array('error'=>true,'msg'=>$this->articleValidate->getErrorMessage());

		if($this->articleModel->addArticle($data->toArray()) != false) {
			$resultArr = array('error'=>false, 'msg'=>'创建成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'创建失败');
		}
		return $resultArr;
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
		$resultArr = [];
		if( !is_array($ids) ) return array('error'=>true,'msg'=>'没有文章id');

		if($this->articleModel->delArticle($ids) != false) {
			$resultArr = array('error'=>false, 'msg'=>'删除成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'删除失败');
		}
		return $resultArr;
	}


	/**
	* 编辑文章
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function editArticle(\App\Services\Home\Article\ArticleSave $data)
	{	
		$resultArr = [];
		if( !isset($data->id) ) return array('error'=>true,'msg'=>'没有文章id');
		// 进行文章表单验证
		if( !$this->articleValidate->edit($data)) return array('error'=>true, 'msg'=>$this->articleValidate->getErrorMessage());

		$id = intval($data->id);
		unset($data->id);

		if($this->articleModel->editArticle($data, $id) != false) {
			$resultArr = array('error'=>false, 'msg'=>'编辑成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'编辑失败');
		}
		return $resultArr;
	}

	/**
	* 获取文章列表
	*
	* @param intval $data;
	* @access public
	* @return array
	*/
	public function getAllArticle($data)
	{
		$articleInfo = $this->articleModel->getAllArticle($data);
		if($articleInfo) {
			return array('error'=>false,'data'=>$articleInfo);
		} else {
			return array('error'=>true,'msg'=>'获取文章失败');
		}
	}

	/**
	* 获取文章信息
	*
	* @param intval $id;
	* @access public
	* @return array
	*/
	public function getArticleById($id)
	{
		$articleInfo = $this->articleModel->getArtById($id);
		if($articleInfo) {
			$this->articleModel->increment('view', $id);
			return array('error'=>false,'data'=>$articleInfo);
		} else {
			return array('error'=>true,'msg'=>'获取文章失败');
		}
	}


}

?>