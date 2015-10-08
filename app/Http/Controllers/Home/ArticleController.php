<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Article\Process as ArticleProcess;
use Request,Cache;

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
	public function index()
	{
		return view('home.app');
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
	 * 获取已公布的文章列表
	 *
	 * @return Response
	 */
	public function getAllArticle(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		$result = $articleProcess->getAllArticle($data);
		return response()->json($result);
	}

	/**
	 * 根据专题id获取文章列表
	 *
	 * @return Response
	 */
	public function getArtsByCid(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		$data = $articleProcess->getArtsByCid($data);
		return response()->json($data);
	}


	/**
	 * 模糊查询标签名称的文章列表
	 *
	 * @return Response
	 */
	public function getArtsLikeTagName(ArticleProcess $articleProcess)
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
	 * 添加文章
	 *
	 * @return Response
	 */
	public function addArticle(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		$data['addtime'] = time();
		$param = new \App\Services\Home\Article\ArticleSave();
		$param->setAttributes($data);

		$result = $articleProcess->addArticle($param);
		
		return response()->json($result);
	}

	/**
	 * 编辑文章
	 *
	 * @return Response
	 */
	public function editArticle(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		// $data['addtime'] = time();
		$param = new \App\Services\Home\Article\ArticleSave();
		$param->setAttributes($data);

		$result = $articleProcess->editArticle($param);
		
		return response()->json($result);
	}

	/**
	 * 删除文章
	 *
	 * @return Response
	 */
	public function delArticle(ArticleProcess $articleProcess)
	{
		$id = Request::input('id');
		$ids = [$id];
		$result = $articleProcess->delArticle($ids);
		
		return response()->json($result);
	}

	/**
	 * 添加推荐
	 *
	 * @return Response
	 */
	public function addPraise(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		$data['addtime'] = time();
		$result = $articleProcess->addPraise($data);
		
		return response()->json($result);
	}

	/**
	 * 取消推荐
	 *
	 * @return Response
	 */
	public function delPraise(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		$result = $articleProcess->delPraise($data);
		
		return response()->json($result);
	}

}
