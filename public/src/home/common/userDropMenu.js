
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
	            UserModel.getUserInfoByLogin(function(success, data) {
	                if(success) {
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
			
			UserModel.getNewsCount(_this.state.userInfo.id,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							news: data.data
						});
					}
				}
			});

			setTimeout(function() {
				_this.getNewsCount();
			},1000*60);
		},
		handleClick: function() {
			UserModel.signOut(function(success,data){
				if(success) {
					if(!data.error) {
						WQ.cookie.empty();
						window.location.href="/";
					}
				}
			});
		},
		render: function() {
			var _this = this;
								
			return (
				<div>
					<a className="user avatar dropdown" data-toggle="dropdown" href="javascript:void(0);">
						<img src={(_this.state.userInfo.userUrl!='') ? _this.state.userInfo.userUrl : "/image/user-default.png"} />
						<b className="caret"></b>
						{
							this.state.news!=0 ?  <b className="news"></b> : null
						}
					</a>
					<ul className="dropdown-menu arrow-top">
						<li>
							<a href="/article/add">
								<i className="fa fa-pencil"></i>
								<span>写文章</span>
							</a>
						</li>
						<li>
							<a href={"/user/"+WQ.cookie.get('id')}>
								<i className="fa fa-user"></i>
								<span>我的主页</span>
							</a>
						</li>
						<li>
							<a href={"/user/"+WQ.cookie.get('id')+"/news"}>
								<i className="fa fa-bell-o"></i>
								<span>我的消息</span>
								{_this.state.news!=0 ? (<span className="news"> {_this.state.news}</span>) : null }
							</a>
						</li>
						<li>
							<a href={"/user/"+WQ.cookie.get('id')+"/draft"}>
								<i className="fa fa-inbox"></i>
								<span>我的草稿箱</span>
							</a>
						</li>
						<li>
							<a href={"/user/"+WQ.cookie.get('id')+"/store"}>
								<i className="fa fa-bookmark"></i>
								<span>我的收藏</span>
							</a>
						</li>
						<li>
							<a href={"/user/"+WQ.cookie.get('id')+"/settings"}>
								<i className="fa fa-cogs"></i>
								<span>设置</span>
							</a>
						</li>
						<li>
							<a data-href="/sign_out" onClick={this.handleClick}>
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