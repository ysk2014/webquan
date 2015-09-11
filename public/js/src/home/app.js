requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        jquery          : "jquery-1.11.3.min",
        jqueryextend    : "jquery.extend", 
        WQ              : "WQ",
        react           : "react-with-addons.min",
        reactRouter     : 'react-router.min',
        home            : "../build/home"
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
    ],function(React, ReactRouter, Home, Login){

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
        </Route>
    );


    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
      React.render(<Handler />, document.getElementById('container'));
    });

})