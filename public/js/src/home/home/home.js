define([
	'react',
	'jquery',
	'home/common/leftNav'
	],function(React, $, LeftNav) {

	return React.createClass({
		mixins: [],
		getInitialState: function() {
			return {
				name: 'home',
				navActive: '',
			}
		},
		
		render: function() {
			return (
				<div>
					<div><a className="btn" href="/sign_in">登陆</a></div>
					<div><a className="btn" href="/sign_up">注册</a></div>
					<LeftNav active={this.state.navActive} />
				</div>
			);
		}
	});

});