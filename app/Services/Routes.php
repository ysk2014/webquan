<?php

namespace App\Services;

use Route;

/**
 * 系统路由
 * 
 * 注：大部分的路由及控制器所执行的动作来说，
 * 
 * 你需要返回完整的 Illuminate\Http\Response 实例或是一个视图
 *
 */
class Routes
{
    private $adminDomain;

    private $wwwDomain;

    /**
     * 初始化，取得配置
     *
     * @access public
     */
    public function __construct()
    {
        $this->adminDomain = config('sys.sys_admin_domain');
        $this->wwwDomain = config('sys.sys_blog_domain');
    }

    /**
     * 后台的通用路由
     * 
     *
     * @access public
     */
    public function admin()
    {
        Route::group(['domain' => $this->adminDomain], function()
        {
            Route::get('/admin/user/login', 'Admin\UserController@index');

            Route::group(['middleware' =>  ['auth','']], function(){

            });
        });
        return $this;
    }

    /**
     * 前端通用路由
     * 
     *
     * @access public
     */
    public function www()
    {
        Route::group(['domain' =>  $this->wwwDomain], function()
        {
            Route::get('/sign_in', 'Home\UserController@login');
            Route::get('/sign_up', 'Home\UserController@register');
            Route::post('/login', 'Home\UserController@getProc');
            Route::post('/register', 'Home\UserController@addUser');
            Route::get('/sign_out', 'Home\UserController@getOut');

            Route::get('/', 'Home\HomeController@index');
            Route::post('/home', 'Home\HomeController@home');

            Route::get('/cloumn/{id}', 'Home\CloumnController@showCloumn');
            
            Route::group(['middleware' =>  'auth'], function(){
                Route::get('/cloumn', 'Home\CloumnController@index'); 
                Route::get('/cloumn/new', 'Home\CloumnController@newIndex'); 
                Route::post('/cloumn/create', 'Home\CloumnController@addCloumn'); 

                Route::get('/article', 'Home\ArticleController@index'); 
                Route::get('/article/cloumn', 'Home\ArticleController@cloumn');  
            });
        });
        return $this;
    }

}
