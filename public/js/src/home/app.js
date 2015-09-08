requirejs.config({
	baseUrl: '/js/lib',
	paths: {
		jquery 			: "jquery-1.11.3.min",
        jqueryextend    : "jquery.extend", 
        WQ              : "WQ",
        react			: "react-with-addons.min",
        reactRouter     : 'react-router.min',
        home			: "../build/home"
	},

	shim: {
        WQ:{
            deps:[ 'jquery','jqueryextend'],
            exports:'WQ'
        },
	},
	waitSeconds: 30
});

requirejs([
        'react', 
        'reactRouter', 
        'jquery', 
        'WQ', 
        'home/home/home', 
        'home/login/signin'
    ],function(React, ReactRouter, $, WQ, Home, Signin){

    var Route = ReactRouter.Route;
    var RouteHandler = ReactRouter.RouteHandler;

    var App = React.createClass({
        render: function() {
            return (
                <div>
                    <h1>App</h1>
                    <RouteHandler/>
                </div>
            )
        }
    });

    var routes = (
        <Route handler={App}>
            <Route path="/" handler={Home}/>
            <Route path="/sign_in" handler={Signin}/>
        </Route>
    );


    ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
      React.render(<Handler/>, document.body);
    });

})
