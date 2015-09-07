
define(['react','jquery'],function(React, $) {

	return React.createClass({
		getInitialState: function() {
			return {
				name: 'home',
			}
		},
		handleClick: function() {
			window.location.href = '/sign_in';
		},
		render: function() {
			return (
				<div>
					<div onClick={this.handleClick}>登陆</div>
					<div>注册</div>
				</div>
			);
		}
	});

});