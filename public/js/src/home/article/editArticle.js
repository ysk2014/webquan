define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/model/articleModel',
	'home/common/leftNav',
	'home/common/userDropMenu',
	'home/common/tooltip',
    'editormd',
    'plugins/image-dialog/image-dialog',
    'plugins/code-block-dialog/code-block-dialog',
    'plugins/link-dialog/link-dialog',
    'plugins/help-dialog/help-dialog',
    'plugins/table-dialog/table-dialog',
    'plugins/test-plugin/test-plugin',
    'plugins/reference-link-dialog/reference-link-dialog',
    'plugins/html-entities-dialog/html-entities-dialog',
    'plugins/preformatted-text-dialog/preformatted-text-dialog',
	],function( React, $, WQ, CloumnModel, ArticleModel, LeftNav, UserDropMenu, Tooltip, editormd) {


	var mixin = {
		init: function() {
			var _this = this;
			CloumnModel.getAllCloumns({way:'addtime'},function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							cloumns: data.data,
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});

			var aid = this.state.aid;
			if(aid>0) {
				ArticleModel.getArticleById(aid,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.setState({
								info: data.data,
								selected: data.data.cid,
							});
							_this.showEditor();
						} else {
							Tooltip(data.msg);
						}
					}
				});
			} else {
				this.showEditor();
			}
			return this;
		},
		showEditor: function(){
			var _this = this;
			var content = _this.state.info.content ? _this.state.info.content : null;
	        var testEditor = editormd("article-editormd", {
                width   : "100%",
                height  : 640,
                markdown : content,
                imageUpload: 'true',
                imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "/upload",
                path    : "/js/lib/editor/lib/",
                toolbarIcons: function() {
                    return [
                        "undo", "redo", "clear", "|", 
                        "bold", "italic", "quote", "uppercase", "lowercase", "|", 
                        "h1", "h2", "h3", "h4", "h5", "h6", "|", 
                        "list-ul", "list-ol", "hr", "|",
                        "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "|",
                        "watch", "preview", "fullscreen", "help"
                    ];
                },
                onchange: function() {
                	_this.state.info.content = this.getValue();
                	_this.setState({
                		info: _this.state.info
                	});
                }
	        });
	        return this;
		},
		handleSelect: function(event) {
			var cid = $('.edit-article .tag').eq(event).data('cid');
			this.state.info.cid = cid;
			this.setState({
				selected: cid,
				info: this.state.info
			});
		},
		handleChangeTitle: function(event) {
			// if(event.target.value == '') return false;
			this.state.info.title = event.target.value;
			this.setState({
				info: this.state.info
			});
		},
		handleChangeDesc: function(event) {
			this.state.info.description = event.target.value;
			this.setState({
				info: this.state.info
			});
		},
		handlePublic: function() {
			var info = this.state.info;
			var aid = this.state.aid;
			if(aid>0) {
				ArticleModel.editArticle(info,function(success,data) {
					if(success) {
						if(!data.error) {
							window.location.href = '/article/'+aid;
						} else {
							Tooltip(data.msg);
						}
					}
				});
			} else {
				ArticleModel.addArticle(info,function(success,data) {
					if(success) {
						if(!data.error) {
							window.location.href = '/article/'+data.data;
						} else {
							Tooltip(data.msg);
						}
					}
				});	
			}
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			var uid = WQ.cookie.get('id');
			return {
				name: 'editArticle',
				aid: this.props.params.id ? this.props.params.id : 0,
				info: {uid:uid},
				selected: -1,
				cloumns: []
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			if(this.state.cloumns.length>0) {
				var cloumns = _this.state.cloumns.map(function(d,i) {
					return (<span key={d.id} data-cid={d.id} className={(_this.state.selected===d.id) ? "tag selected" : "tag"} onClick={this.handleSelect.bind(this,i)}>{d.title}</span>);
				}.bind(this));
			} else {
				var cloumns = null;
			}
			

			return (
				<div>
					<UserDropMenu />
					<LeftNav active={this.state.name} />
					<div className="header">
						<span className="desc">发布文章</span>
						<a className="submit-button" onClick={this.handlePublic}>发布</a>
					</div>
					<div className="edit-article">
						<form>
				            <div className="input-prepend">
				            	<input type="text" name="title" placeholder="文章标题" onChange={this.handleChangeTitle} value={_this.state.info.title ? _this.state.info.title : null} />
				            </div>
				            <div className="input-prepend">
				            	<textarea name="description" maxLength="200" placeholder="请以200字以内简单描述此内容" onChange={this.handleChangeDesc} value={_this.state.info.description ? _this.state.info.description : null}></textarea>
				            </div>
				            <div className="tags-list">
				            	<i className="fa fa-tag"></i><span>增加专题</span>
				            	{cloumns}
				            </div>
							<div id="article-editormd">
								<textarea onChange={this.handleChangeContent} value={_this.state.info.content ? _this.state.info.content : null}></textarea>
							</div>
						</form>
					</div>
				</div>
			);
		}
	});

});