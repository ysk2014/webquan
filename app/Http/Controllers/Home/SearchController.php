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

	/**
	 * search
	 *
	 */
	public function index()
	{
		return view('home.app');
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
