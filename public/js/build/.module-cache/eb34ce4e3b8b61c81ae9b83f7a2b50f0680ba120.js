define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/common/leftNav',
	'home/common/userDropMenu',
	'home/common/tooltip',
    'editormd',
	],function( React, $, WQ, ArticleModel, LeftNav, UserDropMenu, Tooltip, editormd) {


	var mixin = {
		init: function() {
			var _this = this;
			var aid = _this.state.aid;
			ArticleModel.getArticleById(aid,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							info: data.data,
						});
						_this.showEditor(data.data.content);
						_this.showComment(data.data.id,0);
					}
				}
			});
			return this;
		},
		showEditor: function(markdown){
			var _this = this;
	        var testEditor = editormd.markdownToHTML("editormd-view", {
                markdown        : markdown ,
                tocm            : true,
	        });
		},
		// 显示评论
		showComment: function(aid,page) {
			var _this = this;
	        ArticleModel.getContentsByAid({aid:aid,page:page},function(success,data) {
	        	if(success) {
	        		if(!data.error) {
	        			if(data.data) {
		        			_this.setState({
		        				commentList: data.data,
		        			});
		        			if(!data.next) {
		        				_this.setState({
		        					next: false,
		        				});
		        			}
	        			}
	        		} else {
	        			Tooltip(data.msg);
	        		}
	        	}
	        });
		},
		handleChangeCommnet: function(event) {
			this.setState({
				commentContent: event.target.value
			});
		},
		// 提交评论
		submitComment: function() {
			var _this = this;
			var aid = this.state.aid;
			var content = this.state.commentContent;
			var uid = WQ.cookie.get('id');
			var username = WQ.cookie.get('username');

			var data = {aid:aid, uid:uid, content:content};

			ArticleModel.addComment(data,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.state.commentList.push({
							id: data.data.id,
							aid: aid,
							uid: uid,
							username: username,
							content: content,
							addtime: data.data.addtime
						});
						_this.state.info.comment = parseInt(_this.state.info.comment)+1;
						_this.setState({
							commentList: _this.state.commentList,
							commentContent: '',
							info: _this.state.info
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
		handleReplay: function(event) {
			var nick = $(event.target).data('nick');
			this.setState({
				commentContent: '@' + nick + ' '
			});
			$('#comment-text').focus();
		},
		hamdleMore: function() {
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
				name: 'home',
				aid: this.props.params.id,
				commentList: [],
				commentContent: '',
				page: 0,
				next: true,
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var title    = _this.state.info ? _this.state.info.title      : null;
			var username = _this.state.info ? _this.state.info.username   : null;
			var time     = _this.state.info ? _this.state.info.addtime    : null;
			var cloumn   = _this.state.info ? _this.state.info.cloumnName : null;
			var view     = _this.state.info ? _this.state.info.view       : null;
			var comment  = _this.state.info ? _this.state.info.comment    : null;

			var commentList = this.state.commentList.length>0 ? this.state.commentList.map(function(d,i) {
				return (
					React.createElement("div", {key: d.id, className: "comment-item  clearfix", "data-id": d.id}, 
						React.createElement("a", {className: "user avatar"}, 
							React.createElement("img", {src: "/image/user-default.png"})
						), 
						React.createElement("div", {className: "comment-right"}, 
							React.createElement("div", {className: "con"}, 
								React.createElement("span", {className: "author"}, 
									React.createElement("a", {href: "javascript:void(0)"}, d.username), 
									React.createElement("div", {className: "hd-time"}, WQ.timeFormat(d.addtime))
								), 
								React.createElement("div", {className: "html"}, d.content)
							), 
							React.createElement("div", {className: "replay"}, 
								React.createElement("a", {"data-nick": d.username, onClick: _this.handleReplay}, "回复")
							)
						)
					)
				);
			}) : null;
			return (
				React.createElement("div", null, 
					React.createElement(UserDropMenu, null), 
					React.createElement(LeftNav, {active: this.state.name}), 

					React.createElement("div", {className: "header"}, 
						React.createElement("div", {className: "btn-list"}, 
							React.createElement("a", {className: "btn", href: "/article/edit/"+this.state.aid}, 
								React.createElement("i", {className: "fa fa-pencil-square-o"})
							), 
							React.createElement("a", {className: "btn"}, 
								React.createElement("i", {className: "fa fa-bookmark-o"})
							), 
							React.createElement("a", {className: "btn"}, 
								React.createElement("i", {className: "fa fa-share-square-o"})
							)
						)
					), 

					React.createElement("div", {className: "article-page", style: _this.state.info ? {display:'block'} : {display: 'none'}}, 
						React.createElement("h3", {className: "title"}, title), 
						React.createElement("div", null, 
							React.createElement("span", {className: "author"}, 
								React.createElement("a", {href: "javascript:void(0)"}, 
									React.createElement("img", {className: "avatar", src: "/image/user-default.png"}), 
									React.createElement("span", {className: "name"}, username)
								)
							), 
							React.createElement("span", {className: "tag time"}, " • ", WQ.timeFormat(time)), 
							React.createElement("span", {className: "tag cloumn"}, " 发布在: ", cloumn), 
							React.createElement("span", {className: "tag view"}, " 阅读: ", view), 
							React.createElement("span", {className: "tag comment"}, " 评论: ", comment)
						), 
						
						React.createElement("div", {id: "editormd-view"}, 
							React.createElement("textarea", null)
						), 

						React.createElement("div", {className: "comment-box"}, 
							React.createElement("div", {className: "hd"}, "评论"), 
							React.createElement("div", {className: "bd"}, 
								React.createElement("div", {className: "publish"}, 
									React.createElement("textarea", {id: "comment-text", placeholder: "参与讨论", value: this.state.commentContent, onChange: this.handleChangeCommnet}), 
									React.createElement("div", {className: "comment-submit", onClick: this.submitComment}, "发表评论")
								), 
								React.createElement("div", {className: "comment-list"}, 
									commentList, 
									React.createElement("a", {className: "more", style: _this.state.next ? {display:'block'} : {display:'none'}, "data-page":  _this.state.page, onClick: _this.hamdleMore}, "更多评论")
								)
							)
						)
					)
				)
			);
		}
	});

});