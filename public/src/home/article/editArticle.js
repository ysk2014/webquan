define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/model/articleModel',
	'home/common/tooltip',
	'home/common/dialog',
    'editormd',
	],function( React, $, WQ, CloumnModel, ArticleModel, Tooltip, Dialog, editormd) {

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	var mixin = {
		init: function() {
			var _this = this;
			var uid = WQ.cookie.get('id');
			//获取专题列表
			CloumnModel.getCloumnsByUid({uid:uid},function(data) {
				if(!data.error) {
					_this.state.info.cid = data.data[0]['id'];
					_this.setState({
						cloumns: data.data,
						info: _this.state.info
					});
				} else {
					Tooltip(data.msg);
					window.location.href="/cloumn/add";
				}
			});
			//判断是添加文章，还是编辑文章，如果是编辑文章，获取文章数据并把文章内容赋值到markdown编辑器里
			var aid = this.state.aid;
			if(aid>0) {
				ArticleModel.getArticleById(aid,function(data) {
					if(!data.error) {
						if(data.data.tags.indexOf('|')) {
							_this.state.tags = data.data.tags.split('|');
						} else {
							_this.state.tags = data.data.tags;
						}
						_this.setState({
							info: data.data,
							tags: _this.state.tags,
							selected: data.data.cid,
						});
						_this.showEditor();
					} else {
						Tooltip(data.msg);
					}
				});
			} else {
				this.showEditor();
			}
			return this;
		},
		// 展示文章内容
		showEditor: function(uid){
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
                        "link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "|",
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
		// 获取选择的专题
		handleSelectCloumn: function(event) {
			var _this = this;
			_this.state.info.cid = event.target.value;
			_this.setState({
				info: _this.state.info
			});
		},
		// 编辑文章标题
		handleChangeTitle: function(event) {
			this.state.info.title = event.target.value;
			this.setState({
				info: this.state.info
			});
		},
		// 编辑文章描述
		handleChangeDesc: function(event) {
			this.state.info.description = event.target.value;
			this.setState({
				info: this.state.info
			});
		},
		// 发布文章
		handlePublic: function(event) {
			var _this = this;
			var publish = $(event.target).data('publish');
			this.state.info.tags = _this.state.tags.join('|');
			_this.state.info.is_publish = publish;
			_this.setState({
				info: _this.state.info
			});

			var info = _this.state.info;
			var aid = this.state.aid;

			if(aid>0) {
				ArticleModel.editArticle(info,function(data) {
					if(!data.error) {
						window.location.href = '/article/'+aid;
					} else {
						Tooltip(data.msg);
					}
				});
			} else {
				ArticleModel.addArticle(info,function(data) {
					if(!data.error) {
						window.location.href = '/article/'+data.data;
					} else {
						Tooltip(data.msg);
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
				aid: this.props.aid ? this.props.aid : 0,  //文章id，如果是添加则为0
				info: {uid:uid,is_publish:0}, //发布文章的数据
				selected: this.props.params && this.props.params['cloumn'] ? this.props.params['cloumn'] : -1, 
				cloumns: [],     //专题列表
				tags: [],        //已选择的标签
				cacheTags: [],   //从数据库里调出的标签数据
				inputTag: '',    //标签输入框的数据
				timer: null,     //定时调用数据库的标签数据
			}
		},
		componentDidMount: function() {
			this.init();
		},
		// 编辑标签
		tagChange: function(event) {
			var _this = this;
			_this.setState({
				inputTag: event.target.value
			});
		},
		// 标签获取焦点
		getFocus: function(event) {
			$(event.target).find('input').focus();
		},
		// 处理标签
		dealTags: function(event) {
			var _this = this;
			var ele = $(event.target);
			
			ele.on('blur',function() {
				setTimeout(function(){
					_this.setState({
						inputTag: '',
					});
					ele.siblings('ul').hide();
				},200);
			});

			setTimeout(function(){
				if(_this.state.inputTag.length!=0){
					ele.siblings('ul').show();
				} else {
					ele.siblings('ul').hide();
				}	
			},300);
			
			
			if(event.which==8 && WQ.trim(event.target.value)=='') {
				ele.prev('.tag').remove();
				_this.state.tags.pop();
				_this.setState({
					tags: _this.state.tags
				});
			} else {
				clearTimeout(_this.state.timer);
				var timer = setTimeout(function(){
					ArticleModel.getAllTags(WQ.trim(ele.val()),function(data) {
						if(!data.error) {
							_this.setState({
								cacheTags: data.data
							});
						}
					});
				},200);
				_this.setState({
					timer: timer
				});
			}

		},
		// 创建标签
		dialogShow: function(event) {
			var _this = this;
			event.stopPropagation();
			event.preventDefault();

			Dialog({
				name: _this.state.inputTag,
				ok: function(data){
					if(!data) {
						_this.state.tags.push(WQ.trim(_this.state.inputTag));
						_this.setState({
							tags: _this.state.tags,
							inputTag: ''
						});
					}
				}
			});
		},
		// 选中标签
		handleSelectTag: function(event) {
			var _this = this;
			var ele = $(event.target);
			var input = ele.parents('ul').siblings('input[type=text]');
			event.stopPropagation();
			event.preventDefault();

			var name = ele.find('a').length>0 ? ele.find('a').text() : ele.text();

			var status = true;
			_this.state.tags.forEach(function(v,i) {
				if(v==WQ.trim(name)) {
					status = false;
				}
			});

			if(status) {
				_this.state.tags.push(WQ.trim(name));
				_this.setState({
					tags: _this.state.tags,
					inputTag: ''
				});
			}
			ele.parents('ul').hide();
		},
		// 删除标签
		handleDelTag: function(event) {
			var _this = this;
			var index = $(event.target).parent('.tag.selected').index();
			_this.state.tags.splice(index,1);
			_this.setState({
				tags: _this.state.tags,
			});
		},
		render: function() {
			var _this = this;

			if (_this.state.aid) {
				document.title = '编辑文章 | Web圈';
			} else {
				document.title = '添加文章 | Web圈';
			}

			if(this.state.cloumns.length>0) {
				var cloumns = _this.state.cloumns.map(function(d,i) {
					return (<option key={d.id} value={d.id} selected={_this.state.selected==d.id ? 'selected' : ''}>{d.name}</option>);
				});
			} else {
				var cloumns = null;
			}

			var tagsLi = _this.state.cacheTags.length>0 ? _this.state.cacheTags.map(function(tag,i) {
				return (<li onClick={_this.handleSelectTag}><a>{tag.name}</a></li>);
			}) : null;

			var tagsSpan = _this.state.tags.length>0 ? _this.state.tags.map(function(tag,i) {
				return (<span className="tag selected">{tag}<span className="remove" onClick={_this.handleDelTag}>x</span></span>);
			}) : null;

			return (
				<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true}>
					<div>
						<div className="top-bar">
							<span className="desc">写文章</span>
							<a className="btn btn-info btn-md pull-right" href="javascript:void(0)" style={{margin:'10px 120px 0 0'}} data-publish="1" onClick={this.handlePublic}>发布</a>
							<a className="btn btn-default btn-md pull-right" href="javascript:void(0)" style={{margin:'10px 10px 0 0'}} data-publish="0" onClick={this.handlePublic}>保存草稿</a>
						</div>
						<div className="edit-article">
							<form>
					            <div className="input-prepend">
					            	<input type="text" name="title" placeholder="文章标题" onChange={this.handleChangeTitle} value={_this.state.info.title ? _this.state.info.title : null} />
					            </div>
					            <div className="input-prepend">
					            	<textarea name="description" maxLength="200" placeholder="请以200字以内简单描述此内容" onChange={this.handleChangeDesc} value={_this.state.info.description ? _this.state.info.description : null}></textarea>
					            </div>
					            <div className="input-prepend">
					            	<select onChange={_this.handleSelectCloumn}>{cloumns}</select>
					            </div>
					            <div className="tags-list" onClick={_this.getFocus}>
					            	<i className="fa fa-tag"></i><span>增加标签</span>
					            	<span>{tagsSpan}</span>
					            	{
					            		_this.state.tags.length<3 ? <input type="text" placeholder="如：php" onKeyDown={_this.dealTags} value={_this.state.inputTag} onChange={_this.tagChange} /> : null
					            	}
					            	<ul>{tagsLi}<li style={_this.state.cacheTags.length>4 ? {display:'none'} : {display:'block'}} onClick={_this.dialogShow}><a href="javascript:void(0)">创建标签&nbsp;<strong>{_this.state.inputTag}</strong></a></li></ul>
					            </div>
								<div id="article-editormd">
									<textarea onChange={this.handleChangeContent} value={_this.state.info.content ? _this.state.info.content : null}></textarea>
								</div>
							</form>
						</div>
					</div>
				</ReactCSSTransitionGroup>
			);
		}
	});

});