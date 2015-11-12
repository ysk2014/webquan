define([
	'react', 
	'jquery',
    'home/model/userModel',
    'home/common/tooltip',
    'WQ',
    ],function(React, $, UserModel, Tooltip, WQ) {

    	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

		var mixin = {
			handleUserNameChange: function(event) {
	            var _this = this;
	            _this.state.info.username = event.target.value;
	            _this.setState({
	                info: _this.state.info,
	            });
	        },
	        handleSelectJob: function(event) {
	            var _this = this;
	            _this.state.info.job = event.target.value;
	            _this.setState({
	                job: _this.state.info,
	            });
	        },
	        handleCityChange: function(event) {
	            var _this = this;
	            _this.state.info.city = event.target.value;
	            _this.setState({
	                info: _this.state.info,
	            });
	        },
	        handleSexChange: function(sexc) {
	            var _this = this;
	            _this.state.info.sex = sexc;
	            _this.setState({
	                info: _this.state.info,
	            });
	        },
	        handleGithubChange: function(event) {
	        	var _this = this;
	            _this.state.info.github = event.target.value;
	            _this.setState({
	                info: _this.state.info,
	            });
	        },
	        handleSignChange: function(event) {
	            var _this = this;
	            _this.state.info.description = event.target.value;
	            _this.setState({
	                info: _this.state.info,
	            });
	        },
	        		
		}
 
		// 上传头像
		var Head = React.createClass({
			getInitialState: function() {
				return {
					logo_dir: this.props.logo_dir ? this.props.logo_dir : '/image/user-default.png',
				}
			},
			componentWillReceiveProps: function(nextProps) {
	        	this.setState({
	        		logo_dir: nextProps.logo_dir ? nextProps.logo_dir : '/image/user-default.png',
	        	});
	        },
			handleSubmit: function(event) {
				$(event.target).siblings('input[type=file]').trigger("click");
			},
			handleFileChange: function(event) {
				var fileName = event.target.value;
				
				if(fileName === '') {
					Tooltip('头像不能为空');
				}
				var submit = $(event.target).siblings('input[type=submit]');
				submit.trigger("click");
			},
			handleUpload: function() {
				var _this = this;
                var uploadIframe = document.getElementById('uploadIframe');
                var loading = $('.head .user>div');

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
                        WQ.cookie.set('userUrl',json.data,1);
                        Tooltip('头像更新成功');
                    } else {
                        Tooltip(json.msg);
                    }

                    return false;
                };
			},
			componentDidUpdate: function() {
				var _this = this;
				$('.head .uploadForm').attr('enctype','multipart/form-data');
				
			},
			render: function(){
				var _this = this;
				return(
					<div className='head'>
						<form className="uploadForm" enctype="multipart/form-data" action="/user/updateLogo" method="post" target="uploadIframe" >

							<div className="user">
								<img src={_this.state.logo_dir+'?'+Math.random()*1000} />
								<div><img src="/image/loading.gif" /></div>
							</div>	

							<iframe name="uploadIframe" id="uploadIframe" style={{display:"none"}}></iframe>

							<input type="text" name="id" style={{display:"none"}} value={WQ.cookie.get('id')}  />
							<input type="file" name="file" id="file" style={{display:"none"}} onChange={_this.handleFileChange} />
							<input type="submit"  style={{display:"none"}}  onClick={_this.handleUpload} />
							<a className="btn btn-default btn-md" href="javascript:void(0)" onClick={_this.handleSubmit} >上传头像</a>
						</form>
					</div>
				)
			}
		});

		// 个人信息设置
        var Personal = React.createClass({
        	mixins: [mixin],
        	getInitialState: function() {
        		var _this = this;
				return {
	             	info: _this.props.info,
	             	job: ['页面重构设计','Web前端工程师','JS工程师','PHP开发工程师','JAVA开发工程师','移动开发工程师','软件测试工程师','Linux系统工程师','交互设计师','产品经理','UI设计师','学生','其他']
	            }
	        },
	        componentWillReceiveProps: function(nextProps) {
	        	this.setState({
	        		info: nextProps.info,
	        	});
	        },
	        
	        contentClick: function() {
	        	var _this = this;
	        	if (_this.state.select == 0) {
	        		_this.setState({
	        			select: 1
	        		});
	        	} else {
	        		_this.setState({
	        			select: 0
	        		});
	        	}
	        },
        	handleSubmit: function(event) {
        		var _this = this;
        		var data = _this.state.info;
        		UserModel.editUser(_this.state.info.id,data,function(success,data) {
                    if(success){
                    	if(!data.error){
                    		Tooltip("修改成功");
                    	}else{
                    		Tooltip(data.msg);
                    	}
                    }
        		});
        	},
        	render: function() {
        		var _this = this;
        		var username    = _this.state.info ? _this.state.info.username    : null;
        		var job         = _this.state.info ? _this.state.info.job         : null;
        		var city        = _this.state.info ? _this.state.info.city        : null;
        		var sex         = _this.state.info ? _this.state.info.sex         : null;
        		var description = _this.state.info ? _this.state.info.description : null;
        		var logo_dir    = _this.state.info ? _this.state.info.logo_dir    : null;
        		var github      = _this.state.info ? _this.state.info.github      : null;

        		var jobs = _this.state.job.map(function(j,i) {
        			return (<option key={i} selected={(job && job==j) ? 'selected' : ''}>{j}</option>);
        		});
        		return(
        			<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true}>
	        			<div className="personal">
	    					<div className="input-prepend">
	        					<label className="col col-sm-2">头像：</label>
	        					<div className="col col-sm-10"><Head logo_dir={logo_dir} /></div>
	        				</div>
	        				<div className="input-prepend">
	        					<label className="col col-sm-2">昵称：</label>
	        					<input type="text" className="col col-sm-10" name="username" placeholder="请输入昵称" onChange={this.handleUserNameChange} value={username}/>
	        				</div>
	        				<div className="input-prepend">
	        					<label className="col col-sm-2">职位：</label>
	        					<select className="col col-sm-10" onChange={_this.handleSelectJob}><option>{jobs}</option></select>
	        				</div>
	        				<div className="input-prepend">
	        					<label className="col col-sm-2">所在地：</label>
	        					<input type="text" className="col col-sm-10" name="city" placeholder="请输入地址" onChange={this.handleCityChange} value={city}/>	
	        				</div>
	        				<div className="input-prepend">
	        					<label className="col col-sm-2">github：</label>
	        					<input type="text" className="col col-sm-10" name="city" placeholder="请输入github地址" onChange={this.handleGithubChange} value={github}/>	
	        				</div>
	        				<div className="input-prepend">
		        				<label className="col col-sm-2">性别：</label>
		        				<div className="col col-sm-10">
		        				  	<input type="radio" name="sex" onClick={this.handleSexChange.bind(this,"0")}  checked={sex == 0 ? "checked" : null }/>
		        				  	<span>&nbsp;&nbsp;男&nbsp;&nbsp;&nbsp;&nbsp;</span>
		        				    <input type="radio" name="sex" onClick={this.handleSexChange.bind(this,"1")}  checked={sex == 1 ? "checked" : null }/>
		        				    <span>&nbsp;&nbsp;女</span>
		        				</div>
	        				</div>
	        				<div className="input-prepend">
			        			<label className="col col-sm-2">个性签名：</label>
			        			<textarea className="col col-sm-10" name="description" onChange={this.handleSignChange} value={description} placeholder="这位童鞋很懒，什么也没有留下～～！"></textarea>
	        			 	</div>
	        			 	<div className="input-prepend">
	        			 		<label className="col col-sm-2"></label><a href="javascript:void(0);" className="col col-sm-10 btn btn-info btn-submit"  onClick={this.handleSubmit}>保存</a>
	        			 	</div>
	        			</div>
        			</ReactCSSTransitionGroup>
        		)
        	}
        });



		// 邮箱验证
		var Email = React.createClass({
			getInitialState: function() {
        		var _this = this;
				return {
	            	email: this.props.email,
	            }
	        },
	        componentWillReceiveProps: function(nextProps) {
	        	this.setState({
	        		email: nextProps.email ? nextProps.email : null,
	        	});
	        },
	        emailChange: function(event) {
	        	var _this = this;
	        	_this.setState({
	        		email: event.target.value,
	        	});
	        },
	        sendEmail: function() {
	        	var _this = this;
	        	UserModel.sendEmail(_this.state.email,function(success,data){

	        	});
	        },
			render: function(){
				var _this = this;
				return(
					<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true}>
						<div className="email input-prepend">
							<input type="text" className="col col-sm-10" onChange={this.emailChange} value={this.state.email} />
							<label className="col col-sm-2">
								<a href="javascript:void(0)" className="btn btn-info btn-submit" style={{width:'92%'}} onClick={this.sendEmail}>验证</a>
							</label>
						</div>
					</ReactCSSTransitionGroup>
				)
			}
		});


		
		// 密码修改
		var ModifyPassword = React.createClass({
			getInitialState: function() {
				return{
					oldPassword: "",
					newPassword: "",
					newPasswordRepeat: ""
				}
			},
			handleOldPsdChange: function(){
	            var _this = this;
	            _this.setState({
	                oldPassword: event.target.value,
	            });	        	
	        },
	        handleNewPsdChange: function(){
	            var _this = this;
	            _this.setState({
	                newPassword: event.target.value,
	            });	        	
	        },
	        handleNewPsdRepeatChange: function(){
	            var _this = this;
	            _this.setState({
	                newPasswordRepeat: event.target.value,
	            });
	        },
			judge: function(data){
			  if (data.oldPassword == "") {
					alert("旧密码不能为空");
				}else if(data.newPassword == ""){
					alert("新密码不能为空");
				}else if (data.newPasswordRepeat == ""){
					alert("重复密码不能为空");
				}else if( data.newPassword != data.newPasswordRepeat){
					alert("新密码输入不一致");
				}else{
					return true;
				}
			},
			handleSubmit: function(){
				var _this = this;
				var data={
					id: WQ.cookie.get('id'),
					oldPassword: _this.state.oldPassword,
					newPassword: _this.state.newPassword,
					newPasswordRepeat: _this.state.newPasswordRepeat
				}
				if(_this.judge(data) == true){
				console.log(data);
					UserModel.modifyPassword(data['id'],data,function(success,data){
	                    if(success){
	                    	if(!data.error){
	                    		window.location.href="/login/sign_in";
	                    	}else{
	                    		console.log(data);
	                    		alert(data.msg);
	                    	}
	                    }
	        		})
				}
			},
			render: function(){
				return(
					<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true}>
						<form className="modify">
							<div className="input-prepend">
								<label className="col col-sm-2">当前密码：</label>
								<input type="password" className="col col-sm-10" placeholder="请输入当前密码" onChange={this.handleOldPsdChange}/>
							</div>
							<div className="input-prepend">
								<label className="col col-sm-2">新密码：</label>
								<input className="col col-sm-10" type="password" placeholder="请输入密码" onChange={this.handleNewPsdChange}/>
							</div>
							<div className="input-prepend">
								<label className="col col-sm-2">确认密码：</label>
								<input className="col col-sm-10" type="password" placeholder="请输入密码" onChange={this.handleNewPsdRepeatChange}/>
							</div>
							<div className="input-prepend">
								<label className="col col-sm-2"></label>
								<a className="col col-sm-10 btn btn-info btn-submit" href="javascript:void(0)" onClick={this.handleSubmit}>保存</a>
							</div>
						</form>
					</ReactCSSTransitionGroup>
				)
			}
		});


        return React.createClass({
	        getInitialState: function() {
	            return {
	            	nav: "personal",
	            	uid: this.props.uid ? this.props.uid : 0,
	            	info: null
	            }
	        },
	        componentDidMount: function(){
	        	var _this = this;
	        	UserModel.getUserInfoById(_this.state.uid,function(success,data) {
					if(success){
						if(!data.error){
							_this.setState({
								info: data.data
	            			});
						}else{
							Tooltip(data.msg);
						}
					}
				});	
	        },  
	        handleClick: function(set){
	        	var _this = this;
	        	_this.setState({
	        		nav: set,
	        	})
	        },
	        componentDidUpdate: function(){
	        	var _this = this;
	        },
	        render: function() {
	        	var _this = this;
	            return (
	            	<div className="settings clearfix" >
	            	
		                <h3 className="title"><i className="fa fa-cogs" style={{marginRight:'4px'}}></i>设置</h3>
		                <ul className="nav nav-tabs">
		                	<li className={_this.state.nav=='personal' ? 'active' : null}>
		                		<a href="javascript:void(0)" onClick={this.handleClick.bind(this,"personal")}>个人资料</a>
		                	</li>
		                	<li className={_this.state.nav=='email' ? 'active' : null}>
		                		<a href="javascript:void(0)" onClick={this.handleClick.bind(this,"email")}>邮箱验证</a>
		                	</li>
		                	<li className={_this.state.nav=='modify' ? 'active' : null}>
		                		<a href="javascript:void(0)" onClick={this.handleClick.bind(this,"modify")}>修改密码</a>
		                	</li>
		                </ul>
		                <div className="con">
		                	<div style={_this.state.nav=='personal' ? {display:'block'} : {display:'none'}} >
		                		<Personal info={_this.state.info}/>
		                	</div>
		                	<div style={_this.state.nav=='email' ? {display:'block'} : {display:'none'}} >
		                		<Email email={this.state.info ? this.state.info.email : null} />
		                	</div>
		                	<div style={_this.state.nav=='modify' ? {display:'block'} : {display:'none'}} >
		                		<ModifyPassword />
		                	</div>
		                </div>
	                </div>
	            );
	        }
    	});
});
