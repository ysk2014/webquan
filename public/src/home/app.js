requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        jquery          : "jquery-1.11.3.min",
        jqueryextend    : "jquery.extend", 
        WQ              : "wq",
        react           : "react-with-addons.min",
        prettify        : 'editor/lib/prettify.min',
        codemirror      : 'editor/lib/codemirror/codemirror.min',
        marked          : 'editor/lib/marked.min',
        editormd        : 'editor/editormd',
        plugins         : 'editor/plugins',
        editorlib       : 'editor/lib',
        home            : "../build/home",
    },

    shim: {
        jqueryextend: {
            deps:[ 'jquery'],
            exports:'jqueryextend'
        }
    },
    waitSeconds: 30
});

requirejs([
        'react', 
        'jquery',
        'WQ',
        'home/router-mixin',
        'home/common/userDropMenu',
        'home/user/login',
        'home/user/user',
        'home/user/settings',
        'home/user/myPage',
        'home/article/articleList',
        'home/article/editArticle',
        'home/article/article',
        'home/cloumn/cloumnList',
        'home/cloumn/editCloumn',
        'home/cloumn/cloumn',
        'home/tag',
        'home/common/bug',
    ],function(React, $, WQ, RouterMixin, UserDropMenu, Login, User, Settings, MyPage, ArticleList, EditArticle, Article, CloumnList, EditCloumn, Cloumn, Tag, Bug){
        

    var App = React.createClass({
        mixins: [RouterMixin],
        routes: {
            '/'                : 'articleList',
            '/article/add'     : 'addArticle',
            '/article/:id/edit': 'editArticle',
            '/article/:id'     : 'article',


            '/cloumns'         : 'cloumnList',
            '/cloumn/add'      : 'addCloumn',
            '/cloumn/:id/edit' : 'editCloumn',
            '/cloumn/:id'      : 'cloumn',

            '/user/:id'         : 'user',
            '/user/:id/settings': 'settings',
            '/login/:way'       : 'login',
            '/user/:id/:type'   : 'store',

            '/t/:name': 'tag',
            '/bug' : 'bug',
        },
        articleList: function() {
            return <ArticleList />;
        },

        addArticle: function() {
            return <EditArticle />
        },

        editArticle: function(aid) {
            return <EditArticle aid={aid} />
        },

        article: function(aid) {
            return <Article aid={aid} />
        },

        cloumnList: function() {
            return <CloumnList />;
        },

        cloumn: function(cid) {
            return <Cloumn cid={cid} />
        },

        addCloumn: function() {
            var _this = this;
            var uid = WQ.cookie.get('id');
            if(!uid) {
                setTimeout(function() {
                    window.history.pushState({}, '', '/login/sign_in?page=cloumns');
                    _this.setState({
                        path: '/login/sign_in?page=cloumns'
                    });
                },0);
            }
            return <EditCloumn />
        },

        editCloumn: function(cid) {
            return <EditCloumn cid={cid} />
        },

        user: function(id) {
            return <User uid={id} />
        },

        settings: function(uid) {
            return <Settings uid={uid} />
        },

        store: function(uid,type) {
            return <MyPage uid={uid} type={type} />
        },

        login: function(way,params) {
            return <Login way={way} params={params} />
        },

        tag: function(name) {
            return <Tag name={name} />
        },

        bug: function() {
            return <Bug />
        },

        notFound: function(path) {
            return <div className="not-found">Page Not Found: {path}</div>;
        },

        render: function() {
            var _this = this;
            var page = this.renderCurrentRoute();
            var loginPattern = eval(/^\/login\/(?:([^\/]+?))\/?$/i);
            var matches = loginPattern.exec(_this.state.path);
            return (
                <div>
                    {
                        matches ? null : <UserDropMenu />
                    }

                    <div className="left-bar">
                        <div className="logo">
                            <a href="/"><img src="/image/logo1.png" /></a>
                        </div>
                        <ul className="left-nav">
                            <li className={(this.state.path == '/' || this.state.path != '/cloumns' && this.state.path != '/bug') ? "active" : null}>
                                <a href="/">
                                    <i className="fa fa-home"></i><br/>
                                    <span>首页</span>
                                </a>
                            </li>
                            <li className={this.state.path == '/cloumns' ? "active" : null}>
                                <a href="/cloumns">
                                    <i className="fa fa-th-list"></i><br/>
                                    <span>专题</span>
                                </a>
                            </li>
                            <li className={this.state.path == '/bug' ? "active" : null}>
                                <a href="/bug">
                                    <i className="fa fa-question-circle"></i><br/>
                                    <span>bug反馈</span>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="container">{page}</div>
                </div>
            )
        }
    });

    React.render(<App />, document.getElementById('container'));
})