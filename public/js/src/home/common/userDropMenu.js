
define(['react', 'jquery', 'home/model/userModel'],function(React, $, UserModel) {

	var mixin = {
		init: function() {
			var _this = this;
            UserModel.getUserInfo(function(success, data) {
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
								<div><a href="/login">登陆</a></div>
								<div><a href="/login">注册</a></div>
							</div>
						) : null
					}
					
				</div>
			);
		}
	});

});