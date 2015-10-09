requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        jquery          : "jquery-1.11.3.min",
        jqueryextend    : "jquery.extend", 
        WQ              : "WQ",
        react           : "react-with-addons.min",
        reactRouter     : 'react-router.min',
        editormd        : 'editor/editormd',
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
        'reactRouter', 
        'home/home/home', 
        'home/login/login',
        'home/login/user',
        'home/article/editArticle',
        'home/article/article',
        'home/settings/settings',
        'home/cloumn/cloumn',
        'home/cloumn/cloumn',
    ],function(React, ReactRouter, Home, Login, User, EditArticle, Article, Settings, Cloumn){
        
    var Route = ReactRouter.Route;
    var RouteHandler = ReactRouter.RouteHandler;

    var App = React.createClass({displayName: "App",
        render: function() {
            return (
                React.createElement("div", null, 
                    React.createElement(RouteHandler, null)
                )
            )
        }
    });

    var routes = (
        React.createElement(Route, {handler: App}, 
            React.createElement(Route, {name: "home", path: "/", handler: Home}), 

            React.createElement(Route, {path: "/login/:way", handler: Login}), 
            React.createElement(Route, {path: "/user", handler: User}), 
            React.createElement(Route, {path: "/settings", handler: Settings}), 

            React.createElement(Route, {path: "/cloumns", handler: Cloumn}), 
            
            React.createElement(Route, {path: "/article/add", handler: EditArticle}), 
            React.createElement(Route, {path: "/article/edit/:id", handler: EditArticle}), 
            React.createElement(Route, {path: "/article/:id", handler: Article})
            
        )
    );


    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
      React.render(React.createElement(Handler, null), document.getElementById('container'));
    });

})