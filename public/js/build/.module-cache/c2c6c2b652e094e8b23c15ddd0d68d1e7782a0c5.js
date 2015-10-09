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
			CloumnModel.getCloumnById(_this.state.cid,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
						_this.setState({
							cloumn: data.data
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});			
			return this;
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'cloumn',
				cid: this.props.params.id ? this.props.params.id : 0,
				cloumn: {},
				article: [],
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
					React.createElement(LeftNav, {active: this.state.name}), 
					
					React.createElement("div", {className: "cloumn-page"}, 
						React.createElement("div", {className: "cloumn-header"}, 
							React.createElement("div", {className: "cname"}, React.createElement("h3", null, "专题名：", _this.state.cloumn['name'] ? _this.state.cloumn['name'] : '')), 
							React.createElement("div", {className: "cdesc"}, _this.state.cloumn['description'] ? _this.state.cloumn['description'] : '')
						)
					)
				)
			);
		}
	});

});