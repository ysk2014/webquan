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
						React.createElement("form", {action: "", method: "post"}, 
							React.createElement("h3", null, "新建专题"), 
							React.createElement("div", {className: "input-prepend"}, 
								React.createElement("input", {type: "text", placeholder: "专题命名，使用尽量少的字来描述"})
							), 
							React.createElement("div", {className: "input-prepend"}, 
								React.createElement("textarea", {name: "description", maxLength: "200", placeholder: "请以200字以内为专题添加描述"})
							), 
							React.createElement("input", {type: "submit", className: "btn-success btn-large", value: "创建专题"})
						)
					)
				)
			);
		}
	});

});