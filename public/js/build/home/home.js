define([
	'react',
	'jquery',
	'home/article/articleList',
	],function(React, $, ArticleList) {


	var mixin = {
		init: function() {
			
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'home',
			}
		},
		componentDidMount: function() {
			
		},
		render: function() {
			return (
				React.createElement("div", null, 
					React.createElement(ArticleList, null)
				)
			);
		}
	});

});