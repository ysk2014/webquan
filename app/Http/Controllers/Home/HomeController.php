<?php namespace App\Http\Controllers\Home;

use App\Services\User\Login\Process as LoginProcess;

class HomeController extends Controller {

	public $navStatus;

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
	public function index()
	{	
		return view('home/app');
	}

}
