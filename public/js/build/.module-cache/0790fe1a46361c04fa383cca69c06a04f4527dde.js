
define(['react','jquery'],function(React, $) {

	var Tooltip = function(content) {
		return new Tooltip.propotype.init(content);
	};

	Tooltip.propotype = {
		init: function(content) {
			var AlertBox = React.createClass({displayName: "AlertBox",
				componentDidMount: function() {
					var _this = this;
					var alertBox = $(_this.getDOMNode());
					
					$('#mask').show();
					alertBox.css('margin-left',-parseInt(alertBox.width())/2);

					setTimeout(function() {
						React.unmountComponentAtNode($('#mask').get(0));
						$('#mask').hide();
					},1000);
				},
				render: function() {
					return (
						React.createElement("div", {ref: "dialogBox", className: "alert-box"}, 
							React.createElement("p", null, content)
						)
					);
				}
			});
			React.render(React.createElement(AlertBox, null),$('#mask').get(0));
		},
	};

	return Tooltip;
});