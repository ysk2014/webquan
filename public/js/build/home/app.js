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
        

    var App = React.createClass({displayName: "App",
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

        user: function() {
            return React.createElement(User, null)
        },

        settings: function(uid) {
            return React.createElement(Settings, {uid: uid})
        },

        login: function(way) {
            return React.createElement(Login, {way: way})
        },

        notFound: function(path) {
            return React.createElement("div", {className: "not-found"}, "Page Not Found: ", path);
        },

        render: function() {
            var _this = this;
            var page = this.renderCurrentRoute();

            return (
                React.createElement("div", null, 
                    React.createElement(UserDropMenu, null), 

                    React.createElement("div", {className: "left-bar"}, 
                        React.createElement("div", {className: "logo"}, 
                            React.createElement("a", {href: "/"}, React.createElement("img", {src: "/image/logo1.png"}))
                        ), 
                        React.createElement("ul", {className: "left-nav"}, 
                            React.createElement("li", {className: (this.state.nav == 'home' || this.state.nav == -1) ? "active" : null}, 
                                React.createElement("a", {href: "/"}, 
                                    React.createElement("i", {className: "fa fa-home"}), 
                                    React.createElement("span", null, "首页")
                                )
                            ), 
                            React.createElement("li", {className: this.state.nav == 'cloumn' ? "active" : null}, 
                                React.createElement("a", {href: "/cloumns"}, 
                                    React.createElement("i", {className: "fa fa-th-list"}), 
                                    React.createElement("span", null, "专题")
                                )
                            ), 
                            React.createElement("li", {className: this.state.nav == 'other' ? "active" : null}, 
                                React.createElement("a", {href: "/"}, 
                                    React.createElement("i", {className: "fa fa-bell-o"}), 
                                    React.createElement("span", null, "问答")
                                )
                            )
                            
                        )
                    ), 
                    page
                )
            )
        }
    });

    React.render(React.createElement(App, null), document.getElementById('container'));
})