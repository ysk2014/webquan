<?php

namespace App\Widget\Home;

use App\Services\User\Login\Process as LoginProcess;
use App\Services\Home\Cloumn\Process as CloumnProcess;
use App\Services\Home\Article\Process as ArticleProcess;
use App\Services\Home\Comment\Process as CommentProcess;
use App\Services\Home\Tag\Process as TagProcess;
use App\Services\User\Process as UserProcess;

/**
 * 页面组件
 *
 * @author ysk
 */
class Common
{

    /**
     * footer
     */
    public function footer()
    {
        return view('home.widget.footer');
    }

    /**
     * header
     */
    public function header($title = 'web圈')
    {
        return view('home.widget.header', compact('title'));
    }

    /**
     * top
     */
    public function top($cid=0)
    {
        // 判断用户是否登录
        $isLogin = (new LoginProcess())->getProcess()->hasLogin();

        $login = $this->login($isLogin);

        if (!empty($isLogin)) {
            $data = ['uid'=>$isLogin['id'],'limit'=>6];
            $cloumns = (new CloumnProcess())->getCloumnsByUid($data);
            return view('home.widget.top', compact('login','cloumns','cid'));
        } else {
            return view('home.widget.top', compact('login','cid'));
        }
    }

    /**
     * login
     */
    public function login($isLogin)
    {
        
        if (empty($isLogin)) {
            $userinfo = false;
        } else {
            $userinfo = ['id'=>$isLogin['id'],'nick'=>$isLogin['name'],'userUrl'=>$isLogin['logo_dir']];
        }

        return view('home.widget.login', compact('userinfo'));
    }

    /**
     * aside
     */
    public function aside()
    {
        //获取热门文章数据
        $hotsArt = (new ArticleProcess())->getArtsByView(3);
        //获取所标签列表
        $tags = (new TagProcess())->getAllTags();

        $isLogin = (new LoginProcess())->getProcess()->hasLogin();
        if (empty($isLogin)) {
            $userinfo = false;
        } else {
            $userinfo = ['id'=>$isLogin['id'],'nick'=>$isLogin['name'],'userUrl'=>$isLogin['logo_dir']];
        }

        return view('home.widget.aside', compact('hotsArt', 'tags','userinfo'));
    }

    /**
     * artAside
     */
    public function artAside($author,$cloumn)
    {

        //获取热门文章数据
        $hotsArt = (new ArticleProcess())->getArtsByView(3);
        //获取所标签列表
        $tags = (new TagProcess())->getAllTags();
        
        $isLogin = (new LoginProcess())->getProcess()->hasLogin();
        if (empty($isLogin)) {
            $userinfo = false;
        } else {
            $userinfo = ['id'=>$isLogin['id'],'nick'=>$isLogin['name'],'userUrl'=>$isLogin['logo_dir']];
        }

        return view('home.widget.aside', compact('hotsArt', 'tags','author','cloumn','userinfo'));
        
    }

    /**
     * articles
     */
    public function articles($page=0,$way='addtime')
    {
        //文章数据列表
        $articles = (new ArticleProcess())->getAllArticle(array('way'=>$way,'page'=>$page));

        return view('home.widget.articles', compact('articles','page'));
    }

    /**
     * 专栏下的文章列表
     */
    public function articlesByCid($cid,$page=0,$way='addtime')
    {
        //文章数据列表
        $articles = (new ArticleProcess())->getArtsByCid(array('way'=>$way,'page'=>$page,'cid'=>$cid));

        return view('home.widget.articles', compact('articles','page'));
    }

    /**
     * 用户下的文章列表
     */
    public function articlesByUid($uid,$page=0,$way='addtime')
    {
        //文章数据列表
        $articles = (new ArticleProcess())->getArtsByUid(array('way'=>$way,'page'=>$page,'uid'=>$uid));

        return view('home.widget.articles', compact('articles','page'));
    }


    /**
     * 标签下的文章列表
     */
    public function articlesByTag($tag,$page=0)
    {
        //文章数据列表
        $articles = (new ArticleProcess())->getArtsLikeTagName(array('page'=>$page,'name'=>$tag));

        return view('home.widget.articles', compact('articles','page'));
    }

    /**
     * comments
     */
    public function comments($aid,$userinfo,$page=0)
    {
        $comments = (new CommentProcess())->getCommentsByAid($aid,$page);

        return view('home.widget.comments', compact('comments','userinfo','aid','page'));
    }

    /**
     * comment ajax
     */
    public function commentAjax($aid,$comment,$fid)
    {
        return view('home.widget.commentAjax', compact('aid','comment','fid'));
    }



}