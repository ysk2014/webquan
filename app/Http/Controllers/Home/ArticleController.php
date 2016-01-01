<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Article\Process as ArticleProcess;
use App\Services\User\Login\Process as LoginProcess;
use App\Services\Home\Tag\Process as TagProcess;
use Request,Cache,Redis;

class ArticleController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{

	}

	/**
	 * article
	 *
	 */
	public function index(ArticleProcess $articleProcess)
	{	
		// 判断用户是否登录
		$isLogin = (new LoginProcess())->getProcess()->hasLogin();
		if (empty($isLogin)) {
			$userinfo = false;
		} else {
			$userinfo = ['id'=>$isLogin['id'],'nick'=>$isLogin['name'],'userUrl'=>$isLogin['logo_dir']];
		}
		//获取文章列表数据
		$articleList = $articleProcess->getAllArticle(array('way'=>'addtime','page'=>0));
		//获取热门文章数据
		$hotsArt = $articleProcess->getArtsByView(3);

		$title = 'Web圈';
		//获取所标签列表
		$tags = (new TagProcess())->getAllTags();

		//缓存
		$cacheSecond = config('home.cache_control');
        $time = date('D, d M Y H:i:s', time() + $cacheSecond) . ' GMT';

		return response()->view('home/article/index', compact('title','articleList','hotsArt','tags','userinfo'))->header('Cache-Control', 'max-age='.$cacheSecond)->header('Expires', $time);
	}


	/**
	 * article
	 *
	 */
	public function pagination(ArticleProcess $articleProcess,$page) {
		//获取文章列表数据
		$articleList = $articleProcess->getAllArticle(array('way'=>'addtime','page'=>$page));
		
		return response()->view('home/widget/articles',compact('articleList'));
	}

	/**
	 * edit article
	 *
	 */
	public function editPage()
	{
		return view('home.app');
	}


	/**
	 * 获取文章详情
	 *
	 * @return Response
	 */
	public function getArticleById($id)
	{
		$articleProcess = new ArticleProcess();

		$data = $articleProcess->getArticleById(intval($id));
		
		return response()->json($data);
	}

	/**
	 * 获取文章列表
	 *
	 * @return Response
	 */
	public function getArticles(ArticleProcess $articleProcess,$id=0){
		$data = Request::input('data');
		if(!isset($data['is_publish'])) {
			$data['is_publish'] = 1;
		}
		$data = $articleProcess->getArtsByUid($data);
		return response()->json($data);
	}

	/**
	 * 获取已公布的文章列表
	 *
	 * @return Response
	 */
	public function getAllArticle(ArticleProcess $articleProcess)
	{
		// $redis=Redis::connection();
		$data = Request::input('data');
		$result = $articleProcess->getAllArticle($data);
		return response()->json($result);
	}

	/**
	 * 根据专题id获取文章列表
	 *
	 * @return Response
	 */
	public function getArtsByCid(ArticleProcess $articleProcess,$cid)
	{
		$data = Request::input('data');
		$data = $articleProcess->getArtsByCid($data);
		return response()->json($data);
	}

	/**
	 * 根据用户id获取文章列表
	 *
	 * @return Response
	 */
	public function getArtsByUid(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		if(!isset($data['is_publish'])) {
			$data['is_publish'] = 1;
		}
		$data = $articleProcess->getArtsByUid($data);
		return response()->json($data);
	}


	/**
	 * 模糊查询标签名称的文章列表
	 *
	 * @return Response
	 */
	public function getArtsLikeTagName(ArticleProcess $articleProcess,$name)
	{
		$data = Request::input('data');
		$data = $articleProcess->getArtsLikeTagName($data);
		return response()->json($data);
	}

	/**
	 * 获取用户关注专题的文章列表
	 *
	 * @return Response
	 */
	public function getArtsByCare(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		$data = $articleProcess->getArtOfCareByUid($data);
		return response()->json($data);
	}

	/**
	 * 获取用户收藏或者推荐的文章列表
	 *
	 * @return Response
	 */
	public function getArtsByPraiseOrStore(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		$data = $articleProcess->getArtsByPraiseOrStore($data);
		return response()->json($data);
	}

	/**
	 * 处理文章, 添加、更新和删除操作
	 *
	 * @return Response
	 */
	public function dealArticle(ArticleProcess $articleProcess,$id=0)
	{
		$method = Request::method();
		
		if($method=='PUT') {                      //更新文章

			$data = Request::input('data');
			$data['update_time'] = time();

			if (isset($data['aid'])) {
				$did = $data['id'];
				$data['id'] = $data['aid'];
				unset($data['aid']);
			} else {
				$did = 0;
			}

			$param = new \App\Services\Home\Article\ArticleSave();
			$param->setAttributes($data); 

			$result = $articleProcess->editArticle($param,$did);

		}else if($method=='POST') {

			$data = Request::input('data');
			$data['addtime'] = time();
				
			$data['update_time'] = time();

			$param = new \App\Services\Home\Article\ArticleSave();
			$param->setAttributes($data); 

			$result = $articleProcess->addArticle($param);

		} else if($method== "DELETE") {            //删除文章
			$ids = [$id];
			$result = $articleProcess->delArticle($ids);
		} else {
			$result = array('error'=>true,'msg'=>'路由匹配失败');
		}
		
		return response()->json($result);
	}


	/**
	 * 处理文章推荐和收藏
	 *
	 * @return Response
	 */
	public function dealPraiseOrStore(ArticleProcess $articleProcess,$id=0)
	{
		$method = Request::method();

		$data = Request::input('data');

		if($method=='POST') {
			$data['addtime'] = time();
			$result = $articleProcess->dealPraiseOrStore($data,$method);
		} else if($method=='DELETE') {
			$result = $articleProcess->dealPraiseOrStore($data,$method);
		} else {
			$result = array('error'=>true,'msg'=>'路由匹配失败');
		}
		return response()->json($result);
	}

}
