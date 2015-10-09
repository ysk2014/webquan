
define(['react','jquery'],function(React, $) {

	var Tooltip = function(content) {
		return new Tooltip.propotype.init(content);
	};

	Tooltip.propotype = {
		init: function() {

		},
	};

	editormd.fn.init.prototype = editormd.fn; 
	
	return Tooltip;
});