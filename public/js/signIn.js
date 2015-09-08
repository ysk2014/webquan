requirejs.config({
	baseUrl: '/js/lib',
	paths: {
		jquery 			: "jquery-1.11.3.min",
        jqueryextend    : "jquery.extend", 
        WQ              : "WQ",
        react			: "react-with-addons.min",
        home			: "../build/home",
	},

	shim: {
        WQ:{
            deps:[ 'jquery','jqueryextend'],
            exports:'WQ'
        },
	},
	waitSeconds: 30
});

requirejs(['react', 'jquery', 'WQ', 'home/signIn/signIn'],function(React, $, WQ, Home){

    // React.render(React.createElement(Home), document.getElementById('container'));
    alert("fdsdfs");
})

