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
        

    var App = React.createClass({displayName: "App",
        mixins: [RouterMixin],
        routes: {
            '/'                : 'articleList',
            '/article/add'     : 'addArticle',
            '/article/:id/edit': 'editArticle',
            '/article/:id'     : 'article',
            '/draft/:id/edit'  : 'editDraft',
            '/user/:id/draft/:did' : 'draft',


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
            document.title = 'Web圈';
            return React.createElement(ArticleList, null);
        },

        addArticle: function(params) {
            return React.createElement(EditArticle, {params: params})
        },

        editArticle: function(aid) {
            return React.createElement(EditArticle, {aid: aid})
        },

        editDraft: function(did) {
            return React.createElement(EditArticle, {did: did})
        },

        article: function(aid, params) {
            return React.createElement(Article, {aid: aid, params: params})
        },

        draft: function(uid,did) {
            return React.createElement(Article, {did: did, uid: uid})
        },

        cloumnList: function() {
            return React.createElement(CloumnList, null);
        },

        cloumn: function(cid) {
            return React.createElement(Cloumn, {cid: cid})
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
            return React.createElement(EditCloumn, null)
        },

        editCloumn: function(cid) {
            return React.createElement(EditCloumn, {cid: cid})
        },

        user: function(id,params) {
            return React.createElement(User, {uid: id, params: params})
        },

        settings: function(uid) {
            return React.createElement(Settings, {uid: uid})
        },

        store: function(uid,type) {
            return React.createElement(MyPage, {uid: uid, type: type})
        },

        login: function(way,params) {
            return React.createElement(Login, {way: way, params: params})
        },

        tag: function(name) {
            return React.createElement(Tag, {name: name})
        },

        bug: function() {
            return React.createElement(Bug, null)
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
                    

                    
                        matches ? null : (React.createElement("div", {className: "left-bar"}, 
                                            React.createElement("div", {className: "logo"}, 
                                                React.createElement("a", {href: "/"}, React.createElement("img", {src: "/image/logo.png"}))
                                            ), 
                                            React.createElement("ul", {className: "left-nav"}, 
                                                React.createElement("li", {className: (this.state.path == '/' || this.state.path.indexOf('/cloumn') == -1 && this.state.path != '/bug') ? "active" : null}, 
                                                    React.createElement("a", {href: "/"}, 
                                                        React.createElement("i", {className: "fa fa-home"}), React.createElement("br", null), 
                                                        React.createElement("span", null, "首页")
                                                    )
                                                ), 
                                                React.createElement("li", {className: this.state.path.indexOf('/cloumn') > -1 ? "active" : null}, 
                                                    React.createElement("a", {href: "/cloumns"}, 
                                                        React.createElement("i", {className: "fa fa-th-list"}), React.createElement("br", null), 
                                                        React.createElement("span", null, "专题")
                                                    )
                                                ), 
                                                React.createElement("li", {className: this.state.path == '/bug' ? "active" : null}, 
                                                    React.createElement("a", {href: "/bug"}, 
                                                        React.createElement("i", {className: "fa fa-question-circle"}), React.createElement("br", null), 
                                                        React.createElement("span", null, "bug反馈")
                                                    )
                                                )
                                                
                                            )
                                        )), 
                    
                    
                    React.createElement("div", {className: "container"}, page)
                )
            )
        }
    });

    React.render(React.createElement(App, null), document.getElementById('container'));
    $('#loading').hide();

})