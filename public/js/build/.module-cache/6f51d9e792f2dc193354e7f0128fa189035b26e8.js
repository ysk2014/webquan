
define(['react','jquery'],function(React, $) {

	var Tooltip = function(content) {
		return new Tooltip.propotype.init(content);
	};

	Tooltip.propotype = {
		init: function() {

		},
	};

	Tooltip.fn.init.prototype = Tooltip.fn; 
	
	return Tooltip;
});