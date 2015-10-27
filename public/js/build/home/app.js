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
        'home/user/myPage',
        'home/article/articleList',
        'home/article/editArticle',
        'home/article/article',
        'home/cloumn/cloumnList',
        'home/cloumn/editCloumn',
        'home/cloumn/cloumn',
        'home/tag',
    ],function(React, $, RouterMixin, UserDropMenu, Login, User, Settings, MyPage, ArticleList, EditArticle, Article, CloumnList, EditCloumn, Cloumn, Tag){
        

    var App = React.createClass({displayName: "App",
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
        },
        articleList: function() {
            return React.createElement(ArticleList, null);
        },

        addArticle: function() {
            return React.createElement(EditArticle, null)
        },

        editArticle: function(aid) {
            return React.createElement(EditArticle, {aid: aid})
        },

        article: function(aid) {
            return React.createElement(Article, {aid: aid})
        },

        cloumnList: function() {
            return React.createElement(CloumnList, null);
        },

        cloumn: function(cid) {
            return React.createElement(Cloumn, {cid: cid})
        },

        addCloumn: function() {
            return React.createElement(EditCloumn, null)
        },

        editCloumn: function(cid) {
            return React.createElement(EditCloumn, {cid: cid})
        },

        user: function(id) {
            return React.createElement(User, {uid: id})
        },

        settings: function(uid) {
            return React.createElement(Settings, {uid: uid})
        },

        store: function(uid,type) {
            return React.createElement(MyPage, {uid: uid, type: type})
        },

        login: function(way) {
            return React.createElement(Login, {way: way})
        },

        tag: function(name) {
            return React.createElement(Tag, {name: name})
        },

        notFound: function(path) {
            return React.createElement("div", {className: "not-found"}, "Page Not Found: ", path);
        },

        render: function() {
            var _this = this;
            var page = this.renderCurrentRoute();
            var loginPattern = eval(/^\/login\/(?:([^\/]+?))\/?$/i);
            var matches = loginPattern.exec(_this.state.path);
            return (
                React.createElement("div", null, 
                    
                        matches ? null : React.createElement(UserDropMenu, null), 
                    

                    React.createElement("div", {className: "left-bar"}, 
                        React.createElement("div", {className: "logo"}, 
                            React.createElement("a", {href: "/"}, React.createElement("img", {src: "/image/logo1.png"}))
                        ), 
                        React.createElement("ul", {className: "left-nav"}, 
                            React.createElement("li", {className: (this.state.path == '/' || this.state.path != '/cloumns') ? "active" : null}, 
                                React.createElement("a", {href: "/"}, 
                                    React.createElement("i", {className: "fa fa-home"}), React.createElement("br", null), 
                                    React.createElement("span", null, "首页")
                                )
                            ), 
                            React.createElement("li", {className: this.state.path == '/cloumns' ? "active" : null}, 
                                React.createElement("a", {href: "/cloumns"}, 
                                    React.createElement("i", {className: "fa fa-th-list"}), React.createElement("br", null), 
                                    React.createElement("span", null, "专题")
                                )
                            ), 
                            React.createElement("li", {className: this.state.path == '/other' ? "active" : null}, 
                                React.createElement("a", {href: "/"}, 
                                    React.createElement("i", {className: "fa fa-bell-o"}), React.createElement("br", null), 
                                    React.createElement("span", null, "意见反馈")
                                )
                            )
                            
                        )
                    ), 
                    React.createElement("div", {className: "container"}, page)
                )
            )
        }
    });

    React.render(React.createElement(App, null), document.getElementById('container'));
})