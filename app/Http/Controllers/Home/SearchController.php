<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Search\Process as SearchProcess;
use Request;

class SearchController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{

	}

	public function getSearch() {
		$search = Request::input('search');
		$type = Request::input('type');
		
		if ($type==0) {
			$articles = $this->widget->articles();
		} else if ($type==1) {

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
