<?php
namespace App\Services\Home\Article;

use App\Models\Home\Article as ArticleModel;
use App\Services\Home\Article\ArticleValidate;
use App\Models\Home\cloumn as CloumnModel;
use App\Models\Home\UserCareCloumn as UCCModel;
use App\Models\Home\UserArticle as UserArticleModel;
use App\Services\BaseProcess;
use App\Services\SC;
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
     * 专题数据模型
     * 
     * @var object
     */
    private $cloumnModel;

    /**
     * 关注专题数据模型
     * 
     * @var object
     */
    private $careModel;

    /**
     * 推荐文章数据模型
     * 
     * @var object
     */
    private $userArticleModel;

    /**
     * 初始化
     *
     * @access public
     */
	function __construct()
	{
        if( ! $this->articleModel) $this->articleModel = new ArticleModel();
        if( ! $this->articleValidate) $this->articleValidate = new ArticleValidate();
        if( !$this->cloumnModel) $this->cloumnModel = new CloumnModel();
        if( !$this->careModel) $this->careModel = new UCCModel();
        if( !$this->userArticleModel) $this->userArticleModel = new UserArticleModel();
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
		
		if(count($imgArr[0])) {
			$logo_dir = $imgArr[0][0];
			$logo_dir = preg_replace('/!\[\]\(/', '', $logo_dir);
			$logo_dir = preg_replace('/\)/', '', $logo_dir);
			$data->setLogoDir($logo_dir);
		}

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
			$this->cloumnModel->incrementData('count',$data['cid']);
			
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
		$page = isset($data['page']) ? $data['page'] : 0;
		$articleInfo = $this->articleModel->getAllArticle($data['way'],$page);

		if($articleInfo) {

			$count = $this->articleModel->countArticle();
			if( (intval($page)+1)*20 < $count ) {
				$next = true;
			} else {
				$next = false;
			}

			return array('error'=>false,'data'=>$articleInfo, 'next'=>$next);
		} else {
			return array('error'=>true,'msg'=>'没有更多的文章了');
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
		$page = isset($data['page']) ? $data['page'] : 0;
		$articleInfo = $this->articleModel->getArtsByCid($data['cid'],$way,$page);

		if($articleInfo) {

			$count = $this->articleModel->countArticleByCid($data['cid']);
			if( (intval($page)+1)*20 < $count ) {
				$next = true;
			} else {
				$next = false;
			}

			return array('error'=>false,'data'=>$articleInfo, 'next'=>$next);
		} else {
			return array('error'=>true,'msg'=>'没有更多的文章了');
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
		$this->articleModel->incrementById('view', $id);
		$articleInfo = $this->articleModel->getArtById($id);
		if($articleInfo) {
			$uid = SC::getLoginSession()['id'];
			//判断用户是否已推荐和收藏
			$articleInfo['praiseStatus'] = false;
			$articleInfo['storeStatus'] = false;
			$ids = $this->userArticleModel->getIds($id,$uid);
			if($ids) {
				foreach ($ids as $key => $value) {
					if($value['type']==0) {
						$articleInfo['praiseStatus'] = true;
					} else if($value['type']==1) {
						$articleInfo['storeStatus'] = true;
					}
				}	
			}

			return array('error'=>false,'data'=>$articleInfo);
		} else {
			return array('error'=>true,'msg'=>'获取文章失败');
		}
	}

	/**
	* 获取关注的专题的所有文章列表
	*
	* @param array $data;
	* @access public
	* @return array
	*/
	public function getArtOfCareByUid($data)
	{
		$cloumnIds = $this->careModel->getCidsByUid($data['uid']);
		if($cloumnIds) {
			$cids = [];
			foreach ($cloumnIds as $key => $value) {
				array_push($cids,$value['cid']);
			}
			$articleInfo = $this->articleModel->getArtsByCids($cids, $data['page']);

			$count = $this->articleModel->getArtsCountByCids($cids);
			if( (intval($data['page'])+1)*20 < $count ) {
				$next = true;
			} else {
				$next = false;
			}
			return array('error'=>false,'data'=>$articleInfo,'next'=>$next);
		} else {
			return array('error'=>true,'msg'=>'获取文章失败');
		}
	}

	/**
	* 模糊查询标签名称的文章列表
	*
	* @param array $data;
	* @access public
	* @return array
	*/
	public function getArtsLikeTagName($data)
	{
		$articleInfo = $this->articleModel->getArtsLikeTagName($data);
		if($articleInfo) {

			$count = $this->articleModel->getArtsCountLikeTagName($data['name']);
			if( (intval($data['page'])+1)*20 < $count ) {
				$next = true;
			} else {
				$next = false;
			}
			return array('error'=>false,'data'=>$articleInfo,'next'=>$next);
		} else {
			return array('error'=>true,'msg'=>'获取文章失败');
		}
	}


	/**
	* 添加推荐
	*
	* @param object $data;
	* @access public
	* @return boolean true|false
	*/
	public function addPraise($data)
	{
		$resultArr = [];

		$sqlData = $this->userArticleModel->add($data);
		if($sqlData != false) {
			$this->articleModel->incrementById('praise',$data['aid']);
			$resultArr = array('error'=>false, 'msg'=>'推荐成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'推荐失败');
		}
		return $resultArr;
	}

	/**
	* 取消推荐
	*
	* @param object $data;
	* @access public
	* @return boolean true|false
	*/
	public function delPraise($data)
	{
		$resultArr = [];

		$sqlData = $this->userArticleModel->del($data);
		if($sqlData != false) {
			$this->articleModel->decrementById('praise',$data['aid']);
			$resultArr = array('error'=>false, 'msg'=>'取消成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'取消失败');
		}
		return $resultArr;
	}

	/**
	* 添加收藏
	*
	* @param object $data;
	* @access public
	* @return boolean true|false
	*/
	public function addStore($data)
	{
		$resultArr = [];

		$sqlData = $this->userArticleModel->add($data);
		if($sqlData != false) {
			$this->articleModel->incrementById('store',$data['aid']);
			$resultArr = array('error'=>false, 'msg'=>'收藏成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'收藏失败');
		}
		return $resultArr;
	}

	/**
	* 取消推荐
	*
	* @param object $data;
	* @access public
	* @return boolean true|false
	*/
	public function delStore($data)
	{
		$resultArr = [];

		$sqlData = $this->userArticleModel->del($data);
		if($sqlData != false) {
			$this->articleModel->decrementById('store',$data['aid']);
			$resultArr = array('error'=>false, 'msg'=>'取消成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'取消失败');
		}
		return $resultArr;
	}

}

?>