
define(['react','jquery'],function(React, $) {

	var Tooltip = function(content) {
		return new Tooltip.propotype.init(content);
	};
	var modal = {
		container: {
			position: 'absolute',
			top: '10%',
			left: '50%',
			display: 'block',
		},
		title: {
			width: '400px',
		},
		desc: {
			width: '400px',
			height: '200px',
			marginTop: '10px',
			resize: 'none',
			outline: 'none',
		}
		
	};
	Tooltip.propotype = {
		init: function(content) {
			var AlertBox = React.createClass({displayName: "AlertBox",
				componentDidMount: function() {
					var _this = this;
					var alertBox = $(_this.getDOMNode());
					
					$('#mask').show();
					// alertBox.css('margin-left',-parseInt(alertBox.width())/2);

					// setTimeout(function() {
					// 	React.unmountComponentAtNode($('#mask').get(0));
					// 	$('#mask').hide();
					// },1000);
				},
				render: function() {
					return (
						React.createElement("div", {ref: "dialogBox", className: "editormd-dialog", style: modal.container}, 
							React.createElement("div", {className: "editormd-dialog-header"}, React.createElement("strong", {class: "editormd-dialog-title"}, "添加标签")), 
							React.createElement("a", {href: "javascript:;", className: "fa fa-close editormd-dialog-close"}), 
							React.createElement("div", {className: "editormd-dialog-container"}, 
								React.createElement("div", {className: "editormd-form"}, 
									React.createElement("input", {type: "text", style: modal.desc, placeholder: "标签名称"}), React.createElement("br", null), 
									React.createElement("textarea", {style: modal.desc})
								), 
								React.createElement("div", {className: "editormd-dialog-footer"}, 
									React.createElement("button", {className: "editormd-btn editormd-enter-btn"}, "确定"), 
									React.createElement("button", {className: "editormd-btn editormd-cancel-btn"}, "取消")
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