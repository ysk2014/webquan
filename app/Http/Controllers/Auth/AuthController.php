<?php namespace App\Http\Controllers\Auth;

use Illuminate\Routing\Controller as BaseController;
use Request;

class AuthController extends BaseController {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{

	}

	public function qq() {
        return \Socialite::with('qq')->redirect();
    }


    public function qqCallback() {
        $oauthUser = \Socialite::with('qq')->user();

        var_dump($oauthUser->getId());
        var_dump($oauthUser->getNickname());
        var_dump($oauthUser->getName());
        var_dump($oauthUser->getEmail());
        var_dump($oauthUser->getAvatar());
    }


}
