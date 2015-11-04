
define(['react','jquery'],function(React, $) {

	var Tooltip = function(content) {
		return new Tooltip.propotype.init(content);
	};

	Tooltip.propotype = {
		init: function(content) {
			var AlertBox = React.createClass({
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
						<div ref="alertBox" className="alert-box">
							<p>{content}</p>
						</div>
					);
				}
			});
			React.render(<AlertBox />,$('#mask').get(0));
		},
	};

	return Tooltip;
});