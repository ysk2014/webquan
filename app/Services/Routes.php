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
            // Route::get('/login', 'Admin\UserController@index');
            
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
            Route::get('/', 'Home\ArticleController@index');
            // 上传图片
            Route::post('/upload', 'Home\UploadController@upload');

            // 邮件
            Route::get('/email', 'Email\EmailController@index');
            //忘记密码的邮件验证码
            Route::post('/email/verifyCode', 'Email\EmailController@checkVerifyCode');

            $this->user();

            $this->article();

            $this->cloumn();

            //标签页面
            Route::get('/t/{name}', 'Home\TagController@index');
            // 获取标签页面信息
            Route::post('/t/info', 'Home\TagController@getTagByName');

            
            //查询bug
            Route::get('/bug/list', 'Home\BugController@getAllBugs');
            //添加bug
            Route::post('/bug', 'Home\BugController@addBug');


            Route::group(['middleware' =>  'auth'], function() {

                // 远程图片下载
                Route::post('/download_image', 'Home\UploadController@downloadImage');

                // 标签
                Route::post('/tags/like', 'Home\TagController@getTagsLikeName');
                //创建标签
                Route::post('/tags/add', 'Home\TagController@addTag');


                //bug页面
                Route::get('/bug', 'Home\BugController@index');

                //search页面
                Route::get('/search', 'Home\HomeController@getSearch');

            });

            //第三方登录
            Route::get('auth/qq', 'Auth\AuthController@qq');
            Route::get('auth/qq/callback', 'Auth\AuthController@qqCallback');

            Route::get('auth/weibo', 'Auth\AuthController@weibo');
            Route::get('auth/weibo/callback', 'Auth\AuthController@weiboCallback');

            Route::get('auth/weixin', 'Auth\AuthController@weixin');
            Route::get('auth/weixin/callback', 'Auth\AuthController@weixinCallback');

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
        //文章列表
        Route::get('/articles/{page}', 'Home\ArticleController@pagination')->where('page', '[0-9]+');
        // 单个文章页面
        Route::get('/article/{id}', 'Home\ArticleController@info')->where('id', '[0-9]+');
        // 更多评论
        Route::post('/article/{id}/comment/page/{page}', 'Home\CommentController@pagination')->where('id', '[0-9]+');
        

        Route::group(['middleware' =>  'auth'], function() {
            //添加文章页面
            Route::get('/note/add', 'Home\ArticleController@editPage');

            //添加文章
            Route::post('/note/add', 'Home\ArticleController@dealArticle');
            //编辑文章页面
            Route::get('/note/{id}/edit', 'Home\ArticleController@editPage')->where('id', '[0-9]+');
            //删除文章
            Route::delete('/article/{id}', 'Home\ArticleController@delArticle')->where('id', '[0-9]+');

            //编辑文章
            Route::post('/note/{id}/edit', 'Home\ArticleController@dealArticle')->where('id', '[0-9]+');
            //删除文集
            Route::delete('/note/{id}', 'Home\ArticleController@delNote')->where('id', '[0-9]+');
            
            //添加评论
            Route::post('/article/{id}/comment', 'Home\CommentController@dealComment')->where('id', '[0-9]+');
            // 删除评论
            Route::delete('/article/{aid}/comment', 'Home\CommentController@dealComment')->where('aid', '[0-9]+');

            //添加推荐
            Route::post('/article/{id}/praise', 'Home\ArticleController@addPraiseOrStore')->where('id', '[0-9]+');
            //取消推荐
            Route::post('/praise/{id}', 'Home\ArticleController@delPraiseOrStore')->where('id', '[0-9]+');

            //添加收藏
            Route::post('/article/{id}/store', 'Home\ArticleController@addPraiseOrStore')->where('id', '[0-9]+');
            //取消收藏
            Route::post('/store/{id}', 'Home\ArticleController@delPraiseOrStore');

            // 获取已发布的文章列表
            Route::post('/articles/user/pub', 'Home\ArticleController@getPubArtsByUid');
            // 获取草稿箱的文章列表
            Route::post('/articles/user/draft', 'Home\ArticleController@getDraftsByUid');

            // 根据nid更新已发布文章
            Route::post('/note/update/article', 'Home\ArticleController@upadteArtByNid');
        });
    }

    /**
     * 前端专题路由
     * 
     *
     * @access public
     */
    public function cloumn() {
        
        Route::get('/cloumn/{id}', 'Home\CloumnController@index')->where('id', '[0-9]+');

        Route::group(['middleware' =>  'auth'], function() {
            Route::get('/cloumn/add', 'Home\CloumnController@editPage');
            Route::post('/cloumn/add', 'Home\CloumnController@dealCloumn');

            Route::get('/cloumn/{cid}/edit', 'Home\CloumnController@editPage');
            Route::post('/cloumn/{cid}/edit', 'Home\CloumnController@dealCloumn');

            Route::get('/cloumn/{id}/edit', 'Home\CloumnController@editPage')->where('id', '[0-9]+');
            Route::post('/cloumn/{id}/edit', 'Home\CloumnController@dealCloumn')->where('id', '[0-9]+');

            Route::post('/cloumn/check/name', 'Home\CloumnController@checkName');

            Route::post('/cloumns/list', 'Home\CloumnController@getCloumnsByUid');

            Route::delete('/cloumn/{cid}', 'Home\CloumnController@delCloumn');
        });

    }

    /**
     * 前端用户路由
     * 
     *
     * @access public
     */
    public function user() {
            // 登录处理
            Route::post('/sign_in', 'Home\UserController@getProc');
            // 注册处理
            Route::post('/sign_up', 'Home\UserController@dealUser');
            // 退出
            Route::get('/sign_out', 'Home\UserController@getOut');
            // 密码重置页
            Route::get('/page/forget', 'Home\UserController@forget');
            // 密码重置
            Route::post('/password/reset', 'Home\UserController@resetPassword');

            // 第三方帐号绑定新用户
            Route::post('/user/auth/new', 'Auth\AuthController@addUser');
            // 第三方帐号绑定老用户
            Route::post('/user/auth/old', 'Auth\AuthController@bindUser');



            // 个人首页
            Route::get('/user/{id}', 'Home\UserController@index')->where('id', '[0-9]+');
            // 根据id获取用户信息 
            Route::get('/user/{id}/info', 'Home\UserController@getUserInfoById')->where('id', '[0-9]+'); 
            // 获取登录用户的信息
            Route::get('/user/me', 'Home\UserController@getUserInfoByLogin');
            //检查用户名是否存在
            Route::post('/user/name/check', 'Home\UserController@checkUserName');
            
            // 未读消息数量
            Route::post('/user/news/count', 'Home\UserController@getNewsCountByStatus');
            //标记已读
            Route::post('/user/news', 'Home\UserController@updateNews');

            Route::group(['middleware' =>  'auth'], function() {

                Route::group(['prefix' => 'user/{id}'], function() {
                    // 编辑用户信息
                    Route::put('/', 'Home\UserController@dealUser');
                    // 修改密码 
                    Route::put('/password', 'Home\UserController@modifyPassword'); 
                    //设置
                    Route::get('/settings', 'Home\UserController@settings');
                    // 上传头像
                    Route::post('/logo', 'Home\UserController@updateLogo');
                    //消息列表
                    Route::get('/news', 'Home\UserController@getNews')->where('id', '[0-9]+');
                });

            });
    }
}
