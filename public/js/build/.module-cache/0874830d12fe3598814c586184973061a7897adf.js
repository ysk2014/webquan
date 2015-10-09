define([
	'react',
	'jquery',
	'WQ',
	'home/common/leftNav',
	'home/model/articleModel',
	],function(React, $, WQ, LeftNav, ArticleModel) {


	var mixin = {
		init: function() {
			var _this = this;
			ArticleModel.tagInfo(_this.state.name,function(success,data) {

			});
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				navName: 'home',
				name: this.props.params.name ? this.props.params.name : null,
			}
		},
		componentDidMount: function() {
			
		},
		render: function() {
			return (
				React.createElement("div", null, 
					React.createElement(LeftNav, {active: this.state.navName})
				)
			);
		}
	});

});