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
							tagInfo: data.data
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
			
			
		},
		getArts: function(name,page) {
			var params = {name:_this.state.name,page:page};
			ArticleModel.getArtsLikeTag(params,function(success,data) {
				if(success) {
					if(!data.error) {

					} else {
						Tooltip(data.msg)
					}
				}
			});
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				navName: 'home',
				name: this.props.params.name ? this.props.params.name : null,
				tagInfo: null,
				next: false,
				page: 0,
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