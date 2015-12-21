
define(['react', 'jquery', 'WQ','home/model/userModel', 'jqueryextend'],function(React, $, WQ, UserModel) {

	var mixin = {
		init: function() {

		},
		getUserInfo: function() {
			var _this = this;
			var userInfo = WQ.cookie.all();
			if(userInfo) {
				this.setState({
					userInfo : userInfo,
					len: 3,
				})
			} else {
	            UserModel.getUserInfoByLogin(function(data) {
                	if(data.userInfo) {
                		var userInfo = {username: data.userInfo.username, id: data.userInfo.id, userUrl: data.userInfo.logo_dir!=null ? data.userInfo.logo_dir : ''};
						_this.setState({
							userInfo : userInfo,
							len: 3,
						});
						WQ.cookie.set(userInfo,1);
                	} else {
						_this.setState({
							userInfo : [],
							len: 0,
						});
                	}
	            });
			}
		},
		componentDidMount: function() {
			this.getUserInfo();
		},
	};

	var Login = React.createClass({displayName: "Login",
		render: function() {
			return (
				React.createElement("div", null, 
					React.createElement("a", {className: "login", href: "/login/sign_up"}, 
						React.createElement("i", {className: "fa fa-user"}), 
						React.createElement("span", null, "注册")
					), 
					React.createElement("a", {className: "login", href: "/login/sign_in"}, 
						React.createElement("i", {className: "fa fa-sign-in"}), 
						React.createElement("span", null, "登陆")
					)
				)
			);
		}
	});

	var User = React.createClass({displayName: "User",
		getInitialState: function() {
			return {
				userInfo: this.props.info,
				news: 0,
			}
		},
		componentWillReceiveProps: function(nextProps) {
			var _this = this;
			_this.setState({
				userInfo: nextProps.info
			});
		},
		componentDidMount: function() {
			$('.dropdown').dropdown();
			this.getNewsCount();
			
		},
		getNewsCount: function() {
			var _this = this;
			
			UserModel.getNewsCount(_this.state.userInfo.id,function(data) {
				if(!data.error) {
					_this.setState({
						news: data.data
					});
				}
			});

			setTimeout(function() {
				_this.getNewsCount();
			},1000*60);
		},
		handleClick: function() {
			UserModel.signOut(function(data){
				if(!data.error) {
					WQ.cookie.empty();
					window.location.href="/";
				}
			});
		},
		render: function() {
			var _this = this;
								
			return (
				React.createElement("div", null, 
					React.createElement("a", {className: "user avatar dropdown", "data-toggle": "dropdown", href: "javascript:void(0);"}, 
						React.createElement("img", {src: (_this.state.userInfo.userUrl!='') ? _this.state.userInfo.userUrl : "/image/user-default.png"}), 
						React.createElement("b", {className: "caret"}), 
						
							this.state.news!=0 ?  React.createElement("b", {className: "news"}) : null
						
					), 
					React.createElement("ul", {className: "dropdown-menu arrow-top"}, 
						React.createElement("li", null, 
							React.createElement("a", {href: "/article/add"}, 
								React.createElement("i", {className: "fa fa-pencil"}), 
								React.createElement("span", null, "写文章")
							)
						), 
						React.createElement("li", null, 
							React.createElement("a", {href: "/user/"+_this.state.userInfo.id}, 
								React.createElement("i", {className: "fa fa-user"}), 
								React.createElement("span", null, "我的主页")
							)
						), 
						React.createElement("li", null, 
							React.createElement("a", {href: "/user/"+_this.state.userInfo.id+"/news"}, 
								React.createElement("i", {className: "fa fa-bell-o"}), 
								React.createElement("span", null, "我的消息"), 
								_this.state.news!=0 ? (React.createElement("span", {className: "news"}, " ", _this.state.news)) : null
							)
						), 
						React.createElement("li", null, 
							React.createElement("a", {href: "/user/"+_this.state.userInfo.id+"/draft"}, 
								React.createElement("i", {className: "fa fa-inbox"}), 
								React.createElement("span", null, "我的草稿箱")
							)
						), 
						React.createElement("li", null, 
							React.createElement("a", {href: "/user/"+_this.state.userInfo.id+"/store"}, 
								React.createElement("i", {className: "fa fa-bookmark"}), 
								React.createElement("span", null, "我的收藏")
							)
						), 
						React.createElement("li", null, 
							React.createElement("a", {href: "/user/"+_this.state.userInfo.id+"/settings"}, 
								React.createElement("i", {className: "fa fa-cogs"}), 
								React.createElement("span", null, "设置")
							)
						), 
						
							(_this.state.userInfo.id == 5) ? (
								React.createElement("li", null, 
									React.createElement("a", {href: "/user/"+_this.state.userInfo.id+"/bugs"}, 
										React.createElement("i", {className: "fa fa-question-circle"}), 
										React.createElement("span", null, "bug反馈")
									)
								)
							) : null, 
						
						
						React.createElement("li", null, 
							React.createElement("a", {"data-href": "/sign_out", onClick: this.handleClick}, 
								React.createElement("i", {className: "fa fa-sign-out"}), 
								React.createElement("span", null, "退出")
							)
						)
					)
				)
			);
		}
	});

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				userInfo: [],
				len: -1,
			}
		},
		render: function() {
			var _this = this;
			var len = _this.state.len;
			return (
				React.createElement("div", {className: "drop-menu"}, 
					 
						(len >= 0) ? ( (len==0) ? React.createElement(Login, null) : React.createElement(User, {info: _this.state.userInfo})) : null
					
				)
			);
		}
	});

});