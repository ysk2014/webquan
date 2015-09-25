define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/common/leftNav',
	'home/common/userDropMenu',
	'marked',
    'editormd',
	],function( React, $, WQ, ArticleModel, LeftNav, UserDropMenu, marked, editormd) {


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
						_this.showComment(data.data.id);
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
		showComment: function(aid) {
			var _this = this;
	        ArticleModel.getContentsByAid(aid,function(success,data) {
	        	if(success) {
	        		if(!data.error) {
	        			_this.setState({
	        				commentList: data.data
	        			});
	        		} else {
	        			alert(data.msg);
	        		}
	        	}
	        });
		},
		handleChangeCommnet: function(event) {
			this.setState({
				commentContent: event.target.value
			});
		},
		submitComment: function() {
			var _this = this;
			var aid = this.state.aid;
			var content = this.state.commentContent;
			var uid = WQ.cookie.get('id');

			var data = {aid:aid, uid:uid, content:content};

			ArticleModel.addComment(data,function(success,data) {
				if(success) {
					if(!data.error) {
						var commentList = _this.state.commentList.push({
							id: data.data.id,
							aid: aid,
							uid: uid,
							content: content,
							addtime: data.data.addtime
						});
						_this.setState({
							commentList: commentList
						});
					} else {
						alert(data.msg);
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
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'home',
				aid: this.props.params.id,
				commentList: [],
				commentContent: '',
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
								<div className="html">{marked(d.content)}</div>
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
					<UserDropMenu />
					<LeftNav active={this.state.name} />

					<div className="header">
						<div className="btn-list">
							<a className="btn" href={"/article/edit/"+this.state.aid}>
								<i className="fa fa-pencil-square-o"></i>
							</a>
							<a className="btn">
								<i className="fa fa-bookmark-o"></i>
							</a>
							<a className="btn">
								<i className="fa fa-share-square-o"></i>
							</a>
						</div>
					</div>

					<div className="article-page" style={_this.state.info ? {display:'block'} : {display: 'none'}}>
						<h3 className="title">{title}</h3>
						<div>
							<span className="author">
								<a href="javascript:void(0)">
									<img className="avatar" src="/image/user-default.png" />
									<span className="name">{username}</span>
								</a>
							</span>
							<span className="tag time">&nbsp;•&nbsp;{time}</span>
							<span className="tag cloumn">&nbsp;发布在:&nbsp;{cloumn}</span>
							<span className="tag view">&nbsp;阅读:&nbsp;{view}</span>
							<span className="tag comment">&nbsp;评论:&nbsp;{comment}</span>
						</div>
						
						<div id="editormd-view">
							<textarea></textarea>
						</div>

						<div className="comment-box">
							<div className="hd">评论</div>
							<div className="bd">
								<div className="publish">
									<textarea id="comment-text" placeholder="参与讨论。支持markdown语法" value={this.state.commentContent} onChange={this.handleChangeCommnet}></textarea>
									<div className="comment-submit" onClick={this.submitComment}>发表评论</div>
								</div>
								<div className="comment-list">
									{commentList}
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});

});