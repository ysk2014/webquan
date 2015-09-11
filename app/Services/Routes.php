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
            Route::get('/', 'Home\HomeController@index');

            Route::get('/login', 'Home\UserController@login');
            Route::post('/sign_in', 'Home\UserController@getProc');
            Route::post('/sign_up', 'Home\UserController@addUser');
            Route::get('/sign_out', 'Home\UserController@getOut');

            Route::get('/user', 'Home\UserController@index'); 
            Route::post('/user/info', 'Home\UserController@getUserInfoById'); 

            Route::post('/getUserInfoByLogin', 'Home\UserController@getUserInfoByLogin');

            Route::get('/article', 'Home\ArticleController@index');
            Route::post('/article/list', 'Home\ArticleController@getAllArticle');
            Route::post('/article/{id}', 'Home\ArticleController@getArticleById');
            
            Route::group(['middleware' =>  'auth'], function() {
                Route::post('/user/edit', 'Home\UserController@editUser'); 
                Route::post('/user/modifyPassword', 'Home\UserController@modifyPassword'); 

                Route::post('/article/edit', 'Home\ArticleController@editArticle');
                Route::post('/article/add', 'Home\ArticleController@addArticle');
                Route::post('/article/del', 'Home\ArticleController@delArticle');
            });
        });
        return $this;
    }

}
