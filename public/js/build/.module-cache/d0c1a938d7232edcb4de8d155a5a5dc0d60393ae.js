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
			var _this = this;
			var params = {name:_this.state.name,page:page};
			ArticleModel.getArtsLikeTag(params,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
						Array.prototype.push.apply(_this.state.articles,data.data);
						_this.setState({
							articles: _this.state.articles,
							next: data.next,
							page: _this.state.page+1,
						});
					} else {
						Tooltip(data.msg)
					}
				}
			});
		},
		handleMore: function() {
			_this.getArts(_this.state.name,_this.state.page);
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
			var _this = this;
			var list = _this.state.articles.length>0 ? _this.state.articles.map(function(d,i) {
				if(d.tags) {
					if(d.tags.indexOf('|')) {
						var tagsList = d.tags.split('|').map(function(t,k) {
							return (React.createElement("a", {style: {marginRight:'6px'}, href: "/t/"+t}, t));
						});
					} else {
						var tagsList = (React.createElement("a", {href: "/t/"+d.tags}, "d.tags"));
					}
					tagsList = (React.createElement("span", {className: "tag"}, " ", React.createElement("i", {className: "fa fa-tags"}), " ", tagsList));
				} else {
					var tagsList = null;
				}
				return (
					React.createElement("article", {key: d.id}, 
						
							d.logo_dir ? 
							(React.createElement("a", {className: "pic", href: "/article/"+d.id, style: {backgroundImage: 'url('+d.logo_dir+')'}}, 
								React.createElement("span", null, d.cloumn)
							)) : null, 
						
						
						React.createElement("div", {className: "desc"}, 
							React.createElement("a", {className: "title", href: "/article/"+d.id}, d.title), 
							React.createElement("div", {className: "author"}, 
								React.createElement("a", {href: "javascript:void(0)"}, 
									React.createElement("img", {className: "avatar", src: d.userUrl ? d.userUrl : "/image/user-default.png"}), 
									React.createElement("span", {className: "name"}, d.username)
								), 
								React.createElement("span", {className: "time"}, " • ", WQ.timeFormat(d.addtime)), 
								React.createElement("span", {className: "tag"}, " 阅读: ", d.view), 
								React.createElement("span", {className: "tag"}, " 推荐: ", d.praise), 
								React.createElement("span", {className: "tag"}, " 评论: ", d.comment), 
								tagsList
							), 
							React.createElement("div", {className: "description"}, d.description)
						)
					)
				);
			}) : null;
			return (
				React.createElement("div", null, 
					React.createElement(LeftNav, {active: this.state.navName}), 
					React.createElement("div", {className: "tag-page"}, 
						React.createElement("div", {className: "page"}, 
							React.createElement("div", {className: "top"}, 
								React.createElement("i", {className: "fa fa-tags"}), _this.state.name
							), 
							React.createElement("div", {className: "article-list"}, 
								list, 
								React.createElement("a", {className: "more", style: _this.state.next ? {display:'block'} : {display:'none'}, onClick: _this.hamdleMore}, "更多")
							)
						)
					)
				)
			);
		}
	});

});