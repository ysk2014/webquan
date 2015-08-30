requirejs.config({
	baseUrl: '/js/lib',
	paths: {
		jquery 			: "jquery-1.11.3.min",
		backbone		: "backbone.min",
		marked			: "marked.min",
        prettify        : "prettify.min",
        raphael         : "raphael.min",
        underscore      : "underscore.min",
        flowchart       : "flowchart.min", 
        jqueryflowchart : "jquery.flowchart.min", 
        sequenceDiagram : "sequence-diagram.min",
        katex           : "//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.1.1/katex.min",
        editormd        : "editormd.amd", // Using Editor.md amd version for Require.js
        jqueryextend    : "jquery.extend", 
        WQ				: "../WQ",
        project			: "../project"
	},

	shim: {
        WQ:{
            deps:[ 'jquery','underscore','jqueryextend'],
            exports:'WQ'
        },
        backbone:{
            deps:['underscore', 'jquery'],
            exports:'Backbone'
        },
        underscore:{
            exports:'_'
        },
	},
	waitSeconds: 30
});

requirejs(['WQ'],function(WQ){
	 WQ.init();
})
