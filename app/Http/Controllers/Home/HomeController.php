<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Article\Process as ArticleProcess;
use App\Widget\Home\Common as WidgetCommon;
use App\Services\Home\Search\Process as SearchProcess;
use Request;

class HomeController extends Controller {

	protected $widget;

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
		$this->widget = new WidgetCommon();
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index(ArticleProcess $articleProcess)
	{	
		$articleList = $articleProcess->getAllArticle(array('way'=>'addtime','page'=>0));
		return view('home/article/index', ['title' => 'Web圈','articleList'=>$articleList]);
	}


	public function getSearch() {
		$data['search'] = Request::input('search');
		$data['type'] = Request::input('type');
		$data['page'] = 0;

		if ($data['type']==0) {
			$result = (new SearchProcess())->getArticles($data);
			$articles = view('home.widget.articles',array('articles'=>$result,'page'=>0));
			return response()->view('home/other/search', compact('articles'));
		} else if ($data['type']==1) {
			$result = $searchProcess->getCloumns($data);
		}
	}


	/**
	 * 文章搜索
	 *
	 * @return Response
	 */
	public function getArticles(SearchProcess $searchProcess)
	{
		$data = Request::input('data');

		$result = $searchProcess->getArticles($data);
		
		return response()->json($result);
	}

	/**
	 * 专题搜索
	 *
	 * @return Response
	 */
	public function getCloumns(SearchProcess $searchProcess)
	{
		$data = Request::input('data');
		$result = $searchProcess->getCloumns($data);
		return response()->json($result);
	}

}
