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

            // 邮件
            Route::get('/email', 'Email\EmailController@index');

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
            Route::get('/article/{id}', 'Home\ArticleController@index');
            // 获取已公布的文章列表
            Route::post('/article/list', 'Home\ArticleController@getAllArticle');
            // 根据专题id获取文章列表
            Route::post('/cloumn/article/list', 'Home\ArticleController@getArtsByCid');
            // 获取用户关注专题的文章列表
            Route::post('/cloumn/care/article', 'Home\ArticleController@getArtsByCare');
            // 获取单个文章信息
            Route::post('/article/{id}', 'Home\ArticleController@getArticleById')->where('id', '[0-9]+');


            //根据文章ID取得评论的内容
            Route::post('/article/comments', 'Home\CommentController@getContentByAid');
            //添加评论
            Route::post('/article/comments/add', 'Home\CommentController@addComment');
            //删除评论
            Route::delete('/article/comments', 'Home\CommentController@delContent');


            // 专题列表页
            Route::get('/cloumns', 'Home\CloumnController@cloumnListPage');
            // 专题详情页
            Route::get('/cloumn/{id}', 'Home\CloumnController@cloumnPage')->where('id', '[0-9]+');
            // 专题列表
            Route::post('/cloumn/list', 'Home\CloumnController@getAllCloumns');
            // 获取单个专题的信息
            Route::post('/cloumn/info', 'Home\CloumnController@getCloumnById');

            
            Route::group(['middleware' =>  'auth'], function() {
                // 编辑用户信息
                Route::post('/user/edit', 'Home\UserController@editUser');
                // 修改密码 
                Route::post('/user/modifyPassword', 'Home\UserController@modifyPassword'); 
                //设置
                Route::get('/settings', 'Home\UserController@settings');
                //检查用户名是否存在
                Route::post('/user/checkUserName', 'Home\UserController@checkUserName');
                // 上传头像
                Route::post('/user/updateLogo', 'Home\UserController@updateLogo');


                // 编辑文章
                Route::post('/article/edit', 'Home\ArticleController@editArticle');
                // 编辑文章页
                Route::get('/article/add', 'Home\ArticleController@editPage');
                // 编辑文章页
                Route::get('/article/edit/{id}', 'Home\ArticleController@editPage');
                // 添加文章
                Route::post('/article/add', 'Home\ArticleController@addArticle');
                // 删除文章
                Route::post('/article/del', 'Home\ArticleController@delArticle');
                //添加推荐
                Route::post('/article/addPraise', 'Home\ArticleController@addPraise');
                //取消推荐
                Route::post('/article/delPraise', 'Home\ArticleController@delPraise');
                
                

                //编辑专题页面
                Route::get('/cloumn/add', 'Home\CloumnController@index');
                Route::get('/cloumn/edit/{id}', 'Home\CloumnController@index');
                //编辑专题
                Route::post('/cloumn/edit', 'Home\CloumnController@editCloumn');
                // 根据用户获取专题
                Route::post('/cloumn/myCloumn', 'Home\CloumnController@getCloumnsByUid');
                // 获取用户关注的专题
                Route::post('/cloumn/myCare', 'Home\CloumnController@getCareCloumnsByUid');
                //创建专题
                Route::post('/cloumn/add', 'Home\CloumnController@addCloumn');
                // 删除专题
                Route::post('/cloumn/del', 'Home\CloumnController@delCloumn');
                // 上传头像
                Route::post('/cloumn/updateLogo', 'Home\CloumnController@updateLogo');
                // 添加关注
                Route::post('/cloumn/addCare', 'Home\CloumnController@addCare');
                // 取消关注
                Route::post('/cloumn/delCare', 'Home\CloumnController@delCare');


                //图片上传upload
                Route::post('/upload', 'Home\UploadController@upload');
                // 远程图片下载
                Route::post('/download_image', 'Home\UploadController@downloadImage');


                // 标签
                Route::post('/tags/all', 'Home\TagController@getTagsByName');
                //创建标签
                Route::post('/tags/add', 'Home\TagController@addTag');

            });
        });
        return $this;
    }

}
