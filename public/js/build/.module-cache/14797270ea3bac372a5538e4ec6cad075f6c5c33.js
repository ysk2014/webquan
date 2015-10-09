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
						React.createElement("ul", {className: "orderBy-nav"}, 
							React.createElement("li", {className: "active"}, React.createElement("a", {href: "javascript:void(0)"}, "热门排序")), 
							React.createElement("li", {className: ""}, React.createElement("a", {href: "javascript:void(0)"}, "最近更新")), 
							React.createElement("li", {className: ""}, React.createElement("a", {href: "javascript:void(0)"}, "关注度排序"))
						)
					)
				)
			);
		}
	});

});