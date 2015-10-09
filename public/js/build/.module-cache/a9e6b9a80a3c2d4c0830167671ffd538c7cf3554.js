define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/model/articleModel',
	'home/common/leftNav',
	'home/common/userDropMenu',
	'home/common/tooltip',
	'home/common/dialog',
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
	],function( React, $, WQ, CloumnModel, ArticleModel, LeftNav, UserDropMenu, Tooltip, Dialog, editormd) {


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
			_this.state.info.cid = event.target.value;
			_this.setState({
				info: _this.state.info
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
				cloumns: [],
				tags: [],
				cacheTags: [],
				timer: null,
			}
		},
		componentDidMount: function() {
			this.init();
		},
		getFocus: function(event) {
			$(event.target).find('input').focus();
		},
		dealTags: function(event) {
			var _this = this;
			var ele = $(event.target);
			
			ele.on('blur',function() {
				setTimeout(function(){
					ele.val('').siblings('ul').hide();
				},100);
			});

			setTimeout(function(){
				if(ele.val().length!=0){
					ele.siblings('ul').show();
				} else {
					ele.siblings('ul').hide();
				}	
			},300);
			
			
			if((event.which==13 || event.which==32) && WQ.trim(event.target.value)!='') {
				
				if(_this.state.tags.length>2 || WQ.inArray(ele.val(),_this.state.tags)) {
					ele.val('');
					return;
				}
				ele.before('<span class="tag selected">'+WQ.trim(event.target.value)+'<span class="remove">x</span></span>');
				_this.state.tags.push(WQ.trim(ele.val()));
				_this.setState({
					tags: _this.state.tags
				});
				ele.val('');
				ele.siblings('.selected').find('.remove').on('click',function() {
					var index = $(this).parent().index();
					_this.state.tags.splice(index,1);
					$(this).parent().remove();
				});
			} else if(event.which==8 && WQ.trim(event.target.value)=='') {
				ele.prev('.tag').remove();
				_this.state.tags.pop();
				_this.setState({
					tags: _this.state.tags
				});
			} else {
				clearTimeout(_this.state.timer);
				var timer = setTimeout(function(){
					ArticleModel.getAllTags(WQ.trim(ele.val()),function(success,data) {
						if(success) {
							if(!data.error) {
								_this.setState({
									cacheTags: data.data
								});
							}
						}
					});
				},200);
				_this.setState({
					timer: timer
				});
			}

		},
		dialogShow: function(event) {
			event.stopPropagation();
			event.pre
			Dialog('ds');
		},
		render: function() {
			var _this = this;

			if(this.state.cloumns.length>0) {
				var cloumns = _this.state.cloumns.map(function(d,i) {
					return (React.createElement("option", {key: d.id, value: d.id}, d.name));
				});
			} else {
				var cloumns = null;
			}

			var tags = _this.state.cacheTags.length>0 ? _this.state.cacheTags.map(function(tag,i) {
				if(i==0) {
					return (React.createElement("li", {className: "active"}, React.createElement("a", null, "d.name")));
				} else {
					return (React.createElement("li", null, "d.name"));
				}
				
			}) : null;
			

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
				            	React.createElement("select", {onChange: _this.handleSelectCloumn}, cloumns)
				            ), 
				            React.createElement("div", {className: "tags-list", onClick: _this.getFocus}, 
				            	React.createElement("i", {className: "fa fa-tag"}), React.createElement("span", null, "增加标签"), 
				            	React.createElement("input", {type: "text", placeholder: "如：php", onKeyDown: _this.dealTags}), 
				            	React.createElement("ul", null, tags, React.createElement("li", {style: _this.state.cacheTags.length>4 ? {display:'none'} : {display:'block'}, onClick: _this.dialogShow}, React.createElement("a", null, "创建标签")))
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