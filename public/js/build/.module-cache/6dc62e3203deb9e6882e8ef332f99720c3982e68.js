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
			_this.getAllCloumns('view');
			
			return this;
		},
		// 获取所有专题
		getAllCloumns: function(way){
			var _this = this;
			var params = {way:way};
			CloumnModel.getAllCloumns(params,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
						if(_this.state.cloumns['square']) {
							Array.prototype.push.apply(_this.state.cloumns['square'],data.data);
						} else {
							_this.state.cloumns['square'] = data.data;
						}
						_this.setState({
							cloumns: _this.state.cloumns,
						});	
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
		// 获取我的专题
		getCloumnsByUid: function() {
			var _this = this;
			var uid = WQ.cookie.get('id');
			CloumnModel.getCloumnsByUid(uid,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
						if(_this.state.cloumns['me']) {
							Array.prototype.push.apply(_this.state.cloumns['square'],data.data);
						} else {
							_this.state.cloumns['me'] = data.data;
						}
						_this.setState({
							cloumns: _this.state.cloumns,
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
		// 一级导航切换
		hamdleTabChange: function(event) {
			var index = $(event.target).index();
			if(_this.state.nav == index) return;
			_this.setState({
				nav: index,
			});
			if(!_this.state.cloumns['me'] && _this.state.nav==2) {
				
			}
		},
		// 二级导航切换
		hamdleNavChange: function(event) {
			var _this = this;
			var index = $(event.target).parent().index();
			_this.setState({
				navChild: index,
			});
			_this.getAllCloumns(_this.state.order[index]);
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'cloumn',
				nav: 0,
				navChild: 0,
				cloumns: {},
				order: ['view','update_time','care','addtime'],
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var nav = _this.state.nav;
			if(nav==0) {
				var articles = _this.state.cloumns.map(function(d,i) {
					return (
						React.createElement("li", {key: d.id, className: "cloumn"}, 
							React.createElement("a", {href: "/cloumn/"+d.id}, 
								React.createElement("div", {className: "logo", style: {background:'url("/image/cloumn.jpg") no-repeat center',backgroundSize:'cover'}}), 
								React.createElement("h4", null, React.createElement("a", {href: "/cloumn/"+d.id}, d.name)), 
								React.createElement("div", {className: "desc"}, d.description), 
								React.createElement("p", null, 
									React.createElement("a", {href: "/cloumn/"+d.id}, d.count, "篇文章"), "·", React.createElement("span", null, d.care, "人关注"), 
									React.createElement("a", {className: "btn-success"}, "添加关注")
								)
							)
						)
					);
				});
			} else if(nav==1) {

			} else {
				// var articles
			}

			return (
				React.createElement("div", null, 
					React.createElement(UserDropMenu, null), 
					React.createElement(LeftNav, {active: this.state.name}), 

					React.createElement("div", {className: "header"}, 
						React.createElement("div", {className: "nav"}, 
							React.createElement("a", {className: nav==0 ? "tab active" : "tab", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "专题广场"), 
							React.createElement("a", {className: nav==1 ? "tab active" : "tab", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "我关注的"), 
							React.createElement("a", {className: nav==2 ? "tab active" : "tab", onClick: this.hamdleTabChange, href: "javascript:void(0)"}, "我的专题")
						), 
						React.createElement("a", {className: "btn-success pull-right", href: "/cloumn/add"}, "添加专题")
					), 

					React.createElement("div", {className: "cloumn-list"}, 
						React.createElement("div", {style: _this.state.nav==0 ? {display:'block'} : {display:'none'}}, 
							React.createElement("ul", {className: "orderBy-nav clearfix"}, 
								React.createElement("li", {className: _this.state.navChild==0 ? "active" : ""}, React.createElement("a", {href: "javascript:void(0)", onClick: _this.hamdleNavChange}, "热门排序")), 
								React.createElement("li", {className: _this.state.navChild==1 ? "active" : ""}, React.createElement("a", {href: "javascript:void(0)", onClick: _this.hamdleNavChange}, "最近更新")), 
								React.createElement("li", {className: _this.state.navChild==2 ? "active" : ""}, React.createElement("a", {href: "javascript:void(0)", onClick: _this.hamdleNavChange}, "关注度排序")), 
								React.createElement("li", {className: _this.state.navChild==3 ? "active" : ""}, React.createElement("a", {href: "javascript:void(0)", onClick: _this.hamdleNavChange}, "最新创建排序"))
							), 
							React.createElement("ul", {style: {marginLeft:'30px'}}, articles)
						), 
						React.createElement("div", {style: _this.state.nav==1 ? {display:'block'} : {display:'none'}}

						), 	
						React.createElement("div", {style: _this.state.nav==2 ? {display:'block'} : {display:'none'}}
							
						)					
					)
				)
			);
		}
	});

});