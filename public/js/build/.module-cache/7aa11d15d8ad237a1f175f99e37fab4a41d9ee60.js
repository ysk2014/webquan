define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/common/leftNav',
	'home/common/tooltip',
    'editormd',
	],function( React, $, WQ, ArticleModel, LeftNav, Tooltip, editormd) {


	var mixin = {
		init: function() {
			var _this = this;
			var aid = _this.state.aid;
			var uid = WQ.cookie.get('id') ? WQ.cookie.get('id') : null;
			_this.setState({
				uid: uid
			});
			//获取文章数据
			ArticleModel.getArticleById(aid,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							info: data.data,
						});
						_this.showEditor(data.data.content);
						_this.showComment(data.data.id,0,true);
					}
				}
			});
			return this;
		},
		// 把文章内容markdown数据转化成html
		showEditor: function(markdown){
			var _this = this;
	        var testEditor = editormd.markdownToHTML("editormd-view", {
                markdown        : markdown ,
                tocm            : true,
	        });
		},
		// 获取评论
		showComment: function(aid,page,first) {
			var _this = this;
	        ArticleModel.getContentsByAid({aid:aid,page:page},function(success,data) {
	        	if(success) {
	        		if(!data.error) {
	        			if(data.data) {
	        				if(_this.state.commentList.length>0) {
	        					Array.prototype.push.apply(_this.state.commentList,data.data);
	        				} else {
	        					_this.state.commentList = data.data;
	        				}

		        			_this.setState({
		        				commentList: _this.state.commentList,
		        				page: _this.state.page+1,
		        				next: data.next
		        			});
	        			}
	        		} else {
	        			if(!first) Tooltip(data.msg);
	        			_this.setState({
	        				next: data.next
	        			});
	        		}
	        	}
	        });
		},
		// 写评论
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
		// 回复评论
		handleReplay: function(event) {
			var nick = $(event.target).data('nick');
			this.setState({
				commentContent: '@' + nick + ' '
			});
			$('#comment-text').focus();
		},
		// 获取更多评论
		hamdleMore: function() {
			var _this = this;
			var page = _this.state.page;
			var aid = _this.state.aid;

			_this.showComment(aid,page);
		},
		// 推荐处理
		handlePraise: function(event) {
			var _this = this;
			if(event.target.tagName.toLowerCase()=='a') {
				var ele = $(event.target);
			} else {
				var ele = $(event.target).parent();
			}
			var params = {aid: _this.state.aid,uid: WQ.cookie.get('id')};
			if(ele.hasClass('btn-success')) {
				ArticleModel.addPraise(params,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.info.praise = parseInt(_this.state.info.praise)+1;
							_this.setState({
								info: _this.state.info
							}); 
							ele.addClass('btn-error').removeClass('btn-success');
						} else {
							Tooltip(data.msg);
						}
					}
				});
			} else if(ele.hasClass('btn-error')) {
				ArticleModel.delPraise(params,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.info.praise = parseInt(_this.state.info.praise)-1;
							_this.setState({
								info: _this.state.info
							});
							ele.addClass('btn-success').removeClass('btn-error');
						} else {
							Tooltip(data.msg);
						}
					}
				});
			}
		},
		// 收藏处理
		handleStore: function(event) {
			var _this = this;
			if(event.target.tagName.toLowerCase()=='a') {
				var ele = $(event.target);
			} else {
				var ele = $(event.target).parent();
			}
			var params = {aid: _this.state.aid,uid: WQ.cookie.get('id')};
			if(ele.hasClass('btn-success')) {
				ArticleModel.addStore(params,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.info.praise = parseInt(_this.state.info.praise)+1;
							_this.setState({
								info: _this.state.info
							}); 
							ele.addClass('btn-error').removeClass('btn-success');
						} else {
							Tooltip(data.msg);
						}
					}
				});
			} else if(ele.hasClass('btn-error')) {
				ArticleModel.delStore(params,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.info.praise = parseInt(_this.state.info.praise)-1;
							_this.setState({
								info: _this.state.info
							});
							ele.addClass('btn-success').removeClass('btn-error');
						} else {
							Tooltip(data.msg);
						}
					}
				});
			}
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'home',
				aid: this.props.params.id,   //文章id
				commentList: [],             //评论数据
				commentContent: '',          //要评论的内容
				page: 0,					 //评论分页
				next: false,                 //是否还有下一页
				uid: null,                   //用户id
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var title        = _this.state.info ? _this.state.info.title        : null;     //文章标题
			var username     = _this.state.info ? _this.state.info.username     : null;     //作者
			var uid          = _this.state.info ? _this.state.info.uid          : null;     //作者id
			var time         = _this.state.info ? _this.state.info.addtime      : null;     //发布时间
			var cloumn       = _this.state.info ? _this.state.info.cloumnName   : null;     //专题
			var view         = _this.state.info ? _this.state.info.view         : null;     //浏览量
			var comment      = _this.state.info ? _this.state.info.comment      : null;     //评论数量
			var praise       = _this.state.info ? _this.state.info.praise       : null;     //推荐数
			var praiseStatus = _this.state.info ? _this.state.info.praiseStatus : null;     //登录的用户是否已推荐
			var store        = _this.state.info ? _this.state.info.store        : null;     //收藏数
			var storeStatus  = _this.state.info ? _this.state.info.storeStatus  : null;     //登录的用户是否已收藏
			var tags         = _this.state.info ? _this.state.info.tags         : null;     //标签

			if(tags) {
				if(tags.indexOf('|')) {
					var tagsList = tags.split('|').map(function(t,i) {
						return (React.createElement("a", {style: {marginRight:'6px',color:'#3da9f7'}, href: '/t/'+t}, t));
					});
				} else {
					var tagsList = (React.createElement("a", {href: '/t/'+tags}, tags));
				}
				tagsList = (React.createElement("span", {className: "tag"}, " ", React.createElement("i", {className: "fa fa-tags"}), " ", tagsList));
			} else {
				var tagsList = null;
			}

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
					React.createElement(LeftNav, {active: this.state.name}), 


					React.createElement("div", {className: "article-page", style: _this.state.info ? {display:'block'} : {display: 'none'}}, 
						React.createElement("h3", {className: "title"}, title), 
						React.createElement("div", {style: {marginBottom:'10px'}}, 
							React.createElement("span", {className: "author"}, 
								React.createElement("a", {href: "javascript:void(0)"}, 
									React.createElement("img", {className: "avatar", src: "/image/user-default.png"}), 
									React.createElement("span", {className: "name"}, username)
								)
							), 
							React.createElement("span", {className: "tag time"}, " • ", WQ.timeFormat(time)), 
							React.createElement("span", {className: "tag"}, " 发布在: ", cloumn), 
							React.createElement("span", {className: "tag view"}, " 阅读: ", view), 
							React.createElement("span", {className: "tag comment"}, " 评论: ", comment), 
							tagsList
						), 
						React.createElement("div", {className: "tool", style: {marginBottom:'10px'}}, 
							_this.state.uid==uid ? (
								React.createElement("a", {className: "btn-success", href: "/article/edit/"+this.state.aid}, 
									React.createElement("i", {className: "fa fa-pencil-square-o", style: {marginRight:'4px'}}), 
									React.createElement("span", null, "编辑")
								)
							): null, 
							
							React.createElement("a", {className: praiseStatus ? "btn-error" : "btn-success", href: "javascript:void(0)", onClick: _this.handlePraise}, 
								React.createElement("i", {className: "fa fa-thumbs-up", style: {marginRight:'4px'}}), 
								React.createElement("span", {style: {marginRight:'4px'}}, praiseStatus ? '已推荐' : '推荐'), 
								React.createElement("span", null, praise)
							), 
							React.createElement("a", {className: storeStatus ? "btn-error" : "btn-success", href: "javascript:void(0)", onClick: _this.handleStore}, 
								React.createElement("i", {className: "fa fa-bookmark-o", style: {marginRight:'4px'}}), 
								React.createElement("span", {style: {marginRight:'4px'}}, storeStatus ? '已收藏' : '收藏'), 
								React.createElement("span", null, store)
							), 
							React.createElement("a", {className: "btn-success", href: "javascript:void(0)"}, 
								React.createElement("i", {className: "fa fa-share-square-o", style: {marginRight:'4px'}}), 
								React.createElement("span", null, "分享")
							)
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
									React.createElement("a", {className: "more", style: _this.state.next ? {display:'block'} : {display:'none'}, onClick: _this.hamdleMore}, "更多评论")
								)
							)
						)
					)
				)
			);
		}
	});

});