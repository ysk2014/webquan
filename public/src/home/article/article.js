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
						if(!data.error) return;
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
			if(content.indexOf('@')==0) {
				var data = {aid:aid, uid:uid, content:content, receive_id:_this.state.receive_id};
			} else {
				var data = {aid:aid, uid:uid, content:content, receive_id:_this.state.info.uid};
			}

			ArticleModel.addComment(data,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.state.commentList.push({
							id: data.data.id,
							aid: aid,
							uid: uid,
							username: username,
							content: content,
							userUrl: userUrl,
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
			var receive_id = $(event.target).data('uid');
			this.setState({
				commentContent: '@' + nick + ' ',
				receive_id: receive_id
			});
			$('#comment-text').focus();
		},
		// 删除评论
		handleDelComment: function(event) {
			var _this = this;
			var cid = $(event.target).data('id');
			var key = $(event.target).data('key');
			ArticleModel.delComment({aid:_this.state.aid,cid:cid},function(success,data) {
				if(success) {
					if(!data.error) {
						_this.state.commentList.splice(key,1);
						_this.state.info.comment = parseInt(_this.state.info.comment)-1;
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
				receive_id: 0,
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
						return (<a style={{marginRight:'6px',color:'#3da9f7'}} href={'/t/'+t}>{t}</a>);
					});
				} else {
					var tagsList = (<a href={'/t/'+tags}>{tags}</a>);
				}
				tagsList = (<span className="tag">&nbsp;<i className="fa fa-tags"></i>&nbsp;{tagsList}</span>);
			} else {
				var tagsList = null;
			}

			var commentList = this.state.commentList.length>0 ? this.state.commentList.map(function(d,i) {
				return (
					<div key={i} id={"comment-"+d.id} className="comment-item  clearfix" data-id={d.id}>
						<a className="user avatar" href={"/user/"+d.uid}>
							<img src={d.userUrl ? d.userUrl : "/image/user-default.png"} />
						</a>
						<div className="comment-right">
							<div className="con">
								<span className="author">
									<a href={"/user/"+d.uid} >{d.username}</a>
									<div className="hd-time">{WQ.timeFormat(d.addtime)}</div>
								</span>
								<div className="html">{d.content}</div>
							</div>
							<div className="replay">
								<a data-nick={d.username} data-uid={d.uid} onClick={_this.handleReplay}>回复</a>
								{
									uid == WQ.cookie.get('id') ? <a data-id={d.id} data-key={i} onClick={_this.handleDelComment}>删除</a> : null
								}
							</div>
						</div>
					</div>
				);
			}) : null;

			return (
				<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true}>
					<div className="article-page" style={_this.state.info ? {display:'block'} : {display: 'none'}}>
						<h3 className="title">{title}</h3>
						<div style={{marginBottom:'10px'}}>
							<span className="author">
								<a href={"/user/"+uid}>
									<img className="avatar" src={userUrl ? userUrl : "/image/user-default.png"} />
									<span className="name">{username}</span>
								</a>
							</span>
							<span className="tag time">&nbsp;•&nbsp;{WQ.timeFormat(time)}</span>
							<span className="tag">&nbsp;发布在:&nbsp;{cloumn}</span>
							<span className="tag view">&nbsp;阅读:&nbsp;{view}</span>
							<span className="tag comment">&nbsp;评论:&nbsp;{comment}</span>
							{tagsList}
						</div>
						<div className="tool" style={{marginBottom:'10px'}}>
							{_this.state.uid==uid ? (
								<a className="btn btn-info" href={"/article/"+this.state.aid+"/edit"}>
									<i className="fa fa-pencil-square-o"></i>
									<span>编辑</span>
								</a>
							): null}
							
							<a className={praiseStatus ? "btn btn-danger" : "btn btn-info"} href="javascript:void(0)" onClick={_this.handlePraise}>
								<i className="fa fa-thumbs-up"></i>
								<span style={{marginRight:'4px'}}>{praiseStatus ? '已推荐' : '推荐'}</span>
								<span>{praise}</span>
							</a>
							<a className={storeStatus ? "btn btn-danger" : "btn btn-info"} href="javascript:void(0)" onClick={_this.handleStore}>
								<i className="fa fa-bookmark-o"></i>
								<span style={{marginRight:'4px'}}>{storeStatus ? '已收藏' : '收藏'}</span>
								<span>{store}</span>
							</a>
							<a className="btn btn-info" href="javascript:void(0)">
								<i className="fa fa-share-square-o"></i>
								<span>分享</span>
							</a>
						</div>
						
						<div id="editormd-view">
							<textarea></textarea>
						</div>

						<div className="comment-box">
							<div className="hd">评论</div>
							<div className="bd">
								<div className="publish">
									<textarea id="comment-text" placeholder="参与讨论" value={this.state.commentContent} onChange={this.handleChangeCommnet}></textarea>
									<a className="btn btn-default" href="javascript:void(0)" style={{display:'inline-block',margin:'10px 0'}} onClick={this.submitComment}>发表评论</a>
								</div>
								<ReactCSSTransitionGroup transitionName="fadeToTop" transitionAppear={true}>
									<div className="comment-list">
										{commentList}
										<a className="btn btn-default btn-large" href="javascript:void(0)" style={_this.state.next ? {display:'block',margin:'20px auto'} : {display:'none',margin:'20px auto'}} onClick={_this.hamdleMore}>更多评论</a>
									</div>
								</ReactCSSTransitionGroup>
							</div>
						</div>
					</div>
				</ReactCSSTransitionGroup>
			);
		}
	});

});