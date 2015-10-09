define([
	'react',
	'jquery',
	'home/common/leftNav',
	'home/home/articleList',
	],function(React, $, LeftNav, ArticleList) {


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
					React.createElement(LeftNav, {active: this.state.name}), 
					React.createElement(ArticleList, null)
				)
			);
		}
	});

});