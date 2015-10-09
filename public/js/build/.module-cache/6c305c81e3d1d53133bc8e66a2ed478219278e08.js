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
							cName: data.data['name'],
							cDescription: data.data['description'],
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
				cloumn: {}
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {

			return (
				React.createElement("div", null, 
					React.createElement(UserDropMenu, null), 
					React.createElement(LeftNav, {active: this.state.name}), 

					React.createElement("div", {className: "header"}, 
						React.createElement("div", {className: "nav"}, 
							React.createElement("a", {className: "tab active", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "专题广场"), 
							React.createElement("a", {className: "tab", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "我关注的"), 
							React.createElement("a", {className: "tab", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "我的专题")
						), 
						React.createElement("a", {className: "btn-success pull-right", href: "/cloumn/add"}, "添加专题")
					), 

					React.createElement("div", {className: "cloumn-list"}, 
						React.createElement("ul", {className: "orderBy-nav"}, 
							React.createElement("li", {className: "active"}, React.createElement("a", {href: "javascript:void(0)"}, "热门排序")), 
							React.createElement("li", {className: ""}, React.createElement("a", {href: "javascript:void(0)"}, "最近更新")), 
							React.createElement("li", {className: ""}, React.createElement("a", {href: "javascript:void(0)"}, "关注度排序"))
						)
					)
				)
			);
		}
	});

});