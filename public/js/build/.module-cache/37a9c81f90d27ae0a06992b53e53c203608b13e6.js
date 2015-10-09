define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
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
							React.createElement("div", {className: "info"}, 
								React.createElement("div", {className: "cname"}, React.createElement("a", {href: "/cloumn/"+_this.state.cid}, React.createElement("h3", null, _this.state.cloumn['name'] ? _this.state.cloumn['name'] : ''))), 
								React.createElement("div", {className: "anthor"}, 
									React.createElement("a", {style: {color:'#3da9f7',marginRight:'10px'}, href: "/cloumn/"+_this.state.cid}, _this.state.cloumn['count'] ? _this.state.cloumn['count'] : 0, " 片文章"), 
									React.createElement("span", null, React.createElement("i", {className: "fa fa-user"}), "  所有者：", _this.state.cloumn['username'] ? _this.state.cloumn['username'] : '')
								), 
								React.createElement("div", {className: "cdesc"}, _this.state.cloumn['description'] ? _this.state.cloumn['description'] : ''), 
								React.createElement("div", {className: "cloumn-right"}, 
									React.createElement("a", {className: "btn-success"}, "添加关注")
								)
							)

						)
					)
				)
			);
		}
	});

});