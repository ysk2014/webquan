<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Article\Process as ArticleProcess;

class ArticleController extends Controller {

	public $navStatus;
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
	 * 获取文章列表
	 *
	 * @return Response
	 */
	public function getAllArticle(ArticleProcess $articleProcess)
	{
		$way = Request::input('way');
		$data = $articleProcess->getAllArticle($way);
		return response()->json($data);
	}

	/**
	 * 获取文章列表
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
	 * 编辑文章
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

}
