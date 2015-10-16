define([
	'react', 
	'jquery',
    'home/model/userModel',
    'home/common/tooltip',
    'WQ',
    'home/common/leftNav',
    ],function(React, $, UserModel, Tooltip, WQ, LeftNav) {
		var mixin = {
			handleUserNameChange: function(event) {
	            var _this = this;
	            _this.state.info.username = event.target.value;
	            _this.setState({
	                info: _this.state.info,
	            });
	        },
	        handlePositionChange: function(event) {
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
	                city: _this.state.info,
	            });
	        },
	        handleSexChange: function(sexc) {
	            var _this = this;
	            _this.state.info.sex = sexc;
	            _this.setState({
	                info: _this.state.info,
	            });
	        },
	        handleSignChange: function(event) {
	            var _this = this;
	            _this.setState({
	                description: event.target.value,
	            });
	        },
	        		
		}
 
		// 个人信息设置
        var Personal = React.createClass({
        	mixins: [mixin],
        	getInitialState: function() {
        		var _this = this;
				return {
	             	info: _this.props.info
	            }
	        },
	        componentWillReceiveProps: function(nextProps) {
	        	this.setState({
	        		info: nextProps.info
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
        		var data = {
        			id:          _this.state.uid,
        			username:    _this.state.username,
        			job:         _this.state.job,
        			city:        _this.state.city,
        			sex:         _this.state.sex,
        		 	description: _this.state.description,
        		};
        		UserModel.editUser(_this.state.uid,data,function(success,data) {
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
        		return(
        			<div className="personal">
        				<form>
	        				<p className="username">
	        					<label>昵称：</label><input type="text" name="username" placeholder="请输入昵称" onChange={this.handleUserNameChange} value={username}/>
	        				</p>
	        				<div className="input-prepend">
	        					<label>职位：</label><select><option>{job}</option></select>
	        				</div>
	        				<p className="place">
	        					<label>地址：</label>	<input type="text" name="city" className="city" placeholder="请输入地址" onChange={this.handleCityChange} value={city}/>	
	        				</p>
	        				<div className="sex clearfix">
		        				<label>性别：</label>&nbsp;
		        				<div className="sex-input">
		        				  	<input type="radio" name="sex" onClick={this.handleSexChange.bind(this,"0")}  checked={sex == 0 ? "checked" : null }/>&nbsp;&nbsp;男&nbsp;&nbsp;
		        				    <input type="radio" name="sex" onClick={this.handleSexChange.bind(this,"1")}  checked={sex == 1 ? "checked" : null }/>&nbsp;&nbsp;女
		        				</div>
	        				</div>
	        				<p className="sign">
			        			<label>个性签名：</label>
			        			<textarea resize="none" name="description" onChange={this.handleSignChange} value={description}></textarea><br />
	        			 	</p>
	        			 	<p className="sub">
	        			 		<input type="button" value="保存" onClick={this.handleSubmit}/>
	        			 	</p>
        			 	</form>
        			</div>
        		)
        	}
        });

		// 上传头像
		var Head = React.createClass({
			getInitialState: function() {
				return {
					logo_dir: this.props.info ? this.props.info.logo_dir : '/image/user-default.png',
				}
			},
			componentWillReceiveProps: function(nextProps) {
	        	this.setState({
	        		logo_dir: nextProps.info.logo_dir ? nextProps.info.logo_dir : '/image/user-default.png',
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
							<a className="submit-button" onClick={_this.handleSubmit} >上传头像</a>
						</form>
					</div>
				)
			}
		});

		// 邮箱验证
		var Email = React.createClass({
			mixins: [mixin],
			getInitialState: function() {
        		var _this = this;
				return {
	            		  email: "",
	            }
	        },
			render: function(){
				var _this = this;
				return(
					<div className="email">
						<p className="fir">当前邮箱</p>
						<p className="sec">{_this.state.email}</p>
						<div className="hook">
							<i className="fa fa-check-square"></i>
							<p>邮箱已认证</p>
						</div>
						<input type="button" value="更改邮箱" className="change"/>
					</div>
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
					<form className="modify">
						<p><label>当前密码：</label><input type="password" placeholder="请输入当前密码" onChange={this.handleOldPsdChange}/></p>
						<p><label>新密码：</label><input type="password" placeholder="请输入密码" onChange={this.handleNewPsdChange}/></p>
						<p><label>确认密码：</label><input type="password" placeholder="请输入密码" onChange={this.handleNewPsdRepeatChange}/></p>
						<p><label>&nbsp;</label><input type="button" value="保存" className="sub" onClick={this.handleSubmit}/></p>
					</form>
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
	            	<div>
	            		<LeftNav />

		            	<div className="settings clearfix" >
		            	
			                <h3 className="title"><i className="fa fa-cogs"></i>设置</h3>
			                <ul className="nav">
			                	<li>
			                		<a href="javascript:void(0)" className={_this.state.nav=='personal' ? 'fir active' : 'fir'} onClick={this.handleClick.bind(this,"personal")}>个人资料</a>
			                	</li>
			                	<li>
			                		<a href="javascript:void(0)" className={_this.state.nav=='head' ? 'fir active' : 'fir'} onClick={this.handleClick.bind(this,"head")}>头像设置</a>
			                	</li>
			                	<li>
			                		<a href="javascript:void(0)" className={_this.state.nav=='email' ? 'fir active' : 'fir'} onClick={this.handleClick.bind(this,"email")}>邮箱验证</a>
			                	</li>
			                	<li>
			                		<a href="javascript:void(0)" className={_this.state.nav=='modify' ? 'fir active' : 'fir'} onClick={this.handleClick.bind(this,"modify")}>修改密码</a>
			                	</li>
			                </ul>
			                <div className="con">
			                	<div  style={_this.state.nav=='personal' ? {display:'block'} : {display:'none'}} >
			                		<Personal info={_this.state.info}/>
			                	</div>
			                	<div  style={_this.state.nav=='head' ? {display:'block'} : {display:'none'}} >
			                		<Head info={this.state.info} />
			                	</div>
			                	<div  style={_this.state.nav=='email' ? {display:'block'} : {display:'none'}} >
			                		<Email info={this.state.info} />
			                	</div>
			                	<div  style={_this.state.nav=='modify' ? {display:'block'} : {display:'none'}} >
			                		<ModifyPassword />
			                	</div>
			                </div>
		                </div>
	                </div>

	            );
	        }
    	});
});
