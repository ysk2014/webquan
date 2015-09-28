define(['react', 'jquery', 'home/model/userModel','home/common/tooltip','WQ'],function(React, $, UserModel,tooltip,wq) {
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
	                newPassword: event.target.value,
	            });	        	
	        },
	        handleNewPsdChange: function(){
	            var _this = this;
	            _this.setState({
	                oldPassword: event.target.value,
	            });	        	
	        },
	        handleNewPsdRepeatChange: function(){
	            var _this = this;
	            _this.setState({
	                newPasswordRepeat: event.target.value,
	            });	        	
	        },		        
		}

// 个人信息设置
        var Personal = React.createClass({
        	mixins: [mixin],
        	getInitialState: function() {
        		data={
        			id:WQ.cookie.get('id'),
        		}
				UserModel.getUserInfoById(5,function(success,data){
					if(success){
						console.log(data);
					}
				});	            
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
        		// event.preventDefault();
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
        		return(
        			<div className="personal">
        				<form>
	        				<p>
	        					昵称：  <input type="text" name="username" className="username" placeholder="请输入昵称" onChange={this.handleUserNameChange}/>
	        				</p>
	        				<p>
	        					职位： 	<select name="job" className="job" onChange={this.handlePositionChange}>
	        								<option>请选择职位</option>
	        								<option>页面重构设计</option>
	        								<option>web前端工程师</option>
	        								<option>js工程师</option>
	        								<option>PHP开发工程师</option>
	        								<option>JAVA开发工程师</option>
	        								<option>移动开发工程师</option>
	        								<option>软件测试工程师</option>
	        								<option>Linux系统工程师</option>
	        								<option>交互设计师</option>
	        								<option>产品经理</option>
	        								<option>UI设计师</option>
	        								<option>学生</option>
	        								<option>其他</option>
	        					  	  	</select>
	        				</p>
	        				<p className="place">
	        					地址： 	<input type="text" name="city" className="city" placeholder="请输入地址" onChange={this.handleAddressChange}/>	
	        				</p>
	        				<p className="sex">
		        				性别：&nbsp;   
		        				  		<input type="radio" name="sex" onClick={this.handleSexChange.bind(this,"0")}/>男&nbsp;&nbsp;
		        				      	<input type="radio" name="sex" onClick={this.handleSexChange.bind(this,"1")}/>女
		        				      
	        				</p>
	        				<p className="sign">
			        			个性签名
			        			<textarea resize="none" name="description" onChange={this.handleSignChange}></textarea><br />
	        			 	</p>
	        			 	<p className="sub">
	        			 		<input type="button" value="保存" onClick={this.handleSubmit}/>
	        			 	</p>
        			 	</form>
        			</div>
        		)
        	}
        })
		var Email = React.createClass({
			render: function(){
				return(
					<div className="email-box">
						<p className="fir">当前邮箱</p>
						<p className="sec">2409551912@.com</p>
						<div className="hook">
							<i className="fa fa-check-square"></i>
							<p>邮箱已认证</p>
						</div>
						<input type="button" value="更改邮箱" className="change"/>
					</div>
				)
			}
		})
// 密码修改
		var ModifyPassword = React.createClass({
			mixins: [mixin],
			getInitialState: function() {
				return{
					oldPassword: "",
					newPassword: "",
					newPasswordRepeat: ""
				}
			},
			handleSubmit: function(){
				var _this = this;
				var data={
					oldPassword: _this.state.oldPassword,
					newPassword: _this.state.newPassword,
					newPasswordRepeat: _this.state.newPasswordRepeat
				}
				UserModel.modifyPassword(data,function(success,data){
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
				return(
					<form className="modify-psd">
						<p><label>当前密码：</label><input type="password" placeholder="请输入当前密码" onChange={this.handleOldPsdChange}/></p>
						<p><label>新密码：</label><input type="password" placeholder="请输入密码" onChange={this.handleNewPsdChange}/></p>
						<p><label>确认密码：</label><input type="password" placeholder="请输入密码" onChange={this.handleNewPsdRepeatChange}/></p>
						<p><label>&nbsp;</label><input type="button" value="保存" className="sub" onClick={this.handleSubmit}/></p>
					</form>
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
	        judge :function(){
	        	var _this = this;
	        	switch(_this.state.nav){
	        		case "personal": return <Personal />;break;
	        		case "head": return "fsd";break;
	        		case "email": return <Email />;
	        		case "modify":return <ModifyPassword />;
	        	}
	        },
	        render: function() {
	        	var _this = this;
	            return (
	            	<div className="settings clearfix" >
		                <h3 className="title"><i className="fa fa-asterisk"></i>设置</h3>
		                <ul className="nav">
		                	<li>
		                		<a href="#" className={_this.state.nav=='personal' ? 'fir active' : 'fir'} onClick={this.handleClick.bind(this,"personal")}>个人资料</a>
		                	</li>
		                	<li>
		                		<a href="#" className={_this.state.nav=='head' ? 'fir active' : 'fir'} onClick={this.handleClick.bind(this,"head")}>头像设置</a>
		                	</li>
		                	<li>
		                		<a href="#" className={_this.state.nav=='email' ? 'fir active' : 'fir'} onClick={this.handleClick.bind(this,"email")}>邮箱验证</a>
		                	</li>
		                	<li>
		                		<a href="#" className={_this.state.nav=='modify' ? 'fir active' : 'fir'} onClick={this.handleClick.bind(this,"modify")}>修改密码</a>
		                	</li>
		                </ul>
		                {
		                	this.judge()
		            	}
	                </div>

	            );
	        }
    	});
});
