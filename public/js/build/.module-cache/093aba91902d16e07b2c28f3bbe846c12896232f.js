define(['react', 'jquery', 'home/model/userModel','home/common/tooltip'],function(React, $, UserModel,tooltip) {
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
		}
        var Personal = React.createClass({displayName: "Personal",
        	mixins: [mixin],
        	getInitialState: function() {
	            return {
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
        			React.createElement("div", {className: "personal"}, 
        				React.createElement("form", null, 
	        				React.createElement("p", null, 
	        					"昵称：  ", React.createElement("input", {type: "text", name: "username", className: "username", placeholder: "请输入昵称", onChange: this.handleUserNameChange})
	        				), 
	        				React.createElement("p", null, 
	        					"职位：  ", React.createElement("select", {name: "job", className: "job", onChange: this.handlePositonChange}, 
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
	        				React.createElement("p", {className: "place"}, 
	        					"地址：  ", React.createElement("input", {type: "text", name: "city", className: "city", placeholder: "请输入地址", onChange: this.handleAddressChange})	
	        				), 
	        				React.createElement("p", {className: "sex"}, 
		        				"性别： ",    
		        				  		React.createElement("input", {type: "radio", name: "sex", onClick: this.handleSexChange.bind(this,"0")}), "男  ", 
		        				      	React.createElement("input", {type: "radio", name: "sex", onClick: this.handleSexChange.bind(this,"1")}), "女"
		        				      
	        				), 
	        				React.createElement("p", {className: "sign"}, 
			        			"个性签名", 
			        			React.createElement("textarea", {resize: "none", name: "description", onChange: this.handleSignChange}), React.createElement("br", null)
	        			 	), 
	        			 	React.createElement("p", {className: "sub"}, 
	        			 		React.createElement("input", {type: "button", value: "保存", onClick: this.handleSubmit})
	        			 	)
        			 	)
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
	        judge :function(){
	        	var _this = this;
	        	switch(_this.state.nav){
	        		case "personal": return React.createElement(Personal, null);break;
	        		case "head": return "fsd";break;
	        	}
	        },
	        render: function() {
	        	var _this = this;
	            return (
	            	React.createElement("div", {className: "settings clearfix"}, 
		                React.createElement("h3", {className: "title"}, React.createElement("i", {className: "fa fa-asterisk"}), "设置"), 
		                React.createElement("ul", {className: "nav"}, 
		                	React.createElement("li", null, 
		                		React.createElement("a", {href: "#", className: _this.state.nav=='personal' ? 'fir active' : 'fir', onClick: this.handleClick.bind(this,"personal")}, "个人资料")
		                	), 
		                	React.createElement("li", null, 
		                		React.createElement("a", {href: "#", className: _this.state.nav=='head' ? 'fir active' : 'fir', onClick: this.handleClick.bind(this,"head")}, "头像设置")
		                	), 
		                	React.createElement("li", null, 
		                		React.createElement("a", {href: "#", className: _this.state.nav=='email' ? 'fir active' : 'fir', onClick: this.handleClick.bind(this,"email")}, "邮箱验证")
		                	), 
		                	React.createElement("li", null, 
		                		React.createElement("a", {href: "#", className: _this.state.nav=='modify' ? 'fir active' : 'fir', onClick: this.handleClick.bind(this,"modify")}, "修改密码")
		                	)
		                ), 
		                
		                	this.judge()
		            	
	                )

	            );
	        }
    	});
});
