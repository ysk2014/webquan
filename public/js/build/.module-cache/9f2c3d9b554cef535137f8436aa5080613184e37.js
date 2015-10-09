
define(['react','jquery'],function(React, $) {

	var Tooltip = function(content) {
		return new Tooltip.propotype.init(content);
	};

	Tooltip.propotype = {
		init: function(content) {
			var AlertBox = React.createClass({displayName: "AlertBox",
				render: function() {
					return (
						React.createElement("div", {className: "alert-box"}, 
							React.createElement("p", null, content)
						)
					);
				}
			});
		},
	};

	// Tooltip.prototype.init.prototype = Tooltip.prototype; 

	return Tooltip;
});