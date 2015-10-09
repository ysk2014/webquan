define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/model/articleModel',
	'home/common/leftNav',
	'home/common/userDropMenu',
	'home/common/tooltip',
	],function( React, $, WQ, CloumnModel, ArticleModel, LeftNav, UserDropMenu, Tooltip) {


	var mixin = {
		init: function() {
			var _this = this;
			CloumnModel.getCloumnById(_this.state.cid,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
						_this.setState({
							cloumn: data.data
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});	
			_this.getArticlesByCid();
			return this;
		},
		getArticlesByCid: function() {
			var _this = this;
			var dataObj = {cid:_this.state.cid,way:'addtime',page:0};
			ArticleModel.getAllArticleByCid(dataObj,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
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
				name: 'cloumn',
				cid: this.props.params.id ? this.props.params.id : 0,
				cloumn: {},
				articles: [],
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var articles = _this.state.articles.length>0 ? _this.state.articles.map(function(d,i) {
				return (
					React.createElement("article", {key: d.id}, 
						React.createElement("a", {className: "pic", href: "/article/"+d.id, style: {backgroundImage: 'url('+d.logo_dir+')'}}, 
							React.createElement("span", null, d.cloumn)
						), 
						React.createElement("div", {className: "desc"}, 
							React.createElement("a", {className: "title", href: "/article/"+d.id}, d.title), 
							React.createElement("div", {className: "author"}, 
								React.createElement("a", {href: "javascript:void(0)"}, 
									React.createElement("img", {className: "avatar", src: d.userUrl ? d.userUrl : "/image/user-default.png"}), 
									React.createElement("span", {className: "name"}, d.username)
								), 
								React.createElement("span", {className: "time"}, " • ", WQ.timeFormat(d.addtime)), 
								React.createElement("span", {className: "tag"}, " 阅读: ", d.view), 
								React.createElement("span", {className: "tag"}, " 评论: ", d.comment)
							), 
							React.createElement("div", {className: "description"}, d.description)
						)
					)
				);
			}) : null;
			return (
				React.createElement("div", null, 
					React.createElement(UserDropMenu, null), 
					React.createElement(LeftNav, {active: this.state.name}), 
					
					React.createElement("div", {className: "cloumn-page"}, 
						React.createElement("div", {className: "cloumn-header"}, 
							React.createElement("div", {className: "info"}, 
								React.createElement("div", {className: "cname"}, React.createElement("a", {href: "/cloumn/"+_this.state.cid}, React.createElement("h3", null, _this.state.cloumn['name'] ? _this.state.cloumn['name'] : ''))), 
								React.createElement("div", {className: "anthor"}, 
									React.createElement("a", {style: {color:'#3da9f7',marginRight:'10px'}, href: "/cloumn/"+_this.state.cid}, _this.state.cloumn['count'] ? _this.state.cloumn['count'] : 0, " 片文章"), 
									React.createElement("span", null, React.createElement("i", {className: "fa fa-user"}), "  所有者：", _this.state.cloumn['username'] ? _this.state.cloumn['username'] : '')
								), 
								React.createElement("div", {className: "cdesc"}, _this.state.cloumn['description'] ? _this.state.cloumn['description'] : ''), 
								React.createElement("div", {className: "cloumn-right"}, 
									React.createElement("a", {className: "btn-success"}, "添加关注")
								)
							)
						), 
						React.createElement("div", {className: "cloumn-content"}, 
							React.createElement("ul", {className: "sequence-nav toolbar"}, 
								React.createElement("li", {className: "active"}, React.createElement("a", {href: "javascript:void(0)"}, "热门排序")), " ·",  
								React.createElement("li", {className: ""}, React.createElement("a", {href: "javascript:void(0)"}, "最近更新")), " ·",  
								React.createElement("li", {className: ""}, React.createElement("a", {href: "javascript:void(0)"}, "关注度排序"))
							), 
							React.createElement("div", {className: "article-list"}, 
								articles
							)
						)
					)
				)
			);
		}
	});

});