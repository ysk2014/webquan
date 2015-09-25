<?php
namespace App\Services\Home\Article;

use App\Models\Home\Article as ArticleModel;
use App\Services\Home\Article\ArticleValidate;
use App\Services\BaseProcess;
use Lang, Cache;


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
     * 文章表单验证对象
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
        if( ! $this->articleValidate) $this->articleValidate = new ArticleValidate();
	}

	/**
	* 判断上传文件的文件夹是否为空
	*
	* @param string 文件夹路径
	* @access private
	* @return boolean true|false
	*/
	private function is_empty_dir($dir)
	{
		$H = @opendir($dir); 
        $i=0;    
        while($_file=readdir($H)){    
            $i++;    
        }    
        closedir($H);
        if($i>2){ 
            return false; 
        }else{ 
            return true;  
        } 
	}

	/**
	* 删除上传的没有用到的图片，并把第一张图片作为文章的logo
	*
	* @param object $data;
	* @access private
	* @return object $data
	*/
	private function dealData(\App\Services\Home\Article\ArticleSave $data)
	{
		// 匹配文章内容中所有的图片
		$status = preg_match_all('/!\[\]\(\/upload_path\/.+[png|gif|jpg|jpeg]{1}\)/',$data->content,$imgArr);

		// 把第一张图片设置为文章的logo
		if(!$status) return $data;

		$logo_dir = $imgArr[0][0];
		$logo_dir = preg_replace('/!\[\]\(/', '', $logo_dir);
		$logo_dir = preg_replace('/\)/', '', $logo_dir);
		$data->setLogoDir($logo_dir);

		if(Cache::has('uploadImg'))
		{
			$uploadImg = Cache::get('uploadImg');
			$savePath = \Config::get('sys.sys_upload_path'). '/' . date('Y', time()) . date('m', time()) . date('d', time());

			foreach ($uploadImg as $key => $value) {
				$value = '![]('.$value.')';
				if(!in_array($value, $imgArr[0]))
				{
					@unlink(dirname(dirname($savePath)).$value);
					// 判断文件夹是否为空
					if( $this->is_empty_dir(dirname($savePath)) )
					{
						@unlink(dirname($savePath));
					}
				}
			}

			Cache::forget('uploadImg');
		}

		return $data;
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

		// 对内容进行处理
		$data = $this->dealData($data);

		$sqlData = $this->articleModel->addArticle($data->toArray());
		if($sqlData != false) {
			$resultArr = array('error'=>false, 'data'=>$sqlData);
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

		// 对内容进行处理
		$data = $this->dealData($data);

		$id = intval($data->id);
		unset($data->id);

		if($this->articleModel->editArticle($data->toArray(), $id) != false) {
			$resultArr = array('error'=>false, 'msg'=>'编辑成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'编辑失败');
		}
		return $resultArr;
	}

	/**
	* 获取已公布的文章列表
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
	* 根据专题id获取文章列表
	*
	* @param array $data;
	* @access public
	* @return array
	*/
	public function getArtsByCid($data)
	{
		$way = isset($data['way']) ? $data['way'] : 'addtime'; 
		$articleInfo = $this->articleModel->getArtsByCid($data['cid'],$way);
		if($articleInfo) {
			return array('error'=>false,'data'=>$articleInfo);
		} else {
			return array('error'=>false,'data'=>array());
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
			$this->articleModel->incrementById('view', $id);
			return array('error'=>false,'data'=>$articleInfo);
		} else {
			return array('error'=>true,'msg'=>'获取文章失败');
		}
	}


}

?>