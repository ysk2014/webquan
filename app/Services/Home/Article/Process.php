<?php
namespace App\Services\Home\Article;

use App\Models\Home\Article as ArticleModel;
use App\Models\Home\Drafts as DraftsModel;
use App\Services\Home\Article\ArticleValidate;
use App\Models\Home\Cloumn as CloumnModel;
use App\Models\Home\UserCareCloumn as UCCModel;
use App\Models\Home\UserArticle as UserArticleModel;
use App\Services\BaseProcess;
use App\Services\SC;
use Lang, Cache, Redis;


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
     * 草稿模型
     * 
     * @var object
     */
    private $draftsModel;

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
     * redis缓存链接
     * 
     * @var object
     */
    private $redis;

    /**
     * 初始化
     *
     * @access public
     */
	function __construct()
	{
        if( ! $this->articleModel) $this->articleModel = new ArticleModel();
        if( ! $this->draftsModel) $this->draftsModel = new DraftsModel();
        if( ! $this->articleValidate) $this->articleValidate = new ArticleValidate();
        if( !$this->cloumnModel) $this->cloumnModel = new CloumnModel();
        if( !$this->careModel) $this->careModel = new UCCModel();
        if( !$this->userArticleModel) $this->userArticleModel = new UserArticleModel();
        if( !$this->redis) $this->redis = Redis::connection();
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
	* 文章图片缓存
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function imgCache(\App\Services\Home\Article\ArticleSave $data){

		$content = $this->redis->hget('article_'.$data->id,'content');

		$status = preg_match_all('/src=\"\/upload_path\/.+[png|gif|jpg|jpeg]{1}\"/',$content,$imgArr);

		$cache = 'article_img_uid_'.$data->uid.'_'.date('Y', time()) . date('m', time()) . date('d', time());

		if($status) {
			foreach ($imgArr[0] as $key => $value) {
				$value = str_ireplace('src=\"','',$value);
				$value = str_ireplace('\"','',$value);
				$this->redis->lpush($cache,$value);
			}
		}

		return $data;
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
		$status = preg_match_all('/src=\"\/upload_path\/.+[png|gif|jpg|jpeg]{1}\"/',$data->content,$imgArr);

		// 把第一张图片设置为文章的logo
		if(!$status) return $data;
		
		if(count($imgArr[0])) {
			$logo_dir = $imgArr[0][0];
			$logo_dir = preg_replace('/src=\"/', '', $logo_dir);
			$logo_dir = preg_replace('/\"/', '', $logo_dir);
			$data->setLogoDir($logo_dir);
		}

		$cache = 'article_img_uid_'.$data->uid.'_'.date('Y', time()) . date('m', time()) . date('d', time());
		

		if($this->redis->exists($cache))
		{
			$uploadImg = $this->redis->lrange($cache,0,-1);
			$savePath = \Config::get('sys.sys_upload_path'). '/' . date('Y', time()) . date('m', time()) . date('d', time());

			foreach ($uploadImg as $key => $value) {
				$value1 = '![]('.$value.')';
				if(!in_array($value1, $imgArr[0]))
				{
					@unlink(dirname(dirname($savePath)).$value);

					// 判断文件夹是否为空
					if( $this->is_empty_dir(dirname($savePath)) )
					{
						@unlink(dirname($savePath));
					}
				}
			}
			$this->redis->del($cache);
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
		if ( !$this->articleValidate->add($data) ) 
			return array('error'=>true,'msg'=>$this->articleValidate->getErrorMessage());

		// 对内容进行处理
		$data = $this->dealData($data);

		//草稿箱处理
		if ($data->id) {
			$did = $data->id;
			unset($data->id);
			unset($data->aid);
		}

		$sqlData = $this->articleModel->addArticle($data->toArray());
		if ($sqlData != false) {

			// 删除草稿箱
			
			if (isset($did)) {
				$dids = [$did];
				$this->draftsModel->delDrafts($dids);
			}

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
			// 删除缓存
			foreach ($ids as $key => $id) {
				if ($this->redis->hlen('article_'.$id)>0) {
					$this->redis->del('article_'.$id);
				}
			};
			
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
	public function editArticle(\App\Services\Home\Article\ArticleSave $data,$did=0)
	{	

		$resultArr = [];
		if( !isset($data->id) ) return array('error'=>true,'msg'=>'没有文章id');

		// 进行文章表单验证
		if( !$this->articleValidate->edit($data)) return array('error'=>true, 'msg'=>$this->articleValidate->getErrorMessage());

		// 对内容图片进行缓存处理
		$data = $this->imgCache($data);

		// 对内容进行处理
		$data = $this->dealData($data);


		$id = intval($data->id);
		unset($data->id);

		if($this->articleModel->editArticle($data->toArray(), $id) != false) {
			// 删除redis缓存
			if ($this->redis->hlen('article_'.$id)>0) {
				$this->redis->del('article_'.$id);
			}

			//删除草稿箱
			if ($did>0) {
				$dids = [$did];
				$this->draftsModel->delDrafts($dids);
			}

			$resultArr = array('error'=>false, 'msg'=>'编辑成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'编辑失败');
		}
		return $resultArr;
	}



	/**
	* 获取已公布的文章列表
	*
	* @param array $data;
	* @access public
	* @return array
	*/
	public function getAllArticle($data)
	{
		$page = isset($data['page']) ? $data['page'] : 0;

		$count = $this->articleModel->countArticle();

		if ($count) {
			$articleInfo = $this->articleModel->getAllArticle($data['way'],$page);

			if ($articleInfo) {
			
				$articleData = array();
				foreach ($articleInfo as $key => $value) {
					unset($value['content']);
					array_push($articleData,$value);
				}

				if ($count > ($data['page']+1)*20) {
					$next = true;
				} else {
					$next = false;
				}

				return array('error'=>false,'data'=>$articleData, 'count'=>$count, 'next'=>$next,'page'=>$page);
			} else {
				return array('error'=>true,'msg'=>'没有更多的文章了');
			}
		} else {
			return array('error'=>true,'count'=>0);
		}
	}


	/**
	* 获取热门文章的前几个
	*
	* @access public
	* @return array
	*/
	public function getArtsByView($num)
	{
		$num = $num ? $num : 3;
		$hots = $this->articleModel->getArtsByView($num);
		if ($hots) {
			return array('error'=>false,'hotsArticle'=>$hots);
		} else {
			return array('error'=>true,'msg'=>'热门文章查询失败');
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

			$articleData = array();
			foreach ($articleInfo as $key => $value) {
				unset($value['content']);
				array_push($articleData,$value);
			}

			return array('error'=>false,'data'=>$articleData, 'next'=>$next);
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

		if ($this->redis->hlen('article_'.$id)>0) {

			$this->redis->hincrby('article_'.$id,'view',1);

			$articleInfo = $this->redis->hgetall('article_'.$id);

		} else {

			$articleInfo = $this->articleModel->getArtById($id);

			if($articleInfo) {
				//进行redis缓存
				$this->redis->hmset('article_'.$id,$articleInfo->toArray());
			} else {
				return array('error'=>true,'msg'=>'获取文章失败');
			}
		}
		
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

			$articleData = array();
			foreach ($articleInfo as $key => $value) {
				unset($value['content']);
				array_push($articleData,$value);
			}

			return array('error'=>false,'data'=>$articleData,'next'=>$next);
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

			$articleData = array();
			foreach ($articleInfo as $key => $value) {
				unset($value['content']);
				array_push($articleData,$value);
			}

			return array('error'=>false,'data'=>$articleData,'next'=>$next);
		} else {
			return array('error'=>true,'msg'=>'获取文章失败');
		}
	}


	/**
	* 获取用户创建的所有文章列表
	*
	* @param array $data;
	* @access public
	* @return array
	*/
	public function getArtsByUid($data)
	{
		$way = isset($data['way']) ? $data['way'] : 'addtime'; 
		$page = isset($data['page']) ? $data['page'] : 0;
		$is_publish = isset($data['is_publish']) ? $data['is_publish'] : 1;
		$articleInfo = $this->articleModel->getArtsByUid($data['uid'],$way,$page,$is_publish);
		if($articleInfo) {

			$count = $this->articleModel->getArtsCountByUid($data['uid']);
			if( (intval($data['page'])+1)*20 < $count ) {
				$next = true;
			} else {
				$next = false;
			}

			$articleData = array();
			foreach ($articleInfo as $key => $value) {
				unset($value['content']);
				array_push($articleData,$value);
			}

			return array('error'=>false,'data'=>$articleData,'next'=>$next);
		} else {
			return array('error'=>true,'msg'=>'获取文章失败');
		}
	}


	/**
	* 获取用户收藏或者推荐的所有文章列表
	*
	* @param array $data;
	* @access public
	* @return array
	*/
	public function getArtsByPraiseOrStore($data)
	{
		$type = isset($data['type']) ? $data['type'] : 0; 
		$page = isset($data['page']) ? $data['page'] : 0;
		$articleInfo = $this->userArticleModel->getArticlesByUid($data['uid'],$page,$type);
		if($articleInfo) {

			$count = $this->userArticleModel->getCountByType($data['uid'],$type);
			if( (intval($data['page'])+1)*20 < $count ) {
				$next = true;
			} else {
				$next = false;
			}

			$articleData = array();
			foreach ($articleInfo as $key => $value) {
				unset($value['content']);
				array_push($articleData,$value);
			}
			
			return array('error'=>false,'data'=>$articleData,'next'=>$next);
		} else {
			return array('error'=>true,'msg'=>'获取文章失败');
		}
	}



	/**
	* 处理文章推荐和收藏
	*
	* @param object $data;
	* @param string $method;
	* @access public
	* @return boolean true|false
	*/
	public function dealPraiseOrStore($data,$method)
	{
		$resultArr = [];

		if($data['type']==0) {
			$status ='praise';
			$msg ='推荐';
		} else {
			$status ='store';
			$msg ='收藏';
		}

		if($method=='POST') {
			$sqlData = $this->userArticleModel->add($data);
		} else if($method=='DELETE') {
			$sqlData = $this->userArticleModel->del($data);
			$msg='取消';
		}

		if($sqlData != false) {
			if($method=='POST') {

				$this->articleModel->incrementById($status,$data['aid']);

				$this->redis->hincrby('article_'.$data['aid'],$status,1);
				$this->redis->hset('article_'.$data['aid'],$status.'Status',true);
			} else {
				$this->articleModel->decrementById($status,$data['aid']);
				$this->redis->hincrby('article_'.$data['aid'],$status,-1);
				$this->redis->hset('article_'.$data['aid'],$status.'Status',false);
			}
			$resultArr = array('error'=>false, 'msg'=>$msg.'成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>$msg.'失败');
		}
		return $resultArr;
	}

}

?>