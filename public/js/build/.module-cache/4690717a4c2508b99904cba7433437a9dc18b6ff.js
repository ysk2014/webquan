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
						if(_this.state.cloumns[way]) {
							Array.prototype.push.apply(_this.state.cloumns[way],data.data);
							_this.state.next[way] = data.next;
							_this.state.page[way] = parseInt(page)+1;
						} else {
							_this.state.cloumns[way] = data.data;
							_this.state.next[way] = data.next;
							_this.state.page[way] = parseInt(page)+1;
						}
						_this.setState({
							cloumns: _this.state.cloumns,
							next: _this.state.next,
							page: _this.state.page,
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
							Array.prototype.push.apply(_this.state.cloumns['me'],data.data);
							_this.state.next['me'] = data.next;
							_this.state.page['me'] = parseInt(page)+1;
						} else {
							_this.state.cloumns['me'] = data.data;
							_this.state.next = {'me':data.next};
							_this.state.page = {'me':parseInt(page)+1};
						}
						_this.setState({
							cloumns: _this.state.cloumns,
							next: _this.state.next,
							page: _this.state.page,
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
		handleMore: function() {
			var _this = this;
			if(_this.state.nav==0) {
				if(_this.state.navChild==0) {
					var page = _this.state.page['view'] ? _this.state.page['view'] : 0;
				} else if(_this.state.navChild==1) {
					var page = _this.state.page['update_time'] ? _this.state.page['update_time'] : 0;
				} else if(_this.state.navChild==2) {
					var page = _this.state.page['care'] ? _this.state.page['care'] : 0;
				} else if(_this.state.navChild==3) {
					var page = _this.state.page['addtime'] ? _this.state.page['addtime'] : 0;
				}
				_this.getAllCloumns(_this.state.order[_this.state.navChild],page);
			} else if(_this.state.nav==1) {

			} else if(_this.state.nav==2) {
				var page = _this.state.page['me'] ? _this.state.page['me'] : 0;
				_this.getCloumnsByUid(page);
			}
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
			console.log(_this.state.cloumns);
			if(!_this.state.cloumns[_this.state.order[index]]) {
				_this.getAllCloumns(_this.state.order[index],0);
			}
			
		},
		handleCare: function(event) {
			var myCare = $(event.target).data('care')
			if(myCare) {
				CloumnModel.delCare(data,function(success,data) {
					
				});
			} else {
				CloumnModel.addCare(data,function(success,data) {

				});
			}
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
				page:{},
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var nav = _this.state.nav;
			var next = _this.state.order[_this.state.navChild];
			if(nav==0) {
				if(_this.state.navChild==0) {
					var cloumns = _this.state.cloumns['view'] ? _this.state.cloumns['view'] : [];
				} else if(_this.state.navChild==1) {
					var cloumns = _this.state.cloumns['update_time'] ? _this.state.cloumns['update_time'] : [];
				} else if(_this.state.navChild==2) {
					var cloumns = _this.state.cloumns['care'] ? _this.state.cloumns['care'] : [];
				} else if(_this.state.navChild==3) {
					var cloumns = _this.state.cloumns['addtime'] ? _this.state.cloumns['addtime'] : [];
				}
			} else if(nav==1) {
				var cloumns = _this.state.cloumns['myCare'] ? _this.state.cloumns['myCare'] : [];
			} else {
				var cloumns = _this.state.cloumns['me'] ? _this.state.cloumns['me'] : [];
				
			}

			var cloumnList = cloumns.map(function(d,i) {
				return (
					React.createElement("li", {key: d.id, className: "cloumn"}, 
						React.createElement("a", {href: "/cloumn/"+d.id}, 
							React.createElement("div", {className: "logo", style: 
								d.logo_dir ? {background:'url("'+d.logo_dir+'") no-repeat center',backgroundSize:'cover'}
										   : {background:'url("/image/cloumn.jpg") no-repeat center',backgroundSize:'cover'}
							}), 
							React.createElement("h4", null, React.createElement("a", {href: "/cloumn/"+d.id}, d.name)), 
							React.createElement("div", {className: "desc"}, d.description), 
							React.createElement("p", null, 
								React.createElement("a", {href: "/cloumn/"+d.id}, d.count, "篇文章"), "·", React.createElement("span", null, d.care, "人关注"), 
								React.createElement("a", {className: "btn-success", "data-care": d.myCare ? d.myCare : false, onClick: _this.handleCare}, d.myCare ? '取消' : '添加', "关注")
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
							React.createElement("ul", {style: {marginLeft:'30px'}, className: "clearfix"}, cloumnList), 
							React.createElement("a", {className: "more", style: _this.state.next[next] ? {display:'block'} : {display:'none'}, onClick: _this.handleMore}, "更多")
						), 
						React.createElement("div", {style: _this.state.nav==1 ? {display:'block'} : {display:'none'}}, 
							React.createElement("ul", {style: {marginLeft:'30px'}, className: "clearfix"}, cloumnList)
						), 	
						React.createElement("div", {style: _this.state.nav==2 ? {display:'block'} : {display:'none'}}, 
							React.createElement("ul", {style: {marginLeft:'30px'}, className: "clearfix"}, cloumnList), 
							React.createElement("a", {className: "more", style: _this.state.next['me'] ? {display:'block'} : {display:'none'}, onClick: _this.handleMore}, "更多")
						)					
					)
				)
			);
		}
	});

});