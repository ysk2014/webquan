define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/common/tooltip',
	],function( React, $, WQ, CloumnModel,Tooltip) {

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

	var mixin = {
		init: function() {
			var _this = this;
			// 如果是编辑页面则获取专题数据
			if(_this.state.cid > 0) {
				CloumnModel.getCloumnById(_this.state.cid,_this.state.uid,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.setState({
								name: data.data['name'],
								description: data.data['description'],
								logo_dir: data.data['logo_dir']
							});
						} else {
							Tooltip(data.msg);
						}
					}
				});
			}
			return this;
		},
		// 编辑专题名称
		handleNameChange: function(event) {
			this.setState({
				name: event.target.value
			});
		},
		// 编辑专题描述
		handleDescChange: function(event) {
			this.setState({
				description: event.target.value
			});
		},
		// 创建或者更新专题
		handleSubmit: function() {
			var _this = this;
			if(_this.state.cid > 0) {
				var dataObj = {name:_this.state.name,description:_this.state.description,uid:_this.state.uid,id:_this.state.cid,logo_dir:_this.state.logo_dir};
				CloumnModel.editCloumn(dataObj,function(success,data) {
					if(success) {
						if(!data.error) {
							window.location.href='/cloumn/'+_this.state.cid;
						} else {
							Tooltip(data.msg);
						}
					}
				});	
			} else {
				var dataObj = {name:_this.state.name,description:_this.state.description,uid:_this.state.uid,logo_dir:_this.state.logo_dir};
				CloumnModel.addCloumn(dataObj,function(success,data) {
					if(success) {
						if(!data.error) {
							window.location.href='/cloumn/'+data.data;
						} else {
							Tooltip(data.msg);
						}
					}
				});
			}
		},
		// 点击上传按钮
		handleUploadClick: function(event) {
			$(event.target).siblings('input[type=file]').trigger("click");
		},
		// 上传专题图像绑定change事件
		handleFileChange: function(event) {
			var fileName = event.target.value;
			
			if(fileName === '') {
				Tooltip('头像不能为空');
			}
			var submit = $(event.target).siblings('input[type=submit]');
			submit.trigger("click");
		},
		// 上传处理
		handleUpload: function() {
			var _this = this;
            var uploadIframe = document.getElementById('uploadIframe');
            var loading = $('.cloumn-edit form .upload>div');

            loading.show();
            uploadIframe.onload = function() {
            	loading.hide();
                var body = (uploadIframe.contentWindow ? uploadIframe.contentWindow : uploadIframe.contentDocument).document.body;
                var json = (body.innerText) ? body.innerText : ( (body.textContent) ? body.textContent : null);

                json = (typeof JSON.parse !== "undefined") ? JSON.parse(json) : eval("(" + json + ")");
                if (!json.error) {
                    _this.setState({
                    	logo_dir: json.data,
                    });
                } else {
                    Tooltip(json.msg);
                }

                return false;
            };
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				nav: 'cloumn',
				cid: this.props.cid ? this.props.cid : 0, //专题id
				name: '',                  //专题名称
				description: '',           //专题描述
				uid: WQ.cookie.get('id'),  //用户id
				logo_dir: ''               //专题logo
			}
		},
		componentDidMount: function() {
			this.init();
			$('.cloumn-edit .uploadForm').attr('enctype','multipart/form-data');
		},
		componentDidUpdate: function() {
			$('.cloumn-edit .uploadForm').attr('enctype','multipart/form-data');
		},
		render: function() {
			var _this = this;

			if (_this.state.cid) {
				document.title = '编辑专题 | Web圈';
			} else {
				document.title = '添加专题 | Web圈';
			}

			return (
				<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true}>
					<div className="cloumn-edit">
						<form className="uploadForm" action="/cloumn/logo" method="post" target="uploadIframe">
							<h3>{_this.state.cid>0 ? '编辑' : '新建'}专题</h3>
							<div className="upload">
								<input type="file" name="cloumn-image" style={{display:'none'}} onChange={_this.handleFileChange} />
								<input type="text" name="uid" style={{display:'none'}} value={WQ.cookie.get('id')} />
								<input type="text" name="logo" style={{display:'none'}} value={_this.state.logo_dir} />
								<input type="submit"  style={{display:"none"}}  onClick={_this.handleUpload} />
								<iframe name="uploadIframe" id="uploadIframe" style={{display:"none"}}></iframe>

								<i className="fa fa-picture-o" onClick={_this.handleUploadClick} style={_this.state.logo_dir !='' ? {display:'none'} : {display:'block'}}></i>
								<img className="preview" style={_this.state.logo_dir =='' ? {display:'none'} : {display:'block'}} src={_this.state.logo_dir+'?'+Math.random()*10000} onClick={_this.handleUploadClick} />
								<span className="title">点击上传专题图<br/>(图片大小最好为220x140)</span>

								<div><img src="/image/loading.gif" /></div>
							</div>
						</form>
						<form>
							<input type="text" style={{display:"none"}} value={_this.state.logo_dir} />
							<div className="input-prepend">
								<input type="text" placeholder="专题命名，使用尽量少的字来描述" value={_this.state.name} onChange={_this.handleNameChange}/>
							</div>
							<div className="input-prepend">
								<textarea name="description" maxLength="200" placeholder="请以200字以内为专题添加描述" value={_this.state.description} onChange={_this.handleDescChange} ></textarea>
							</div>
							<input type="button" className="btn btn-info btn-submit" value="创建专题" style={{width:"60%",margin:'0 auto',cursor:'pointer'}} onClick={_this.handleSubmit}/>
						</form>
					</div>
				</ReactCSSTransitionGroup>
			);
		}
	});

});