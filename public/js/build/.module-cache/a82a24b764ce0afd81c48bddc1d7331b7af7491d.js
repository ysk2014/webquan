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
			_this.getAllCloumns('view',nav);
			
			return this;
		},
		// 获取所有专题
		getAllCloumns: function(way){
			var _this = this;
			var params = {way:way};
			CloumnModel.getAllCloumns(params,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							cloumns: data.data
						});	
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'cloumn',
				nav: 0,
				navChild: 0,
				cloumns: [],
				careCloumns: [],
				myCloumns: [],
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

					React.createElement("div", {className: "header"}, 
						React.createElement("div", {className: "nav"}, 
							React.createElement("a", {className: _this.state.nav==0 ? "tab active" : "tab", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "专题广场"), 
							React.createElement("a", {className: _this.state.nav==1 ? "tab active" : "tab", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "我关注的"), 
							React.createElement("a", {className: _this.state.nav==2 ? "tab active" : "tab", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "我的专题")
						), 
						React.createElement("a", {className: "btn-success pull-right", href: "/cloumn/add"}, "添加专题")
					), 

					React.createElement("div", {className: "cloumn-list"}, 
						React.createElement("div", {style: _this.state.nav==0 ? {display:'block'} : {display:'none'}}, 
							React.createElement("ul", {className: "orderBy-nav"}, 
								React.createElement("li", {className: "active"}, React.createElement("a", {href: "javascript:void(0)"}, "热门排序")), 
								React.createElement("li", {className: ""}, React.createElement("a", {href: "javascript:void(0)"}, "最近更新")), 
								React.createElement("li", {className: ""}, React.createElement("a", {href: "javascript:void(0)"}, "关注度排序"))
							)
						), 
						React.createElement("div", {style: _this.state})						
					)
				)
			);
		}
	});

});