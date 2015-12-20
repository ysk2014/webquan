define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/model/userModel',
	'home/common/tooltip',
	],function( React, $, WQ, ArticleModel, UserModel, Tooltip) {



		var mixin = {
			componentDidMount: function() {
				var _this = this;
				_this.showComment(0,true);
			},
			componentWillReceiveProps: function(nextProps) {
				var _this = this;
				_this.setState({
					aid: nextProps.aid,
					author: nextProps.author
				});
			},
			// 获取评论
			showComment: function(page,first) {
				var _this = this;
				var aid = _this.state.aid;
		        ArticleModel.getContentsByAid({aid:aid,page:page},function(data) {
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
					var data = {aid:aid, uid:uid, content:content, receive_id:_this.state.author};
				}

				ArticleModel.addComment(data,function(data) {
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
						_this.props.updateComment(1);
						// _this.state.info.comment = parseInt(_this.state.info.comment)+1;
						_this.setState({
							commentList: _this.state.commentList,
							commentContent: '',
							fid: 0,
							pid: 0,
							comment_index: 0
						});
					} else {
						Tooltip(data.msg);
					}
				});
			},
			// 回复评论
			handleReplay: function(event) {
				var ele = $(event.target).parent();
				var nick = ele.data('nick');
				var receive_id = ele.data('uid');
				var fid = parseInt(ele.data('fid')) ? ele.data('fid') : ele.data('cid');
				var pid = ele.data('cid');
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
				var cid = ele.data('cid');
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

				ArticleModel.delComment({aid:_this.state.aid,cids:cids},function(data) {
					if(!data.error) {
						if(fid==0 && key==index) {
							_this.state.commentList.splice(key,1);
						} else {
							_this.state.commentList[index]['children'].splice(key);
						}
						_this.props.updateComment(-cids.length);
						// _this.state.info.comment = parseInt(_this.state.info.comment)-cids.length;
						_this.setState({
							commentList: _this.state.commentList,
						});
						Tooltip(data.msg);
					}
				});
			},
			// 获取更多评论
			hamdleMore: function() {
				var _this = this;
				var page = _this.state.page;
				_this.showComment(page);
			},
		};


		return React.createClass({
			mixins: [mixin],
			getInitialState: function() {
				var _this = this;
				return {
					aid: _this.props.aid,         //文章id
					author: _this.props.author,   //文章作者id
					commentContent: '',          //要评论的内容
					page: 0,					 //评论分页
					next: false,                 //是否还有下一页
					commentList: [],
					receive_id: 0,               //通知id
					fid: 0,                      //第一级评论标志的缓存
					pid: 0,                      //评论父级id的缓存
					comment_index: 0,            //评论第几个的标记缓存
				};
			},
			render: function() {
				var _this = this;

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
							React.createElement("div", {key: n, id: "comment-"+m.id, className: "children-item", "data-cid": m.id}, 
								React.createElement("div", {className: "con"}, 
									React.createElement("span", {className: "author"}, 
										React.createElement("a", {href: "/user/"+m.uid}, m.username + ': '), "  ", 
										replay_user_id ? (React.createElement("a", {href: "/user/"+replay_user_id}, '@' + replay_user_name)) : null, "  ", 
										React.createElement("span", {className: "html"}, m.content)
									), 
									React.createElement("div", {className: "hd-time"}, WQ.timeFormat(m.addtime))
								), 
								React.createElement("div", {className: "replay", "data-nick": m.username, "data-index": i, "data-uid": m.uid, "data-fid": d.id, "data-cid": m.id, "data-key": n, "data-pid": m.pid}, 
									React.createElement("a", {onClick: _this.handleReplay}, "回复"), 
									
										m.uid == WQ.cookie.get('id') ? React.createElement("a", {onClick: _this.handleDelComment}, "删除") : null
									
								)
							)
						)
					}) : null;

					return (
						React.createElement("div", {key: i, id: "comment-"+d.id, className: "comment-item  clearfix", "data-cid": d.id}, 
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
								React.createElement("div", {className: "replay", "data-nick": d.username, "data-index": i, "data-uid": d.uid, "data-fid": d.fid, "data-pid": d.pid, "data-cid": d.id, "data-key": i}, 
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
					
					React.createElement("div", {className: "comment-box"}, 
						React.createElement("div", {className: "hd"}, "评论"), 
						React.createElement("div", {className: "bd"}, 
							React.createElement("div", {className: "publish"}, 
								React.createElement("textarea", {id: "comment-text", placeholder: "参与讨论", value: this.state.commentContent, onChange: this.handleChangeCommnet}), 
								React.createElement("a", {className: "btn btn-default", href: "javascript:void(0)", style: {display:'inline-block',margin:'10px 0'}, onClick: this.submitComment}, "发表评论")
							), 
							React.createElement("div", {className: "comment-list"}, 
								commentList, 
								React.createElement("a", {className: "btn btn-default btn-large", href: "javascript:void(0)", style: _this.state.next ? {display:'block',margin:'20px auto'} : {display:'none',margin:'20px auto'}, onClick: _this.hamdleMore}, "更多评论")
							)
						)
					)
				);
			}
		});
	}
);