define([
	'react', 
	'jquery',
    'home/model/userModel',
    'home/common/tooltip',
    'WQ',
    'home/common/leftNav',
    ],function(React, $, UserModel,Tooltip,	Wq,LeftNav) {
		var mixin = {
			handleUserNameChange: function(event) {
	            var _this = this;
	            _this.setState({
	                username: event.target.value,
	            });
	        },
	        handlePositionChange: function(event) {
	            var _this = this;
	            _this.setState({
	                job: event.target.value,
	            });
	        },
	        handleAddressChange: function(event) {
	            var _this = this;
	            _this.setState({
	                city: event.target.value,
	            });
	        },
	        handleSexChange: function(sexc) {
	            var _this = this;
	            _this.setState({
	                sex: sexc,
	            });
	        },
	        handleSignChange: function(event) {
	            var _this = this;
	            _this.setState({
	                description: event.target.value,
	            });
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
	        componentDidMount: function(){
	        	var _this = this;
	        	UserModel.getUserInfoById({id:WQ.cookie.get('id')},function(success,data){
					if(success){
						if(!data.error){
							data = data.data;
							_this.setState({

										id: data.id,
						          username: data.username,
						               job: data.job,
						              city: data.city,
						               sex: data.sex,
						       description: data.description,
						       		 email: data.email

	            			});
						}else{
							alert("失败");
						}
					}
				});	
	        },        
		}



// 个人信息设置
        var Personal = React.createClass({displayName: "Personal",
        	mixins: [mixin],
        	getInitialState: function() {
        		// var aa = "defaultChecked";
        		var _this = this;
				return {
	            		  id: "",
	            	username: "",
	            		 job: "",
	            	    city: "",
	            	     sex: "",
	             description: ""
	            }
	        },
        	handleSubmit: function(event){
        		var _this = this;
        		var data = {
        				  id:WQ.cookie.get('id'),
        			username: _this.state.username,
        				 job: _this.state.job,
        				city: _this.state.city,
        				 sex: _this.state.sex,
        		 description: _this.state.description,
        		}
        		UserModel.editUser(data,function(success,data){
                    if(success){
                    	if(!data.error){
                    		alert("修改成功");
                    	}else{
                    		alert(data.msg);
                    	}
                    }
        		})
        	},
        	render: function(){
        		var _this = this;
        		return(
        			React.createElement("div", {className: "personal"}, 
        				React.createElement("form", null, 
	        				React.createElement("p", null, 
	        					"昵称：  ", React.createElement("input", {type: "text", name: "username", className: "username", placeholder: "请输入昵称", onChange: this.handleUserNameChange, value: _this.state.username})
	        				), 
	        				React.createElement("p", null, 
	        					"职位：  ", React.createElement("select", {name: "job", className: "job", onChange: this.handlePositionChange, value: _this.state.job}, 
	        								React.createElement("option", null, "请选择职位"), 
	        								React.createElement("option", null, "页面重构设计"), 
	        								React.createElement("option", null, "web前端工程师"), 
	        								React.createElement("option", null, "js工程师"), 
	        								React.createElement("option", null, "PHP开发工程师"), 
	        								React.createElement("option", null, "JAVA开发工程师"), 
	        								React.createElement("option", null, "移动开发工程师"), 
	        								React.createElement("option", null, "软件测试工程师"), 
	        								React.createElement("option", null, "Linux系统工程师"), 
	        								React.createElement("option", null, "交互设计师"), 
	        								React.createElement("option", null, "产品经理"), 
	        								React.createElement("option", null, "UI设计师"), 
	        								React.createElement("option", null, "学生"), 
	        								React.createElement("option", null, "其他")
	        					  	  	)
	        				), 
	        				React.createElement("p", {className: "place", value: _this.state.place}, 
	        					"地址：  ", React.createElement("input", {type: "text", name: "city", className: "city", placeholder: "请输入地址", onChange: this.handleAddressChange, value: _this.state.city})	
	        				), 
	        				React.createElement("p", {className: "sex"}, 
		        				"性别： ",    
		        				  		React.createElement("input", {type: "radio", name: "sex", onClick: this.handleSexChange.bind(this,"0"), checked: _this.state.sex == 0 ? "checked" : null}), "  男  ", 
		        				      	React.createElement("input", {type: "radio", name: "sex", onClick: this.handleSexChange.bind(this,"1"), checked: _this.state.sex == 1 ? "checked" : null}), "  女"
		        				      
	        				), 
	        				React.createElement("p", {className: "sign"}, 
			        			"个性签名", 
			        			React.createElement("textarea", {resize: "none", name: "description", onChange: this.handleSignChange, value: _this.state.description}), React.createElement("br", null)
	        			 	), 
	        			 	React.createElement("p", {className: "sub"}, 
	        			 		React.createElement("input", {type: "button", value: "保存", onClick: this.handleSubmit})
	        			 	)
        			 	)
        			)
        		)
        	}
        })



// 上传头像
		var Head = React.createClass({displayName: "Head",
			render: function(){
				var _this = this;
				return(
					// <div className="head">
					// 	<img src="/image/logo1.png" />
					// </div>
					React.createElement("p", {className: "head"}, "fsd")
				)
			}
		})



// 邮箱验证
		var Email = React.createClass({displayName: "Email",
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
					React.createElement("div", {className: "email"}, 
						React.createElement("p", {className: "fir"}, "当前邮箱"), 
						React.createElement("p", {className: "sec"}, _this.state.email), 
						React.createElement("div", {className: "hook"}, 
							React.createElement("i", {className: "fa fa-check-square"}), 
							React.createElement("p", null, "邮箱已认证")
						), 
						React.createElement("input", {type: "button", value: "更改邮箱", className: "change"})
					)
				)
			}
		})


		
// 密码修改
		var ModifyPassword = React.createClass({displayName: "ModifyPassword",
			mixins: [mixin],
			getInitialState: function() {
				return{
					oldPassword: "",
					newPassword: "",
					newPasswordRepeat: ""
				}
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
					UserModel.modifyPassword(data,function(success,data){
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
					React.createElement("form", {className: "modify"}, 
						React.createElement("p", null, React.createElement("label", null, "当前密码："), React.createElement("input", {type: "password", placeholder: "请输入当前密码", onChange: this.handleOldPsdChange})), 
						React.createElement("p", null, React.createElement("label", null, "新密码："), React.createElement("input", {type: "password", placeholder: "请输入密码", onChange: this.handleNewPsdChange})), 
						React.createElement("p", null, React.createElement("label", null, "确认密码："), React.createElement("input", {type: "password", placeholder: "请输入密码", onChange: this.handleNewPsdRepeatChange})), 
						React.createElement("p", null, React.createElement("label", null, " "), React.createElement("input", {type: "button", value: "保存", className: "sub", onClick: this.handleSubmit}))
					)
				)
			}
		})


        return React.createClass({
	        getInitialState: function() {
	            return {
	            	nav: "personal",
	            }
	        },
	        handleClick: function(set){
	        	var _this = this;
	        	_this.setState({
	        		nav: set,
	        	})
	        },
	        componentDidUpdate: function(){
	        	var _this = this;
	        	// $(".con").children().css({"display":"none"});
	        	// $("."+_this.state.nav).css({"display":"block"});
	        },
	        render: function() {
	        	var _this = this;
	            return (
	            	React.createElement("div", null, 
	            		React.createElement(LeftNav, null), 

		            	React.createElement("div", {className: "settings clearfix"}, 
		            	
			                React.createElement("h3", {className: "title"}, React.createElement("i", {className: "fa fa-asterisk"}), "设置"), 
			                React.createElement("ul", {className: "nav"}, 
			                	React.createElement("li", null, 
			                		React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav=='personal' ? 'fir active' : 'fir', onClick: this.handleClick.bind(this,"personal")}, "个人资料")
			                	), 
			                	React.createElement("li", null, 
			                		React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav=='head' ? 'fir active' : 'fir', onClick: this.handleClick.bind(this,"head")}, "头像设置")
			                	), 
			                	React.createElement("li", null, 
			                		React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav=='email' ? 'fir active' : 'fir', onClick: this.handleClick.bind(this,"email")}, "邮箱验证")
			                	), 
			                	React.createElement("li", null, 
			                		React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav=='modify' ? 'fir active' : 'fir', onClick: this.handleClick.bind(this,"modify")}, "修改密码")
			                	)
			                ), 
			                React.createElement("div", {className: "con"}, 
			                	React.createElement("div", null
			                	), 
			                	React.createElement(Personal, null), 
			                	React.createElement(Head, {style: _this.state.nav=='head' ? {display:'block'} : {display:'none'}}), 
			                	React.createElement(Email, {style: _this.state.nav=='email' ? {display:'block'} : {display:'none'}}), 
			                	React.createElement(ModifyPassword, {style: _this.state.nav=='modify' ? {display:'block'} : {display:'none'}})
			                )
		                )
	                )

	            );
	        }
    	});
});
