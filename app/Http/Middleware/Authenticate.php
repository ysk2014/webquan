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
            return redirect('/login/sign_in');
        }
        return $next($request);
    }

}
