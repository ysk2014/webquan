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
			
			return this;
		},
		handleNameChange: function(event) {
			this.setState({
				name: event.target.value
			});
		},
		handleDescChange: function() {},
		handleSubmit: function() {

		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				nav: 'cloumn',
				name: '',
				description: '',
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			return (
				React.createElement("div", null, 
					React.createElement(UserDropMenu, null), 
					React.createElement(LeftNav, {active: this.state.nav}), 

					React.createElement("div", {className: "cloumn-edit"}, 
						React.createElement("form", null, 
							React.createElement("h3", null, "新建专题"), 
							React.createElement("div", {className: "input-prepend"}, 
								React.createElement("input", {type: "text", placeholder: "专题命名，使用尽量少的字来描述", value: _this.state.name, onChange: _this.handleNameChange})
							), 
							React.createElement("div", {className: "input-prepend"}, 
								React.createElement("textarea", {name: "description", maxLength: "200", placeholder: "请以200字以内为专题添加描述", value: _this.state.description, onChange: _this.handleDescChange})
							), 
							React.createElement("input", {type: "button", className: "btn-success btn-large", value: "创建专题", onClick: _this.handleSubmit})
						)
					)
				)
			);
		}
	});

});