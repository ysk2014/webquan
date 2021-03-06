<?php namespace App\Http\Controllers\Auth;

use Illuminate\Routing\Controller as BaseController;
use App\Services\User\Auth\Process as AuthProcss;
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


    public function addUser(AuthProcss $manager)
    {
        $data['username'] = Request::input('username');
        $data['password'] = Request::input('password');
        $data['auth'] = Request::input('auth');
        $result = $manager->addUser($data);
        return response()->json($result);
    }

    public function bindUser(AuthProcss $manager)
    {
        $data['username'] = Request::input('username');
        $data['password'] = Request::input('password');
        $data['auth'] = Request::input('auth');
        $result = $manager->bindUser($data);
        return response()->json($result);
    }

	public function qq() {
        return \Socialite::with('qq')->redirect();
    }


    public function qqCallback(AuthProcss $manager) {
        $oauthUser = \Socialite::with('qq')->user();

        // var_dump($oauthUser->getId());
        // var_dump($oauthUser->getNickname());
        // var_dump($oauthUser->getName());
        // var_dump($oauthUser->getEmail());
        // var_dump($oauthUser->getAvatar());

        $data = [
            'openid'=>$oauthUser->getId(),
            'nick'=>$oauthUser->getNickname(),
            'avatar'=>$oauthUser->getAvatar(),
            'type'=>'QQ'
        ];

        $result = $manager->checkUser($data);
        
        if ($result['rc']==0) {
            return redirect('/');
        } else {
            return view('home.user.auth',array('authData'=>$data));
        }
    }

    public function weibo() {
        return \Socialite::with('weibo')->redirect();
    }

    public function weiboCallback(AuthProcss $manager) {
        $oauthUser = \Socialite::with('weibo')->user();

        $data = [
            'openid'=>$oauthUser->getId(),
            'nick'=>$oauthUser->getNickname(),
            'avatar'=>$oauthUser->getAvatar(),
            'type'=>'weibo'
        ];

        $result = $manager->checkUser($data);
        
        if ($result['rc']==0) {
            return redirect('/');
        } else {
            return view('home.user.auth',array('authData'=>$data));
        }
    }

    public function weixin() {
        return redirect('/');
        // return \Socialite::with('weixin')->redirect();
    }

    public function weixinCallback(AuthProcss $manager) {
        $oauthUser = \Socialite::with('weibo')->user();

        $data = [
            'openid'=>$oauthUser->getId(),
            'nick'=>$oauthUser->getNickname(),
            'avatar'=>$oauthUser->getAvatar(),
            'type'=>'weibo'
        ];

        $result = $manager->checkUser($data);
        
        if ($result['rc']==0) {
            return redirect('/');
        } else {
            return view('home.user.auth',array('authData'=>$data));
        }
    }


}
