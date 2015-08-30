<?php namespace App\Http\Controllers\Home;

class ArticleController extends Controller {

	public $navStatus;
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$this->navStatus = 'article';
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home/article/index',['navStatus'=>$this->navStatus]);
	}

	public function cloumn(){
		return view('home/article/cloumn',['navStatus'=>$this->navStatus]);
	}

}
