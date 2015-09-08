requirejs.config({
	baseUrl: '/js/lib',
	paths: {
		jquery 			: "jquery-1.11.3.min",
        jqueryextend    : "jquery.extend", 
        WQ              : "WQ",
        react			: "react-with-addons.min",
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

requirejs(['react', 'jquery', 'WQ', 'home/home/home', 'home/login/signin'],function(React, $, WQ, Home, Signin){

    // React.render(<Home />, $('#container').get(0));

    React.render(<Signin />, $('#login').get(0));
    
})
