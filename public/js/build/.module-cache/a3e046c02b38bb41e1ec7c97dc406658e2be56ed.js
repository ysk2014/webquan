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
			_this.getArts(_this.state.name,_this.state.page);
		},
		getArts: function(name,page) {
			var params = {name:_this.state.name,page:page};
			ArticleModel.getArtsLikeTag(params,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
						_this.setState({
							articles: data.data,
							next: data.next,
							page: _this.state.page+1,
						});
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
				articles: [],
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