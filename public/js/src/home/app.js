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
        'home/common/userDropMenu',
        'home/home', 
        'home/login/login',
        'home/login/user',
        'home/article/editArticle',
        'home/article/article',
        'home/settings/settings',
        'home/cloumn/cloumnList',
        'home/cloumn/editCloumn',
        'home/cloumn/cloumn',
        'home/tag',
    ],function(React, ReactRouter, UserDropMenu, Home, Login, User, EditArticle, Article, Settings, CloumnList, EditCloumn, Cloumn, Tag){
        
    var Route = ReactRouter.Route;
    var RouteHandler = ReactRouter.RouteHandler;

    var App = React.createClass({
        render: function() {
            return (
                <div>
                    <UserDropMenu />
                    <RouteHandler/>
                </div>
            )
        }
    });

    var routes = (
        <Route handler={App}>
            <Route name="home" path="/" handler={Home}/>

            <Route path="/login/:way" handler={Login}/>
            <Route path="/user" handler={User}/>
            <Route path="/settings" handler={Settings}/>

            <Route path="/cloumns" handler={CloumnList}/>
            <Route path="/cloumn/add" handler={EditCloumn}/>
            <Route path="/cloumn/edit/:id" handler={EditCloumn}/>
            <Route path="/cloumn/:id" handler={Cloumn}/>
            
            <Route path="/article/add" handler={EditArticle}/>
            <Route path="/article/edit/:id" handler={EditArticle}/>
            <Route path="/article/:id" handler={Article}/>

            <Route path="/t/:name" handler={Tag}/>
            
        </Route>
    );


    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
      React.render(<Handler />, document.getElementById('container'));
    });

})