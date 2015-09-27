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
        'home/article/editArticle',
        'home/article/article',
        'home/settings/settings',
    ],function(React, ReactRouter, Home, Login, EditArticle, Article,Settings){

    var Route = ReactRouter.Route;
    var RouteHandler = ReactRouter.RouteHandler;

    var App = React.createClass({
        render: function() {
            return (
                <div>
                    <RouteHandler/>
                </div>
            )
        }
    });

    var routes = (
        <Route handler={App}>
            <Route name="home" path="/" handler={Home}/>
            <Route path="/login/:way" handler={Login}/>
            <Route path="/article/add" handler={EditArticle}/>
            <Route path="/article/edit/:id" handler={EditArticle}/>
            <Route path="/article/:id" handler={Article}/>
            <Route path="/settings" handler={Settings}/>
        </Route>
    );


    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
      React.render(<Handler />, document.getElementById('container'));
    });

})