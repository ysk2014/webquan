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

	}

	/**
	 * article
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home.app');
	}
	public function getAllArt() {
		
	}
}
