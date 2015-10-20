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
    public function www() {
        Route::group(['domain' =>  $this->wwwDomain], function() {
            // 主页
            Route::get('/', 'Home\HomeController@index');

            // 邮件
            Route::get('/email', 'Email\EmailController@index');

            $this->user();

            $this->article();

            $this->cloumn();

            //标签页面
            Route::get('/t/{name}', 'Home\TagController@index');
            // 获取标签页面信息
            Route::post('/t/info', 'Home\TagController@getTagByName');

            
            Route::group(['middleware' =>  'auth'], function() {

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

    /**
     * 前端文章路由
     * 
     *
     * @access public
     */
    public function article() {


        Route::group(['prefix' => 'article/{id}'], function() {
            //文章详情页面
            Route::get('/', 'Home\ArticleController@index');
            //获取单个文章数据
            Route::get('info', 'Home\ArticleController@getArticleById')->where('id', '[0-9]+');
            //根据文章ID取得评论的内容
            Route::get('/comments', 'Home\CommentController@getCommentsByAid');
            //添加评论
            Route::post('/comment', 'Home\CommentController@dealComment');
            //删除评论
            Route::delete('/comment', 'Home\CommentController@dealComment');
        });

        Route::group(['middleware' =>  'auth'], function() {
            // 添加文章页面
            Route::get('/article/add', 'Home\ArticleController@editPage');

            //添加文章
            Route::post('/article/add', 'Home\ArticleController@dealArticle');

            Route::group(['prefix' => 'article/{id}'], function() {
                // 编辑文章页面
                Route::get('edit', 'Home\ArticleController@editPage');
                // 更新文章
                Route::put('/', 'Home\ArticleController@dealArticle');
                // 删除文章
                Route::delete('/', 'Home\ArticleController@dealArticle');

                //添加推荐
                Route::post('praise', 'Home\ArticleController@dealPraiseOrStore');
                //取消推荐
                Route::delete('praise', 'Home\ArticleController@dealPraiseOrStore');

                //添加收藏
                Route::post('store', 'Home\ArticleController@dealPraiseOrStore');
                //取消收藏
                Route::delete('store', 'Home\ArticleController@dealPraiseOrStore');
            });

            Route::group(['prefix' => 'articles'], function() {
                // 用户的文章
                Route::get('user/{id}', 'Home\ArticleController@getArticles');
                //用户收藏和推荐的文章
                Route::get('user/{id}/{type}', 'Home\ArticleController@getArtsByPraiseOrStore');
            });
        });

        Route::group(['prefix' => 'articles'], function() {
            // 获取已公布的文章列表
            Route::get('/', 'Home\ArticleController@getAllArticle');
            // 根据专题id获取文章列表
            Route::get('/cloumn/{cid}', 'Home\ArticleController@getArtsByCid');
            // 获取用户关注专题的文章列表
            Route::get('/care/cloumns', 'Home\ArticleController@getArtsByCare');
            //标签名称的文章列表
            Route::get('/tag/{name}', 'Home\ArticleController@getArtsLikeTagName');
        });

        return $this;
    }

    /**
     * 前端专题路由
     * 
     *
     * @access public
     */
    public function cloumn() {

        Route::group(['prefix' => 'cloumn/{id}'], function() {
            // 专题详情页
            Route::get('/', 'Home\CloumnController@index')->where('id', '[0-9]+');
            // 获取单个专题的信息
            Route::get('/info', 'Home\CloumnController@getCloumnById');
        });

        Route::group(['prefix' => 'cloumns'], function() {
            // 专题列表页
            Route::get('/', 'Home\CloumnController@index');
            // 专题列表
            Route::get('/info', 'Home\CloumnController@getAllCloumns');
        });

        Route::group(['middleware' =>  'auth'], function() {

            Route::group(['prefix' => 'cloumn'], function() {
                //编辑专题页面
                Route::get('/add', 'Home\CloumnController@index');
                //创建专题
                Route::post('/add', 'Home\CloumnController@dealCloumn');
                // 上传头像
                Route::post('/logo', 'Home\CloumnController@updateLogo');
            });
            

            Route::group(['prefix' => 'cloumn/{id}'], function() {
                //编辑专题页面
                Route::get('/edit', 'Home\CloumnController@index');
                //编辑专题
                Route::put('/', 'Home\CloumnController@dealCloumn');
                // 删除专题
                Route::delete('/', 'Home\CloumnController@dealCloumn');
                // 添加关注
                Route::post('/care', 'Home\CloumnController@dealCare');
                // 取消关注
                Route::delete('/care', 'Home\CloumnController@dealCare');
            });

            Route::group(['prefix' => 'cloumns'], function() {
                // 根据用户获取专题
                Route::get('/user/{uid}', 'Home\CloumnController@getCloumnsByUid');
                // 获取用户关注的专题
                Route::get('/care/user/{uid}', 'Home\CloumnController@getCareCloumnsByUid');
            });
            
        });
    }

    /**
     * 前端用户路由
     * 
     *
     * @access public
     */
    public function user() {
            // 登录页
            Route::get('/login/{way}', 'Home\UserController@login');
            // 登录处理
            Route::post('/sign_in', 'Home\UserController@getProc');
            // 注册处理
            Route::post('/sign_up', 'Home\UserController@dealUser');
            // 退出
            Route::get('/sign_out', 'Home\UserController@getOut');


            // 个人首页
            Route::get('/user/{id}', 'Home\UserController@index')->where('id', '[0-9]+');
            // 根据id获取用户信息 
            Route::get('/user/{id}/info', 'Home\UserController@getUserInfoById')->where('id', '[0-9]+'); 
            // 获取登录用户的信息
            Route::get('/user/me', 'Home\UserController@getUserInfoByLogin');
            //检查用户名是否存在
            Route::post('/user/name/check', 'Home\UserController@checkUserName');

            Route::group(['middleware' =>  'auth'], function() {

                Route::group(['prefix' => 'user/{id}'], function() {
                    // 编辑用户信息
                    Route::put('/', 'Home\UserController@dealUser');
                    // 修改密码 
                    Route::put('/password', 'Home\UserController@modifyPassword'); 
                    //设置
                    Route::get('/settings', 'Home\UserController@index');
                    // 上传头像
                    Route::post('/logo', 'Home\UserController@updateLogo');
                    // 收藏页面
                    Route::get('/store', 'Home\UserController@index');

                });

            });
    }
}
