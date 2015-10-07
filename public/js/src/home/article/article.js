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
				next: false,
			}
		},
		componentDidMount: function() {
			this.init();
			$('.header .btn').tooltip();
		},
		render: function() {
			var _this = this;
			var title        = _this.state.info ? _this.state.info.title        : null;
			var username     = _this.state.info ? _this.state.info.username     : null;
			var time         = _this.state.info ? _this.state.info.addtime      : null;
			var cloumn       = _this.state.info ? _this.state.info.cloumnName   : null;
			var view         = _this.state.info ? _this.state.info.view         : null;
			var comment      = _this.state.info ? _this.state.info.comment      : null;
			var praise       = _this.state.info ? _this.state.info.praise       : null;
			var praiseStatus = _this.state.info ? _this.state.info.praiseStatus : null;
			var tags         = _this.state.info ? _this.state.info.tags         : null;

			var commentList = this.state.commentList.length>0 ? this.state.commentList.map(function(d,i) {
				return (
					<div key={d.id} className="comment-item  clearfix" data-id={d.id}>
						<a className="user avatar">
							<img src="/image/user-default.png" />
						</a>
						<div className="comment-right">
							<div className="con">
								<span className="author">
									<a href="javascript:void(0)" >{d.username}</a>
									<div className="hd-time">{WQ.timeFormat(d.addtime)}</div>
								</span>
								<div className="html">{d.content}</div>
							</div>
							<div className="replay">
								<a data-nick={d.username} onClick={_this.handleReplay}>回复</a>
							</div>
						</div>
					</div>
				);
			}) : null;
			return (
				<div>
					<LeftNav active={this.state.name} />


					<div className="article-page" style={_this.state.info ? {display:'block'} : {display: 'none'}}>
						<h3 className="title">{title}</h3>
						<div style={{marginBottom:'10px'}}>
							<span className="author">
								<a href="javascript:void(0)">
									<img className="avatar" src="/image/user-default.png" />
									<span className="name">{username}</span>
								</a>
							</span>
							<span className="tag time">&nbsp;•&nbsp;{WQ.timeFormat(time)}</span>
							<span className="tag">&nbsp;发布在:&nbsp;{cloumn}</span>
							<span className="tag view">&nbsp;阅读:&nbsp;{view}</span>
							<span className="tag comment">&nbsp;评论:&nbsp;{comment}</span>
							<span className="tag">&nbsp;<i className="fa fa-tags"></i>&nbsp;{tags}</span>
						</div>
						<div className="tool" style={{marginBottom:'10px'}}>
							<a className="btn-success" href={"/article/edit/"+this.state.aid}>
								<i className="fa fa-pencil-square-o" style={{marginRight:'4px'}}></i>
								<span>编辑</span>
							</a>
							<a className={praiseStatus ? "btn-error" : "btn-success"} href="javascript:void(0)" onClick={_this.handlePraise}>
								<i className="fa fa-thumbs-up" style={{marginRight:'4px'}}></i>
								<span style={{marginRight:'4px'}}>{praiseStatus ? '已推荐' : '推荐'}</span>
								<span>{praise}</span>
							</a>
							<a className="btn-success" href="javascript:void(0)">
								<i className="fa fa-bookmark-o" style={{marginRight:'4px'}}></i>
								<span style={{marginRight:'4px'}}>收藏</span>
								<span>0</span>
							</a>
							<a className="btn-success" href="javascript:void(0)">
								<i className="fa fa-share-square-o" style={{marginRight:'4px'}}></i>
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
									<div className="comment-submit" onClick={this.submitComment}>发表评论</div>
								</div>
								<div className="comment-list">
									{commentList}
									<a className="more" style={_this.state.next ? {display:'block'} : {display:'none'}} onClick={_this.hamdleMore}>更多评论</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});

});