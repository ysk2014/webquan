<?php
namespace App\Services\Home\Article;

use App\Models\Home\Article as ArticleModel;
use App\Models\Home\Notes as NoteModel;
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
    private $noteModel;

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
        if( ! $this->noteModel) $this->noteModel = new NoteModel();
        if( ! $this->articleValidate) $this->articleValidate = new ArticleValidate();
        if( !$this->cloumnModel) $this->cloumnModel = new CloumnModel();
        if( !$this->careModel) $this->careModel = new UCCModel();
        if( !$this->userArticleModel) $this->userArticleModel = new UserArticleModel();
        if( !$this->redis) $this->redis = Redis::connection();
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
				foreach ($articleData as $key => $value) {
					if (!empty($value['tags'])) {
						$articleData[$key]['tags'] = explode(',', $value['tags']);
					}
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
			foreach ($articleData as $key => $value) {
				if (!empty($value['tags'])) {
					$articleData[$key]['tags'] = explode(',', $value['tags']);
				}
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
		
		$ids = $this->userArticleModel->getIds($id,$uid);
		if($ids) {
			foreach ($ids as $key => $value) {
				if($value['type']==0) {
					$articleInfo['praise_id'] = $value['id'];
				} else if($value['type']==1) {
					$articleInfo['store_id'] = $value['id'];
				}
			}	
		}
		
		$articleInfo['tags'] = explode(',', $articleInfo['tags']);
		
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
			foreach ($articleData as $key => $value) {
				if (!empty($value['tags'])) {
					$articleData[$key]['tags'] = explode(',', $value['tags']);
				}
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
	* 处理文章推荐或收藏
	*
	* @param object $data;
	* @param string $method;
	* @access public
	* @return boolean true|false
	*/
	public function addPraiseOrStore($data)
	{
		$resultArr = [];

		if($data['type']==0) {
			$status ='praise';
			$msg ='推荐';
		} else {
			$status ='store';
			$msg ='收藏';
		}

		$data['uid'] = SC::getLoginSession()['id'];

		$sqlData = $this->userArticleModel->add($data);

		if($sqlData != false) {

			$this->articleModel->incrementById($status,$data['aid']);

			$this->redis->hincrby('article_'.$data['aid'],$status,1);
			$this->redis->hset('article_'.$data['aid'],$status.'_id',$sqlData);

			$resultArr = array('error'=>false, 'msg'=>$msg.'成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>$msg.'失败');
		}
		return $resultArr;
	}

	/**
	* 删除文章推荐或收藏
	*
	* @param object $data;
	* @param string $method;
	* @access public
	* @return boolean true|false
	*/
	public function delPraiseOrStore($data)
	{
		$resultArr = [];

		if($data['type']==0) {
			$status ='praise';
		} else {
			$status ='store';
		}

		$sqlData = $this->userArticleModel->del([$data['id']]);

		if($sqlData != false) {
			$this->articleModel->decrementById($status,$data['aid']);
			$this->redis->hincrby('article_'.$data['aid'],$status,-1);
			$this->redis->hset('article_'.$data['aid'],$status.'_id',0);

			$resultArr = array('error'=>false, 'msg'=>'取消成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'取消失败');
		}
		return $resultArr;
	}

}

?>