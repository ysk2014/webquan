define([
	'react',
	'jquery',
	'WQ',
	'home/common/leftNav',
	'home/common/tooltip',
	'home/model/articleModel',
	],function(React, $, WQ, LeftNav, Tooltip, ArticleModel) {


	var mixin = {
		init: function() {
			var _this = this;
			ArticleModel.tagInfo(_this.state.name,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				navName: 'home',
				name: this.props.params.name ? this.props.params.name : null,
				tagInfo: null,
			}
		},
		componentDidMount: function() {
			this.init();
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