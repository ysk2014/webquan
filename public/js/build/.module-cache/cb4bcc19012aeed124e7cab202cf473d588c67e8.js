define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/common/leftNav',
	'home/common/userDropMenu',
	'home/common/tooltip',
	],function( React, $, WQ, CloumnModel, LeftNav, UserDropMenu, Tooltip) {


	var mixin = {
		init: function() {
			var _this = this;
			var aid = _this.state.aid;
			
			return this;
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
			this.init();
		},
		render: function() {

			return (
				React.createElement("div", null, 
					React.createElement(UserDropMenu, null), 
					React.createElement(LeftNav, {active: this.state.name}), 

					React.createElement("div", {className: "cloumn-edit"}, 
						React.createElement("form", null, 
							React.createElement("h3", null, "新建专题"), 
							React.createElement("div", {className: "input-prepend"})
						)
					)
				)
			);
		}
	});

});