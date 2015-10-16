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
        'home/router-mixin',
        'home/common/userDropMenu',
        'home/user/login',
        'home/user/user',
        'home/user/settings',
        'home/article/articleList',
        'home/article/editArticle',
        'home/article/article',
        'home/cloumn/cloumnList',
        'home/cloumn/editCloumn',
        'home/cloumn/cloumn',
        'home/tag',
    ],function(React, $, RouterMixin, UserDropMenu, Login, User, Settings, ArticleList, EditArticle, Article, CloumnList, EditCloumn, Cloumn, Tag){
        

    var App = React.createClass({
        mixins: [RouterMixin],
        routes: {
            '/': 'articleList',
            '/article/add': 'addArticle',
            '/article/:id/edit': 'editArticle',
            '/article/:id': 'article',


            '/cloumns': 'cloumnList',
            '/cloumn/:id': 'cloumn',
            '/cloumn/add': 'addCloumn',
            '/cloumn/:id/edit': 'editCloumn',

            '/user': 'user',
            '/user/:id/settings': 'settings',
            '/login/:way': 'login',
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
            return <EditCloumn />
        },

        editCloumn: function(cid) {
            return <EditCloumn cid={cid} />
        },

        user: function() {
            return <User />
        },

        settings: function(uid) {
            return <Settings uid={uid} />
        },

        login: function(way) {
            return <Login way={way} />
        },

        notFound: function(path) {
            return <div className="not-found">Page Not Found: {path}</div>;
        },

        render: function() {
            var _this = this;
            var page = this.renderCurrentRoute();

            return (
                <div>
                    <UserDropMenu />

                    <div className="left-bar">
                        <div className="logo">
                            <a href="/"><img src="/image/logo1.png" /></a>
                        </div>
                        <ul className="left-nav">
                            <li className={(this.state.path == '/' || this.state.nav == -1) ? "active" : null}>
                                <a href="/">
                                    <i className="fa fa-home"></i>
                                    <span>首页</span>
                                </a>
                            </li>
                            <li className={this.state.path == '/cloumns' ? "active" : null}>
                                <a href="/cloumns">
                                    <i className="fa fa-th-list"></i>
                                    <span>专题</span>
                                </a>
                            </li>
                            <li className={this.state.path == '/other' ? "active" : null}>
                                <a href="/">
                                    <i className="fa fa-bell-o"></i>
                                    <span>问答</span>
                                </a>
                            </li>
                            
                        </ul>
                    </div>
                    {page}
                </div>
            )
        }
    });

    React.render(<App />, document.getElementById('container'));
})