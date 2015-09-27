
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
					len: 2,
				})
			} else {
	            UserModel.getUserInfoByLogin(function(success, data) {
	                if(success) {
	                	if(data.userInfo) {
	                		var userInfo = {username: data.userInfo.username, id: data.userInfo.id};
							_this.setState({
								userInfo : userInfo,
								len: 2,
							});
							WQ.cookie.set(userInfo,1);
	                	} else {
							_this.setState({
								userInfo : [],
								len: 0,
							});
	                	}
	                	
	                }
	            });
			}
		},
		componentDidMount: function() {
			this.getUserInfo();
		},
	};

	var Login = React.createClass({
		render: function() {
			return (
				<div>
					<a className="login" href="/login/sign_up">
						<i className="fa fa-user"></i>
						<span>注册</span>
					</a>
					<a className="login" href="/login/sign_in">
						<i className="fa fa-sign-in"></i>
						<span>登陆</span>
					</a>
				</div>
			);
		}
	});

	var User = React.createClass({
		getInitialState: function() {
			return {
				userInfo: this.props.info,
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
		},

		handleClick: function() {
			if(WQ.cookie.empty()) {
				window.location.href = "/sign_out"; 
			}
		},
		render: function() {
			return (
				<div>
					<a className="user avatar dropdown" data-toggle="dropdown" href="javascript:void(0);">
						<img src="/image/user-default.png" />
						<b className="caret"></b>
					</a>
					<ul className="dropdown-menu arrow-top">
						<li>
							<a href="/article/add">
								<i className="fa fa-pencil"></i>
								<span>写文章</span>
							</a>
						</li>
						<li>
							<a href="/user">
								<i className="fa fa-user"></i>
								<span>我的主页</span>
							</a>
						</li>
						<li>
							<a href="/">
								<i className="fa fa-heart"></i>
								<span>我喜欢的</span>
							</a>
						</li>
						<li>
							<a href="/">
								<i className="fa fa-bookmark"></i>
								<span>我的收藏</span>
							</a>
						</li>
						<li>
							<a href="/settings">
								<i className="fa fa-asterisk"></i>
								<span>设置</span>
							</a>
						</li>
						<li>
							<a href="/sign_out" onClick={this.handleClick}>
								<i className="fa fa-sign-out"></i>
								<span>退出</span>
							</a>
						</li>
					</ul>
				</div>
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
				<div className="drop-menu">
					{ 
						(len >= 0) ? ( (len==0) ? <Login /> : <User info={_this.state.userInfo}/>) : null
					}
				</div>
			);
		}
	});

});