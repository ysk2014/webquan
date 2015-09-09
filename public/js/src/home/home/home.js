define([
	'react',
	'jquery',
	'home/common/leftNav',
	'home/common/userDropMenu',
	],function(React, $, LeftNav, UserDropMenu) {


	var mixin = {
		init: function() {
			var state = {};
			return state;
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'home',
			}
		},
		componentDidMount: function() {
			this.stateChange(mixin.init());
		},
		stateChange: function(state) {
			this.setState(state);
		},
		render: function() {
			return (
				<div>
					<UserDropMenu />
					<LeftNav active={this.state.name} />
				</div>
			);
		}
	});

});