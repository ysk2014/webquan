
define(['react', 'jquery', 'home/model/userModel'],function(React, $, UserModel) {

	var mixin = {
		init: function() {
			var _this = this;
            UserModel.getUserInfoByLogin(function(success, data) {
                if(success) {
					_this.setState({
						userInfo : data ? data : []
					});
                }
            });
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				userInfo: [],
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var len = _this.state.userInfo.length;
			return (
				<div className="drop-menu">
					{ 
						(len <= 0) ? (
							<div>
								<a className="login" href="/login">
									<i className="fa fa-user"></i>
									<span>注册</span>
								</a>
								<a className="login" href="/login">
									<i className="fa fa-sign-in"></i>
									<span>登陆</span>
								</a>
							</div>
						) : (
							<div>
								<a></a>
							</div>
						)
					}
					
				</div>
			);
		}
	});

});