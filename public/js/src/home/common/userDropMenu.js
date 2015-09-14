
define(['react', 'jquery', 'home/model/userModel', 'jqueryextend'],function(React, $, UserModel) {

	var mixin = {
		init: function() {
			var _this = this;
            UserModel.getUserInfoByLogin(function(success, data) {
                if(success) {
                	console.log(data);
					_this.setState({
						userInfo : data.userInfo ? data.userInfo : [],
						len: data.userInfo ? data.userInfo.length: 0,
					});
                }
            });
		},
		componentDidMount: function() {
			this.init();
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
		render: function() {
			return (
				<div>
					<a className="user avatar dropdown" data-toggle="dropdown" href="javascript:void(0);">
						<img src="/image/user-default.png" />
						<b className="caret"></b>
					</a>
					<ul className="dropdown-menu arrow-top">
						<li>
							<a href="/article/edit">
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
							<a href="/sign_out">
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
						(len >= 0) ? <Login /> : <User info={_this.state.userInfo}/>
					}
				</div>
			);
		}
	});

});