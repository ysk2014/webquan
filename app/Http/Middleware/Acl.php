<?php namespace App\Http\Middleware;

use Closure;
use App\Services\SC;
use App\Services\Login\Process as LoginProcess;
/**
 * 用户权限验证
 *
 * @author ysk
 */
class Acl
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
        $isPermission = (new LoginProcess())->getProcess()->hasPermission();
        if($isPermission) {
            return redirect('/admin/user/login');
        }
        return $next($request);
    }

}
