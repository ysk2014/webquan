define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/model/cloumnModel',
	'home/common/tooltip',
	],function(React, $, WQ, ArticleModel, CloumnModel, Tooltip) {


	var mixin = {
		init: function() {
			var _this = this;
			_this.getAllArticle(0);
			CloumnModel.getAllCloumns({way:'addtime'},function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							cloumns: data.data,
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
		hamdleTabChange: function(event) {
			var _this = this;
			var cid = $(event.target).data('cid');

			if($(event.target).hasClass('active')) return;
			_this.setState({
				nav: cid,
			});

			if(!_this.state.list[cid]) {
				_this.getAllArticleByCid(cid,0);
			}
			$(event.target).addClass('active').siblings().removeClass('active');
		},
		// 获取全部文章
		getAllArticle: function(page) {
			var _this = this;
			ArticleModel.getAllArticle({way:'addtime',page:page},function(success,data) {
				if(success) {
					if(!data.error) {
						if(_this.state.list['0']) {
							Array.prototype.push.apply(_this.state.list['0'],data.data);
						} else {
							_this.state.list['0'] = data.data;
						}
						
						_this.state.more['0'] = parseInt(page)+1;
						_this.setState({
							list: _this.state.list,
							more: _this.state.more,
							next: data.next
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
		// 获取专题文章
		getAllArticleByCid: function(cid,page) {
			var _this = this;
			ArticleModel.getAllArticleByCid({cid:cid,way:'addtime',page:page},function(success,data) {
				if(success) {
					if(!data.error) {
						if(_this.state.list[cid]) {
							Array.prototype.push.apply(_this.state.list[cid],data.data);
						} else {
							_this.state.list[cid] = data.data;
						}
						_this.state.more[cid] = parseInt(page)+1;
						_this.setState({
							list: _this.state.list,
							more: _this.state.more,
							next: data.next
						});
					} else {
						Tooltip(data.msg);
					}
				} 
			});
		},
		hamdleMore: function(event){
			var page = $(event.target).data('page');
			var _this = this;
			var nav = _this.state.nav;
			if(nav=='0') {
				_this.getAllArticle(page)
			} else {
				_this.getAllArticleByCid(nav,page);
			}
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				list: [],        //文章列表
				cloumns: [],	 //专题列表
				nav: '0',		 //标记当前的专题
				more:[],         //记录每个专题进入到了第几页
				next: false,      //判断是否还有数据
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var nav = this.state.nav;
			var list = (this.state.list[nav] && this.state.list[nav].length>0) ? this.state.list[nav].map(function(d,i) {
				return (
					React.createElement("article", {key: d.id}, 
						React.createElement("a", {className: "pic", href: "/article/"+d.id, style: {backgroundImage: 'url('+d.logo_dir+')'}}
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
			var cloumns = this.state.cloumns.length>0 ? this.state.cloumns.map(function(c,i) {
				return (
					React.createElement("a", {key: c.id, "data-cid": c.id, onClick: _this.hamdleTabChange, className: "tab", href: "javascript:void(0)"}, c.title)
				);
			}) : null;
			return (
				React.createElement("div", null, 
					React.createElement("div", {className: "header"}, 
						React.createElement("div", {className: "nav"}, 
							React.createElement("a", {className: "tab active", "data-cid": "0", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "全部"), 
							cloumns
						)
					), 
					React.createElement("div", {className: "article-list"}, 
						list, 
						React.createElement("a", {className: "more", style: _this.state.next ? {display:'block'} : {display:'none'}, "data-page":  _this.state.more[nav] ? _this.state.more[nav] : 1, onClick: _this.hamdleMore}, "更多")
					)
				)
			);
		}
	});

});