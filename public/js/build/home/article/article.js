define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/model/userModel',
	'home/common/tooltip',
    'editormd',
	],function( React, $, WQ, ArticleModel, UserModel, Tooltip, editormd) {

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
						_this.showComment(data.data.id,0,true);
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
			var content = WQ.trim(this.state.commentContent);
			var uid = WQ.cookie.get('id');
			var username = WQ.cookie.get('username');
			var userUrl = WQ.cookie.get('userUrl');

			if(!uid) {
				window.location.href="/login/sign_in?page=article&&method="+aid;
				return;
			}
			if(content.indexOf('@')==0 && content.indexOf(':')>0) {
				var content_data = content.split(':');
				content_data[0] = '';
				content = content_data.join('');
				var data = {aid:aid, uid:uid, content:content, fid:_this.state.fid, pid:_this.state.pid, receive_id:_this.state.receive_id};
			} else {
				_this.setState({
					fid: 0,
				});
				var data = {aid:aid, uid:uid, content:content, receive_id:_this.state.info.uid};
			}

			ArticleModel.addComment(data,function(success,data) {
				if(success) {
					if(!data.error) {
						if(_this.state.fid==0) {
							_this.state.commentList.push({
								id: data.data.id,
								aid: aid,
								uid: uid,
								username: username,
								content: content,
								userUrl: userUrl,
								addtime: data.data.addtime,
								fid: 0
							});
						} else {
							if(!_this.state.commentList[_this.state.comment_index]['children']) {
								_this.state.commentList[_this.state.comment_index]['children'] = [];
							} 
							_this.state.commentList[_this.state.comment_index]['children'].push({
								id: data.data.id,
								aid: aid,
								uid: uid,
								username: username,
								content: content,
								userUrl: userUrl,
								addtime: data.data.addtime,
								fid: _this.state.fid,
								pid: _this.state.pid
							});
						}
						_this.state.info.comment = parseInt(_this.state.info.comment)+1;
						_this.setState({
							commentList: _this.state.commentList,
							commentContent: '',
							info: _this.state.info,
							fid: 0,
							pid: 0,
							comment_index: 0
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
		// 回复评论
		handleReplay: function(event) {
			var ele = $(event.target).parent();
			var nick = ele.data('nick');
			var receive_id = ele.data('uid');
			var fid = parseInt(ele.data('fid')) ? ele.data('fid') : ele.data('id');
			var pid = ele.data('id');
			var comment_index = ele.data('index');

			this.setState({
				commentContent: '@' + nick + ': ',
				receive_id: receive_id,
				fid: fid,
				pid: pid,
				comment_index: comment_index
			});
			$('#comment-text').focus();
		},
		// 删除评论
		handleDelComment: function(event) {
			var _this = this;
			var ele = $(event.target).parent();
			var cid = ele.data('id');
			var index = ele.data('index');
			var key = ele.data('key');
			var fid = parseInt(ele.data('fid'));
			var cids = [];

			if(fid==0 && key==index) {
				if(_this.state.commentList[index]['children']) {
					cids = _this.state.commentList[index]['children'].map(function(m) {
						return m['id'];
					});
				}
				cids.push(cid);
			} else {
				var children = _this.state.commentList[index]['children'];
				for (var i = key; i < children.length; i++) {
					if(children[i]['fid']!=children[i]['pid']) {
						cids.push(children[i]['id']);
					}
				};
			}

			ArticleModel.delComment({aid:_this.state.aid,cids:cids},function(success,data) {
				if(success) {
					if(!data.error) {
						if(fid==0 && key==index) {
							_this.state.commentList.splice(key,1);
						} else {
							_this.state.commentList[index]['children'].splice(key);
						}
						
						_this.state.info.comment = parseInt(_this.state.info.comment)-cids.length;
						_this.setState({
							commentList: _this.state.commentList,
							info: _this.state.info
						});
						Tooltip(data.msg);
					}
				}
			});
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
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'home',
				aid: this.props.aid,         //文章id
				newsId: this.props.params&&this.props.params.news ? this.props.params.news : 0,    //消息id
				commentList: [],             //评论数据
				commentContent: '',          //要评论的内容
				page: 0,					 //评论分页
				next: false,                 //是否还有下一页
				uid: null,                   //用户id
				receive_id: 0,               //通知id
				fid: 0,                      //第一级评论标志的缓存
				pid: 0,                      //评论父级id的缓存
				comment_index: 0,            //评论第几个的标记缓存
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

			var commentList = this.state.commentList.length>0 ? this.state.commentList.map(function(d,i) {

				var children = d['children'] ? d['children'].map(function(m,n) {
					
					if(m.fid==m.pid && m.pid==d.id) {
						var replay_user_id = d.uid;
						var replay_user_name = d.username;
					} else {
						var replay_user_id, replay_user_name;
						for(var ins=0; ins<d['children'].length; ins++) {
							if(m.pid==d['children'][ins]['id']) {
								replay_user_id = d['children'][ins]['uid'];
								replay_user_name = d['children'][ins]['username'];
							}
						}
					}

					return (
						React.createElement("div", {key: n, id: "comment-"+m.id, className: "children-item", "data-id": m.id}, 
							React.createElement("div", {className: "con"}, 
								React.createElement("span", {className: "author"}, 
									React.createElement("a", {href: "/user/"+m.uid}, m.username + ': '), "  ", 
									replay_user_id ? (React.createElement("a", {href: "/user/"+replay_user_id}, '@' + replay_user_name)) : null, "  ", 
									React.createElement("span", {className: "html"}, m.content)
								), 
								React.createElement("div", {className: "hd-time"}, WQ.timeFormat(m.addtime))
							), 
							React.createElement("div", {className: "replay", "data-nick": m.username, "data-index": i, "data-uid": m.uid, "data-fid": d.id, "data-id": m.id, "data-key": n, "data-pid": m.pid}, 
								React.createElement("a", {onClick: _this.handleReplay}, "回复"), 
								
									m.uid == WQ.cookie.get('id') ? React.createElement("a", {onClick: _this.handleDelComment}, "删除") : null
								
							)
						)
					)
				}) : null;

				return (
					React.createElement("div", {key: i, id: "comment-"+d.id, className: "comment-item  clearfix", "data-id": d.id}, 
						React.createElement("a", {className: "user avatar", href: "/user/"+d.uid}, 
							React.createElement("img", {src: d.userUrl ? d.userUrl : "/image/user-default.png"})
						), 
						React.createElement("div", {className: "comment-right"}, 
							React.createElement("div", {className: "con"}, 
								React.createElement("span", {className: "author"}, 
									React.createElement("a", {href: "/user/"+d.uid}, d.username), 
									React.createElement("div", {className: "hd-time"}, WQ.timeFormat(d.addtime))
								), 
								React.createElement("div", {className: "html"}, d.content)
							), 
							React.createElement("div", {className: "replay", "data-nick": d.username, "data-index": i, "data-uid": d.uid, "data-fid": d.fid, "data-pid": d.pid, "data-id": d.id, "data-key": i}, 
								React.createElement("a", {onClick: _this.handleReplay}, "回复"), 
								
									d.uid == WQ.cookie.get('id') ? React.createElement("a", {onClick: _this.handleDelComment}, "删除") : null
								
							)
						), 
						React.createElement("div", {style: {'clear':'both'}}), 
						children
					)
				);

			}) : null;

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

						React.createElement("div", {className: "comment-box"}, 
							React.createElement("div", {className: "hd"}, "评论"), 
							React.createElement("div", {className: "bd"}, 
								React.createElement("div", {className: "publish"}, 
									React.createElement("textarea", {id: "comment-text", placeholder: "参与讨论", value: this.state.commentContent, onChange: this.handleChangeCommnet}), 
									React.createElement("a", {className: "btn btn-default", href: "javascript:void(0)", style: {display:'inline-block',margin:'10px 0'}, onClick: this.submitComment}, "发表评论")
								), 
								React.createElement(ReactCSSTransitionGroup, {transitionName: "fadeToTop", transitionAppear: true}, 
									React.createElement("div", {className: "comment-list"}, 
										commentList, 
										React.createElement("a", {className: "btn btn-default btn-large", href: "javascript:void(0)", style: _this.state.next ? {display:'block',margin:'20px auto'} : {display:'none',margin:'20px auto'}, onClick: _this.hamdleMore}, "更多评论")
									)
								)
							)
						)
					)
				)
			);
		}
	});

});