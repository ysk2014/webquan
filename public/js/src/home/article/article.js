define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/common/leftNav',
	'home/common/userDropMenu',
    'editormd',
    'plugins/image-dialog/image-dialog',
    'plugins/code-block-dialog/code-block-dialog',
    'plugins/link-dialog/link-dialog',
    'plugins/table-dialog/table-dialog',
    'plugins/test-plugin/test-plugin',
	],function( React, $, WQ, ArticleModel, LeftNav, UserDropMenu, editormd) {


	var mixin = {
		init: function() {
			var _this = this;
			var aid = _this.state.aid;
			ArticleModel.getArticleById(aid,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data.data);
						_this.setState({
							info: data.data,
						});
						_this.showEditor(data.data.content);
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
		showComment: function() {
	        var commentEditor = editormd("editormd-comment", {
                width   : "100%",
                height  : 200,
                // markdown : content,
                imageUpload: 'true',
                imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "/upload",
                path    : "/js/lib/editor/lib/",
                toolbarIcons: function() {
                    return [
                        "clear", "bold", "italic", "quote", "h4", "|", 
                        "list-ul", "list-ol","|",
                        "link", "image", "code", "code-block", "table", "|",
                        "watch", "preview", "fullscreen"
                    ];
                },
                onchange: function() {
                	_this.state.commentContent = this.getValue();
                	_this.setState({
                		commentContent: _this.state.commentContent
                	});
                }
	        });
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'home',
				aid: this.props.params.id,
				commentList: [],
				commentContent: ''
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

						<div id="editormd-comment">
							<textarea></textarea>
						</div>
					</div>
				</div>
			);
		}
	});

});