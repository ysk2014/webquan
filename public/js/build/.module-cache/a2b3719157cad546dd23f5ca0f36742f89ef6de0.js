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
			_this.getAllCloumns('view',0);
			
			return this;
		},
		// 获取所有专题
		getAllCloumns: function(way,page){
			var _this = this;
			var params = {way:way,page:page};
			CloumnModel.getAllCloumns(params,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
						if(_this.state.cloumns['square']) {
							if(way=='view') {
								Array.prototype.push.apply(_this.state.cloumns['square']['way'],data.data);
								_this.state.next['square']['view'] = data.next;
							} else if(way=='update_time') {
								Array.prototype.push.apply(_this.state.cloumns['square']['update_time'],data.data);
								_this.state.next['square']['update_time'] = data.next;
							} else if(way=='care') {
								Array.prototype.push.apply(_this.state.cloumns['square']['care'],data.data);
								_this.state.next['square']['care'] = data.next;
							} else if(way=='addtime') {
								Array.prototype.push.apply(_this.state.cloumns['square']['addtime'],data.data);
								_this.state.next['square']['addtime'] = data.next;
							}
						} else {
							if(way=='view') {
								_this.state.cloumns['square'] = {'view':data.data};
								_this.state.next['square'] = {'view':data.next};
							} else if(way=='update_time') {
								_this.state.cloumns['square'] = {'update_time':data.data};
								_this.state.next['square'] = {'update_time':data.next};
							} else if(way=='care') {
								_this.state.cloumns['square'] = {'care':data.data};
								_this.state.next['square'] = {'care':data.next};
							} else if(way=='addtime') {
								_this.state.cloumns['square'] = {'addtime':data.data};
								_this.state.next['square'] = {'addtime':data.next};
							}
							
						}
						_this.setState({
							cloumns: _this.state.cloumns,
							next: _this.state.next
						});	
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
		// 获取我的专题
		getCloumnsByUid: function(page) {
			var _this = this;
			var uid = WQ.cookie.get('id');
			var params = {uid:uid, page:page};
			CloumnModel.getCloumnsByUid(params,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
						if(_this.state.cloumns['me']) {
							Array.prototype.push.apply(_this.state.cloumns['square'],data.data);
							_this.state.next['me'] = data.next;
						} else {
							_this.state.cloumns['me'] = data.data;
							_this.state.next = {'me':data.next}
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
			var _this = this;
			var index = $(event.target).index();
			if(_this.state.nav == index) return;
			_this.setState({
				nav: index,
			});
			if(!_this.state.cloumns['me'] && index==2) {
				_this.getCloumnsByUid(0);
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
				next:{},
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var nav = _this.state.nav;
			if(nav==0) {
				if(_this.state.cloumns['square']) {
					if(_this.state.navChild==0) {
						var cloumns = _this.state.cloumns['square']['view'];
					} else if(_this.state.navChild==1) {
						var cloumns = _this.state.cloumns['square']['update_time'];
					} else if(_this.state.navChild==2) {
						var cloumns = _this.state.cloumns['square']['care'];
					} else if(_this.state.navChild==3) {
						var cloumns = _this.state.cloumns['square']['addtime'];
					}
				} else {
					var cloumns = [];
				}
			} else if(nav==1) {
				var cloumns = _this.state.cloumns['care'] ? _this.state.cloumns['care'] : [];
			} else {
				var cloumns = _this.state.cloumns['me'] ? _this.state.cloumns['me'] : [];
				
			}
			console.log(cloumns);
			var cloumnList = cloumns.map(function(d,i) {
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
							React.createElement("ul", {style: {marginLeft:'30px'}}, cloumnList)
						), 
						React.createElement("div", {style: _this.state.nav==1 ? {display:'block'} : {display:'none'}}, 
							React.createElement("ul", {style: {marginLeft:'30px'}}, cloumnList)
						), 	
						React.createElement("div", {style: _this.state.nav==2 ? {display:'block'} : {display:'none'}}, 
							React.createElement("ul", {style: {marginLeft:'30px'}}, cloumnList)
						)					
					)
				)
			);
		}
	});

});