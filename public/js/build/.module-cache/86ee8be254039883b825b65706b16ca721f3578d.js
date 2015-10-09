
define(['react','jquery','home/model/articleModel'],function(React, $, articleModel) {

	var Tooltip = function(opt) {
		return new Tooltip.propotype.init(opt);
	};
	var modal = {
		container: {
			position: 'absolute',
			top: '10%',
			left: '50%',
			display: 'block',
			marginLeft: '-219px'
		},
		title: {
			width: '400px',
			color:'#555',
		},
		desc: {
			width: '400px',
			height: '100px',
			marginTop: '10px',
			resize: 'none',
			outline: 'none',
			padding: '8px',
			border: '1px solid #ddd',
			color: '#555',
		}
		
	};
	Tooltip.propotype = {
		init: function(opt) {
			var AlertBox = React.createClass({displayName: "AlertBox",
				getInitialState: function() {
					return {
						name: opt.name ? opt.name : '',
						description: opt.description ? opt.description : '',
					};
				},
				componentDidMount: function() {
					var _this = this;
					var alertBox = $(_this.getDOMNode());
					
					$('#mask').show();
				},
				handleOk: function() {

				},
				handleClose: function(event) {
					event.stopPropagation();
					event.preventDefault();
					React.unmountComponentAtNode($('#mask').get(0));
					$('#mask').hide();
				},
				handleNameChange: function(event) {
					var _this = this;
					_this.setState({
						name: event.target.value
					});
				},
				handleDescChange: function(event) {
					var _this = this;
					_this.setState({
						description: event.target.value
					});
				},
				render: function() {
					var _this = this;
					return (
						React.createElement("div", {ref: "dialogBox", className: "editormd-dialog", style: modal.container}, 
							React.createElement("div", {className: "editormd-dialog-header"}, React.createElement("strong", {class: "editormd-dialog-title"}, "添加标签")), 
							React.createElement("a", {href: "javascript:;", className: "fa fa-close editormd-dialog-close", onClick: _this.handleClose}), 
							React.createElement("div", {className: "editormd-dialog-container"}, 
								React.createElement("div", {className: "editormd-form"}, 
									React.createElement("input", {type: "text", style: modal.title, value: _this.state.name, onChange: _this.handleNameChange, placeholder: "标签名称"}), React.createElement("br", null), 
									React.createElement("textarea", {style: modal.desc, onChange: _this.handleDescChange, value: _this.state.description, placeholder: "请对此标签补充一些描述，以供他人参考"})
								), 
								React.createElement("div", {className: "editormd-dialog-footer"}, 
									React.createElement("button", {className: "editormd-btn editormd-enter-btn", onClick: _this.handleOk}, "确定"), 
									React.createElement("button", {className: "editormd-btn editormd-cancel-btn", onClick: _this.handleClose}, "取消")
								)
							)
						)
					);
				}
			});
			React.render(React.createElement(AlertBox, null),$('#mask').get(0));
		},
	};

	return Tooltip;
});