<?php namespace App\Http\Middleware;

use Closure;
use App\Services\SC;
use App\Services\User\Login\Process as LoginProcess;
use Request;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $isLogin = (new LoginProcess())->getProcess()->hasLogin();
        if(empty($isLogin)) {
            if (Request::method() == 'GET') {
                return redirect('/');
            } else {
                return response()->json(['rc'=>1000,'msg'=>'用户没有登录']);
            }
        }
        return $next($request);
    }

}
