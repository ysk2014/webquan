<?php namespace App\Http\Controllers\Home;

use App\Services\User\Login\Process as LoginProcess;
use App\Services\Home\Article\Process as ArticleProcess;


class HomeController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// $this->navStatus = 'home';
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

}
