define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/model/userModel',
	'home/common/tooltip',
	'home/article/comment',
    'editormd',
	],function( React, $, WQ, ArticleModel, UserModel, Tooltip, CommentList, editormd) {

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
						console.log(data);
						_this.setState({
							info: data.data,
						});
						_this.showEditor(data.data.content);
					}
				}
			});

			//如果是从消息页面跳转过来的，就把消息设置为已读
			if(_this.state.newsId!=0) {
				UserModel.updateNews({id:_this.state.newsId},function(success,data) {
					if(success) {
						if(!data.error) {
							$('.drop-menu .news').remove();
							return;
						} 
					}
				});
			}
			return this;
		},
		// 把文章内容markdown数据转化成html
		showEditor: function(markdown){
			var _this = this;
	        var testEditor = editormd.markdownToHTML("editormd-view", {
                markdown        : markdown ,
                tocm            : true,
	        });
	        $('#editormd-view a').attr('target','_blank');
		},
		// 推荐处理
		handlePraise: function(event) {
			var _this = this;
			var aid = _this.state.aid;

			if(!WQ.cookie.get('id')) {
				window.location.href="/login/sign_in?page=article&&method="+aid;
				return;
			}

			if(event.target.tagName.toLowerCase()=='a') {
				var ele = $(event.target);
			} else {
				var ele = $(event.target).parent();
			}
			var params = {aid: _this.state.aid, uid: WQ.cookie.get('id'), author_id: this.state.info.uid};
			if(ele.hasClass('btn-info')) {
				ArticleModel.addPraise(params,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.info.praise = parseInt(_this.state.info.praise)+1;
							_this.state.info.praiseStatus = !_this.state.info.praiseStatus;
							_this.setState({
								info: _this.state.info
							}); 
							ele.addClass('btn-danger').removeClass('btn-info');
						} else {
							Tooltip(data.msg);
						}
					}
				});
			} else if(ele.hasClass('btn-danger')) {
				ArticleModel.delPraise(params,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.info.praise = parseInt(_this.state.info.praise)-1;
							_this.state.info.praiseStatus = !_this.state.info.praiseStatus;
							_this.setState({
								info: _this.state.info
							});
							ele.addClass('btn-info').removeClass('btn-danger');
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
			var aid = _this.state.aid;

			if(!WQ.cookie.get('id')) {
				window.location.href="/login/sign_in?page=article&&method="+aid;
				return;
			}

			if(event.target.tagName.toLowerCase()=='a') {
				var ele = $(event.target);
			} else {
				var ele = $(event.target).parent();
			}
			var params = {aid: _this.state.aid,uid: WQ.cookie.get('id'), author_id: this.state.info.uid};
			if(ele.hasClass('btn-info')) {
				ArticleModel.addStore(params,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.info.store = parseInt(_this.state.info.store)+1;
							_this.state.info.storeStatus = !_this.state.info.storeStatus;
							_this.setState({
								info: _this.state.info
							}); 
							ele.addClass('btn-danger').removeClass('btn-info');
						} else {
							Tooltip(data.msg);
						}
					}
				});
			} else if(ele.hasClass('btn-danger')) {
				ArticleModel.delStore(params,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.info.store = parseInt(_this.state.info.store)-1;
							_this.state.info.storeStatus = !_this.state.info.storeStatus;
							_this.setState({
								info: _this.state.info
							});
							ele.addClass('btn-info').removeClass('btn-danger');
						} else {
							Tooltip(data.msg);
						}
					}
				});
			}
		},
		updateComment: function(num) {
			var _this = this;
			_this.state.info.comment = parseInt(_this.state.info.comment)+num;
			_this.setState({
				info: _this.state.info
			});
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'home',
				aid: this.props.aid,         //文章id
				newsId: this.props.params&&this.props.params.news ? this.props.params.news : 0,    //消息id
				uid: null,                   //用户id
			}
		},
		componentDidMount: function() {
			this.init();
			var aid = this.state.aid;
			$('#comment-text').on('focus',function() {
				if(!WQ.cookie.get('id')) {
					window.location.href="/login/sign_in?page=article&&method="+aid;
					return;
				};
			});
		},
		render: function() {
			var _this = this;
			var title        = _this.state.info ? _this.state.info.title        : null;     //文章标题
			var username     = _this.state.info ? _this.state.info.username     : null;     //作者
			var uid          = _this.state.info ? _this.state.info.uid          : null;     //作者id
			var userUrl      = _this.state.info ? _this.state.info.userUrl      : null;     //作者头像
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

			return (
				React.createElement(ReactCSSTransitionGroup, {transitionName: "fade", transitionAppear: true}, 
					React.createElement("div", {className: "article-page", style: _this.state.info ? {display:'block'} : {display: 'none'}}, 
						React.createElement("h3", {className: "title"}, title), 
						React.createElement("div", {style: {marginBottom:'10px'}}, 
							React.createElement("span", {className: "author"}, 
								React.createElement("a", {href: "/user/"+uid}, 
									React.createElement("img", {className: "avatar", src: userUrl ? userUrl : "/image/user-default.png"}), 
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
								React.createElement("a", {className: "btn btn-info", href: "/article/"+this.state.aid+"/edit"}, 
									React.createElement("i", {className: "fa fa-pencil-square-o"}), 
									React.createElement("span", null, "编辑")
								)
							): null, 
							
							React.createElement("a", {className: praiseStatus ? "btn btn-danger" : "btn btn-info", href: "javascript:void(0)", onClick: _this.handlePraise}, 
								React.createElement("i", {className: "fa fa-thumbs-up"}), 
								React.createElement("span", {style: {marginRight:'4px'}}, praiseStatus ? '已推荐' : '推荐'), 
								React.createElement("span", null, praise)
							), 
							React.createElement("a", {className: storeStatus ? "btn btn-danger" : "btn btn-info", href: "javascript:void(0)", onClick: _this.handleStore}, 
								React.createElement("i", {className: "fa fa-bookmark-o"}), 
								React.createElement("span", {style: {marginRight:'4px'}}, storeStatus ? '已收藏' : '收藏'), 
								React.createElement("span", null, store)
							), 
							React.createElement("a", {className: "btn btn-info", href: "javascript:void(0)"}, 
								React.createElement("i", {className: "fa fa-share-square-o"}), 
								React.createElement("span", null, "分享")
							)
						), 
						
						React.createElement("div", {id: "editormd-view"}, 
							React.createElement("textarea", null)
						), 

						
						React.createElement(CommentList, {updateComment: _this.updateComment, aid: _this.state.aid, author: uid})
								
					)
				)
			);
		}
	});

});