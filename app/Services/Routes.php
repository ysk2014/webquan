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
            // 主页
            Route::get('/', 'Home\HomeController@index');

            // 登录页
            Route::get('/login/{way}', 'Home\UserController@login');
            // 登录处理
            Route::post('/sign_in', 'Home\UserController@getProc');
            // 注册处理
            Route::post('/sign_up', 'Home\UserController@addUser');
            // 退出
            Route::get('/sign_out', 'Home\UserController@getOut');


            // 个人首页
            Route::get('/user', 'Home\UserController@index');
            // 根据id获取用户信息 
            Route::post('/user/info', 'Home\UserController@getUserInfoById'); 
            // 获取登录用户的信息
            Route::post('/user/me', 'Home\UserController@getUserInfoByLogin');


            // 文章页
            Route::get('/article', 'Home\ArticleController@index');
            // 获取已公布的文章列表
            Route::post('/article/list', 'Home\ArticleController@getAllArticle');
            // 根据专题id获取文章列表
            Route::post('/cloumn/article/list', 'Home\ArticleController@getArtsByCid');
            // 获取单个文章信息
            Route::post('/article/{id}', 'Home\ArticleController@getArticleById');


            // 专题列表页
            Route::get('/cloumns', 'Home\CloumnController@cloumnListPage');
            // 专题详情页
            Route::get('/cloumn/{id}', 'Home\CloumnController@cloumnPage');
            // 专题列表
            Route::post('/cloumn/list', 'Home\CloumnController@getAllCloumns');
            // 获取单个专题的信息
            Route::post('/cloumn/info', 'Home\CloumnController@getCloumnById');

            
            Route::group(['middleware' =>  'auth'], function() {
                // 编辑用户信息
                Route::post('/user/edit', 'Home\UserController@editUser');
                // 修改密码 
                Route::post('/user/modifyPassword', 'Home\UserController@modifyPassword'); 


                //根据笔记本id获取文章列表
                Route::post('/notebook/article/list', 'Home\ArticleController@getArtsByNid');
                // 编辑文章
                Route::post('/article/edit', 'Home\ArticleController@editArticle');
                // 编辑文章页
                Route::get('/article/edit', 'Home\ArticleController@editPage');
                // 添加文章
                Route::post('/article/add', 'Home\ArticleController@addArticle');
                // 删除文章
                Route::post('/article/del', 'Home\ArticleController@delArticle');
                

                //编辑专题页面
                Route::get('/cloumn/edit', 'Home\CloumnController@cloumnPage');
                //编辑专题
                Route::post('/cloumn/edit', 'Home\CloumnController@editCloumn');
                //创建专题
                Route::post('/cloumn/add', 'Home\CloumnController@addCloumn');
                // 删除专题
                Route::post('/cloumn/del', 'Home\CloumnController@delCloumn');

                //图片上传upload
                Route::post('/upload', 'Home\UploadController@upload');
                // 远程图片下载
                Route::post('/download_image', 'Home\UploadController@downloadImage');


                // 添加笔记本
                Route::post('/notebook/add', 'Home\NotebookController@addNotebook');
                // 编辑笔记本
                Route::post('/notebook/edit', 'Home\NotebookController@editNotebook');
                // 删除笔记本
                Route::post('/notebook/del', 'Home\NotebookController@delNotebook');
                // 获取笔记本列表
                Route::post('/notebook/list', 'Home\NotebookController@getNotebooksByUid');
            });
        });
        return $this;
    }

}
