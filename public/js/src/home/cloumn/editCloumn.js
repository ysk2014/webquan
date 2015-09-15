define([
	'react',
	'jquery',
	'home/common/leftNav',
	'home/common/userDropMenu',
	],function(React, $, LeftNav, UserDropMenu) {


	var mixin = {
		init: function() {
			
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'cloumn',
			}
		},
		componentDidMount: function() {
			
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