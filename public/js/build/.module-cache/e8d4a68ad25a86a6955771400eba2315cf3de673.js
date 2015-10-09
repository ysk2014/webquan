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
			var uid = WQ.cookie.get('id');
			CloumnModel.getCloumnsByUid({uid:uid},function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							cloumns: data.data,
						});
					} else {
						Tooltip(data.msg);
						window.location.href="/cloumn/add";
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
		handleSelectCloumn: function(event) {
			var _this = this;
			_this.state.info.cid
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
					return (React.createElement("option", {key: d.id, value: d.id, onClick: this.handleSelectCloumn}, d.name));
				});
			} else {
				var cloumns = null;
			}
			

			return (
				React.createElement("div", null, 
					React.createElement(UserDropMenu, null), 
					React.createElement(LeftNav, {active: this.state.name}), 
					React.createElement("div", {className: "header"}, 
						React.createElement("span", {className: "desc"}, "写文章"), 
						React.createElement("a", {className: "submit-button", onClick: this.handlePublic}, "发布")
					), 
					React.createElement("div", {className: "edit-article"}, 
						React.createElement("form", null, 
				            React.createElement("div", {className: "input-prepend"}, 
				            	React.createElement("input", {type: "text", name: "title", placeholder: "文章标题", onChange: this.handleChangeTitle, value: _this.state.info.title ? _this.state.info.title : null})
				            ), 
				            React.createElement("div", {className: "input-prepend"}, 
				            	React.createElement("textarea", {name: "description", maxLength: "200", placeholder: "请以200字以内简单描述此内容", onChange: this.handleChangeDesc, value: _this.state.info.description ? _this.state.info.description : null})
				            ), 
				            React.createElement("div", {className: "input-prepend"}, 
				            	React.createElement("select", null, cloumns)
				            ), 
				            React.createElement("div", {className: "tags-list"}, 
				            	React.createElement("i", {className: "fa fa-tag"}), React.createElement("span", null, "增加专题")
				            	
				            ), 
							React.createElement("div", {id: "article-editormd"}, 
								React.createElement("textarea", {onChange: this.handleChangeContent, value: _this.state.info.content ? _this.state.info.content : null})
							)
						)
					)
				)
			);
		}
	});

});