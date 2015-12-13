define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/model/bugModel',
        'home/common/tooltip',
        'home/model/articleModel',
        'WQ'
        ],function(React, $, UserModel, BugModel, Tooltip, ArticleModel, WQ) {

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    var Store = React.createClass({displayName: "Store",
    	getInitialState: function() {
    		var type = (this.props.type=='store') ? 1 : 0;
    		return {
                uid: this.props.uid,
                type: type,
                articles: [],
                page: 0,
            }
    	},
    	componentDidMount: function() {
            this.getArticles(0);
        },
    	getArticles: function(page) {
    		var _this = this;
    		var params = {uid:_this.state.uid,type:_this.state.type,page:page};
    		ArticleModel.getArticlesByPS(params,function(success,data) {
    			if(success) {
    				if(!data.error) {
    					if(_this.state.articles.length>0) {
							Array.prototype.push.apply(_this.state.articles,data.data);
						} else {
							_this.state.articles = data.data;
						}
						_this.setState({
							articles: _this.state.articles,
							next: data.next,
							page: _this.state.page+1,
						});
    				}
    			}
    		});
    	},
    	handleMore: function() {
			_this.getArticles(_this.state.page);
		},
		render: function() {
			var _this = this;
			document.title = '我的收藏 | Web圈';

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
								React.createElement("a", {href: "/user/"+d.uid}, 
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
				React.createElement(ReactCSSTransitionGroup, {transitionName: "fadeToTop", transitionAppear: true}, 
					React.createElement("div", null, 
						React.createElement("div", {className: "top"}, React.createElement("i", {className: "fa fa-bookmark"}), "我的收藏"), 
						React.createElement("div", {className: "article-list"}, 
		        			list, 
		        			React.createElement("a", {className: "btn btn-default btn-large", href: "javascript:void(0)", style: _this.state.next ? {display:'block',marginTop:'15px'} : {display:'none'}, onClick: _this.hamdleMore}, "更多")
		        		)
					)
				)
			);
		}
    });


    var Draft = React.createClass({displayName: "Draft",
    	getInitialState: function() {
    		return {
                uid: this.props.uid,
                articles: [],
                page: 0,
            }
    	},
    	componentDidMount: function() {
            this.getArticles(0);
        },
    	getArticles: function(page) {
    		var _this = this;
    		var params = {uid:_this.state.uid, way:'is_publish', page:page, is_publish:0};

    		ArticleModel.getAllArticleByUid(params,function(success,data) {
    			if(success) {
    				if(!data.error) {
    					if(_this.state.articles.length>0) {
							Array.prototype.push.apply(_this.state.articles,data.data);
						} else {
							_this.state.articles = data.data;
						}
						_this.setState({
							articles: _this.state.articles,
							next: data.next,
							page: _this.state.page+1,
						});
    				}
    			}
    		});
    	},
    	handleMore: function() {
			_this.getArticles(_this.state.page);
		},
		handlePublish: function(event) {
			var _this = this;
			if(event.target.tagName.toLowerCase() == 'a'){
				var ele = $(event.target);
			} else {
				var ele = $(event.target).parent();
			}
			var key = ele.data('key');
			_this.state.articles[key]['is_publish'] = 1;
			ArticleModel.editArticle(_this.state.articles[key],function(success,data) {
				if(success) {
					if(!data.error) {
						_this.state.articles.splice(key,1);
						_this.setState({
							articles: _this.state.articles,
						});
					}
				}
			})
		},
		render: function() {
			var _this = this;
			document.title = '我的草稿箱 | Web圈';

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
							React.createElement("a", {href: "javascript:void(0)", className: "btn btn-default pull-right", "data-key": i, onClick: _this.handlePublish}, React.createElement("i", {className: "fa fa-send-o"}), "发布"), 
							React.createElement("div", {className: "author"}, 
								React.createElement("a", {href: "/user/"+d.uid}, 
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
				React.createElement(ReactCSSTransitionGroup, {transitionName: "fadeToTop", transitionAppear: true}, 
					React.createElement("div", null, 
						React.createElement("div", {className: "top"}, React.createElement("i", {className: "fa fa-inbox"}), "我的草稿箱"), 
						React.createElement("div", {className: "article-list"}, 
		        			list, 
		        			React.createElement("a", {className: "btn btn-default btn-large", href: "javascript:void(0)", style: _this.state.next ? {display:'block',marginTop:'15px'} : {display:'none'}, onClick: _this.hamdleMore}, "更多")
		        		)
					)
				)
			);
		}
    });

	var mixin = {
		init: function() {
			var _this = this;
			_this.getNews({
				uid: _this.state.uid,
				page: 0
			},true);
		},
		getNews: function(params,status) {
			var _this = this;
			UserModel.getNews(params,function(success,data) {
				if(success) {
					if(!data.error) {
						if(status) {
							var nav = 'all';
						} else {
							var nav = 'unread'
						}

						if(_this.state.news[nav]) {
							Array.prototype.push.apply(_this.state.news[nav],data.data);
						} else {
							_this.state.news[nav] = data.data;
						}

						_this.state.more[nav] = parseInt(params['page'])+1;
						_this.setState({
							news: _this.state.news,
							next: data.next,
							more: _this.state.more
						});
					}
				}
			});
		},
		componentDidMount: function() {
			this.init();
		},
		hamdleChangeNav: function(event) {
			var _this = this;
			var index = $(event.target).index();
			if(index==0) {
				nav = 'all';
			} else {
				nav = 'unread';
			}
			if(nav == _this.state.nav) return;

			_this.setState({
				nav: nav
			});
			if(!_this.state.news[nav]) {
				_this.getNews({
					uid: _this.state.uid,
					unread: 1,
					page: 0
				},false);
			}
		},
		handleMore: function(event){
			var page = $(event.target).data('page');
			var _this = this;
			var nav = _this.state.nav;
			if(nav=='all') {
				var params = {
					uid: _this.state.uid,
					page: page
				};
				var status = true;
			} else {
				var params = {
					uid: _this.state.uid,
					unread: 1,
					page: page
				};
				var status = false;
			}
			_this.getNews(params,status);
		},
		updateNews: function(params,status) {
			var _this = this;
			UserModel.updateNews(params,function(success,data) {
				if(success) {
					if(!data.error) {
						if(status) {
							$('.news-list li.active').removeClass('active');
							$('.drop-menu .news').hide();
							_this.state.news['unread'] = null;
							_this.setState({
								news: _this.state.news
							});
						}
					}
				}
			});
		},
		handleRead: function(event) {
			event.preventDefault();
			var li = $(event.target).parents('li');
			if(!li.hasClass('active')) return;

			var nid = li.data('nid');
			this.updateNews({
				id: nid
			});
		},
		handleAllRead: function() {
			var _this = this;
			_this.updateNews({
				uid: _this.state.uid,
			},true);
		}
	};

	var News = React.createClass({displayName: "News",
		mixins: [mixin],
		getInitialState: function() {
			return {
                uid: this.props.uid,
                news: [],
                next: false,
                more: [],
                nav: 'all'
            }
		},
		render: function() {
			var _this = this;
			var nav = this.state.nav;

			document.title = '消息 | Web圈';

			var news = _this.state.news[nav] ? _this.state.news[nav].map(function(n,i) {
				return (
					React.createElement("li", {key: n.id, "data-nid": n.id, className: n.unread ? 'active' : ''}, 
						React.createElement("i", {className: "fa fa-fw fa-comments-o"}), 
						React.createElement("span", null, "你在《", React.createElement("a", {href: "/article/"+n.aid+"?news="+n.id}, React.createElement("span", {onClick: this.handleRead}, n.title)), "》中收到一条 ", React.createElement("a", {href: "/user/"+n.send_id+"?news="+n.id, onClick: this.handleRead}, n.username), " 的评论"), 
						React.createElement("span", {className: "time pull-right"}, WQ.timeFormat(n.addtime))
					)
				);
			}) : null;
			return (
				React.createElement(ReactCSSTransitionGroup, {transitionName: "fadeToTop", transitionAppear: true}, 
					React.createElement("div", null, 
						React.createElement("div", {className: "top", style: {borderBottom:'0px'}}, React.createElement("i", {className: "fa fa-bell-o"}), "我的消息"), 
						React.createElement("div", {className: "news-nav clearfix"}, 
							React.createElement("a", {href: "javascript:void(0)", className: nav=="all" ? "active pull-left message" : "pull-left message", onClick: _this.hamdleChangeNav}, "全部消息"), 
							React.createElement("a", {href: "javascript:void(0)", className: nav=="unread" ? "active pull-left message" : "pull-left message", onClick: _this.hamdleChangeNav}, "未读消息"), 
							React.createElement("a", {href: "javascript:void(0)", className: "pull-right btn btn-default", onClick: this.handleAllRead}, React.createElement("i", {className: "fa fa-fw fa-check"}), "全部标记为已读")
						), 
						React.createElement("ul", {className: "news-list"}, 
							news, 
							React.createElement("a", {className: "btn btn-default btn-large", href: "javascript:void(0)", style: _this.state.next ? {display:'block',marginTop:'15px'} : {display:'none'}, "data-page":  _this.state.more[nav] ? _this.state.more[nav] : 1, onClick: _this.handleMore}, "更多")
						)
					)
				)
			);
		}
	});

	var Bugs = React.createClass({displayName: "Bugs",
		getInitialState: function() {
			return {
                uid: this.props.uid,
                bugs: [],
            }
		},
		componentDidMount: function() {
			var _this = this;
			BugModel.getAll(this.state.uid,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							bugs: data.data
						});
					}
				}
			});
		},
		render: function() {
			var _this = this;
			var nav = this.state.nav;

			document.title = 'bug反馈 | Web圈';

			var bugList = _this.state.bugs.map(function(b,i) {
				return (
					React.createElement("li", {key: b.id, "data-nid": b.id}, 
						React.createElement("i", {className: "fa fa-fw fa-comments-o"}), 
						React.createElement("span", null, React.createElement("a", {href: "/user/"+b.uid}, b.username), " 提交了bug："), 
						React.createElement("span", null, React.createElement("a", null, b.content)), 
						React.createElement("span", {className: "time pull-right"}, WQ.timeFormat(b.addtime))
					)
				);
			});
			return (
				React.createElement(ReactCSSTransitionGroup, {transitionName: "fadeToTop", transitionAppear: true}, 
					React.createElement("div", null, 
						React.createElement("div", {className: "top", style: {borderBottom:'0px'}}, React.createElement("i", {className: "fa fa-question-circle"}), "bug反馈"), 
						React.createElement("ul", {className: "news-list"}, 
							bugList
						)
					)
				)
			);
		}
	});


    return React.createClass({
    	getInitialState: function() {
    		return {
                uid: this.props.uid,
                type: this.props.type,
            }
    	},
    	componentWillReceiveProps: function(nextProps) {
    		this.setState({
    			uid: nextProps.uid,
    			type: nextProps.type,
    		});
    	},
        render: function() {
        	var _this = this;
        	if(_this.state.type == 'draft') {
        		var content = React.createElement(Draft, {uid: _this.state.uid});
        	} else if(_this.state.type == 'store') {
        		var content = React.createElement(Store, {uid: _this.state.uid, type: _this.state.type});
        	} else if(_this.state.type == 'news') {
        		var content = React.createElement(News, {uid: _this.state.uid});
        	} else if(_this.state.type == 'bugs') {
        		var content = React.createElement(Bugs, {uid: _this.state.uid});
        	}

        	return (
        		React.createElement("div", {className: "tag-page"}, 
        			content
        		)
        	);
        }
    });
});