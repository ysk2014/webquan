define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/common/tooltip',
	],function( React, $, WQ, CloumnModel, Tooltip) {

	var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
			var uid = _this.state.uid;
			var params = {uid:uid, page:page};
			CloumnModel.getCloumnsByUid(params,function(success,data) {
				if(success) {
					if(!data.error) {
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
		// 获取用户关注的专题
		getCareCloumnsByUid: function(page) {
			var _this = this;
			var uid = _this.state.uid;
			var params = {uid:uid, page:page};
			CloumnModel.getCareCloumnsByUid(params,function(success,data) {
				if(success) {
					if(!data.error) {
						if(_this.state.cloumns['myCare']) {
							Array.prototype.push.apply(_this.state.cloumns['me'],data.data);
							_this.state.next['myCare'] = data.next;
							_this.state.page['myCare'] = parseInt(page)+1;
						} else {
							_this.state.cloumns['myCare'] = data.data;
							_this.state.next = {'myCare':data.next};
							_this.state.page = {'myCare':parseInt(page)+1};
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
		// 分页
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
			if(!_this.state.cloumns['me'] && index==1) {
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
			if(!_this.state.cloumns[_this.state.order[index]]) {
				_this.getAllCloumns(_this.state.order[index],0);
			}
			
		},
		// 添加和取消关注
		handleCare: function(event) {
			var _this = this;
			var nav = _this.state.nav;
			var navChild = _this.state.navChild;
			var ele = $(event.target);
			var index = ele.parents('li').data('key');
			var myCare = ele.data('care');
			var cid = ele.parents('li').data('cid');
			var uid = _this.state.uid;
			var dataObj = {cid:cid,uid:uid};

			if(!uid) {
				window.location.href='login/sign_in';
				return;
			}

			var changeCare = function(status) {
				if(status) {
					var num = 1;
				} else {
					var num = -1;
				}
				if(nav==0) {
					if(navChild==0) {
						_this.state.cloumns['view'][index]['myCare'] = status;
						var care = _this.state.cloumns['view'][index]['care'];
						_this.state.cloumns['view'][index]['care'] = parseInt(care)+num;
					} else if(navChild==1) {
						_this.state.cloumns['update_time'][index]['myCare'] = status;
						var care = _this.state.cloumns['update_time'][index]['care'];
						_this.state.cloumns['update_time'][index]['care'] = parseInt(care)+num;
					} else if(navChild==2) {
						_this.state.cloumns['care'][index]['myCare'] = status;
						var care = _this.state.cloumns['care'][index]['care'];
						_this.state.cloumns['care'][index]['care'] = parseInt(care)+num;
					} else if(navChild==3) {
						_this.state.cloumns['addtime'][index]['myCare'] = status;
						var care = _this.state.cloumns['addtime'][index]['care'];
						_this.state.cloumns['addtime'][index]['care'] = parseInt(care)+num;
					}
				} else if(nav==1) {
					_this.state.cloumns['me'][index]['myCare'] = status;
					var care = _this.state.cloumns['me'][index]['care'];
					_this.state.cloumns['me'][index]['care'] = parseInt(care)+num;
				}
				_this.setState({
					cloumns: _this.state.cloumns
				});
				ele.data('care',status);
				if(status) {
					ele.addClass('btn-default').removeClass('btn-info');
				} else {
					ele.addClass('btn-info').removeClass('btn-default');
				}
				
			};

			if(myCare) {
				CloumnModel.delCare(dataObj,function(success,data) {
					if(success) {
						if(!data.error) {
							changeCare(false);
						} else {
							Tooltip(data.msg);
						}
					}
				});
			} else {
				CloumnModel.addCare(dataObj,function(success,data) {
					if(success) {
						if(!data.error) {
							changeCare(true);
						} else {
							Tooltip(data.msg);
						}
					}
				});
			}
		},
		// 关注按钮鼠标移动事件
		handleOver: function(event) {
			var span = $(event.target);
			if(span.html() =='正在关注') {
				span.html('取消关注');
			}
		},
		// 关注按钮鼠标移动事件
		handleOut: function(event) {
			var span = $(event.target);
			if(span.html() =='取消关注') {
				span.html('正在关注');
			}
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'cloumn',
				uid: WQ.cookie.get('id') ? WQ.cookie.get('id') : 0,
				nav: 0,               //一级导航，0:专题广场, 1:我关注的, 2:我的专题
				navChild: 0,          //二级导航，0：view，1：update_time，2：care，3：addtime
				cloumns: {},          //专题数据列表
				order: ['view','update_time','care','addtime'], //二级导航对应的key值
				next:{},   //根据导航状态进行分页
				page:{},   //记录导航状态下的页面
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var nav = _this.state.nav;
			var next = _this.state.order[_this.state.navChild];

			document.title = '专题广场 | Web圈';
			
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
				var cloumns = _this.state.cloumns['me'] ? _this.state.cloumns['me'] : [];
				
			}

			var cloumnList = cloumns.map(function(d,i) {
				return (
					<li key={d.id} data-cid={d.id} data-key={i} className="cloumn">
						<a href={"/cloumn/"+d.id}>
							<div className="logo" style={
								d.logo_dir ? {background:'url("'+d.logo_dir+'") no-repeat center',backgroundSize:'cover'}
										   : {background:'url("/image/cloumn.jpg") no-repeat center',backgroundSize:'cover'}
							}></div>
							<h4><a href={"/cloumn/"+d.id}>{d.name}</a></h4>
							<div className="desc">{d.description}</div>
							<p>
								<a href={"/cloumn/"+d.id}>{d.count}篇文章</a>·<span>{d.care}人关注</span>
								<a className={d.myCare ? "btn btn-default pull-right" : "btn btn-info pull-right"} href="javascript:void(0)" data-care={d.myCare ? d.myCare : false} onClick={_this.handleCare} onMouseEnter={_this.handleOver} onMouseLeave={_this.handleOut} >{d.myCare ? '正在关注' : '添加关注'}</a>
							</p>
						</a>
					</li>
				);
			});
			return (
				
					<div className="cloumn-list-page">
						<div className="top-bar">
							<div className="nav">
								<a className={nav==0 ? "tab active" : "tab"} onClick={this.hamdleTabChange} href="javascript:void(0)">专题广场</a>
								<a className={nav==1 ? "tab active" : "tab"} style={_this.state.uid ? {display:'inline-block'} : {display:'none'}} onClick={this.hamdleTabChange} href="javascript:void(0)">我的专题</a>
							</div>
							<a className="btn btn-info pull-right" style={{margin:'10px 120px 0 0'}} href="/cloumn/add">添加专题</a>
						</div>
						<ReactCSSTransitionGroup transitionName="fade" transitionAppear={true}>
							<div className="cloumn-list">
								<div style={_this.state.nav==0 ? {display:'block'} : {display:'none'}}>
									<ul className="nav-orderBy clearfix" style={{marginLeft: '35px'}}>
										<li><a className={_this.state.navChild==0 ? "btn btn-info" : "btn btn-default"} href="javascript:void(0)" onClick={_this.hamdleNavChange}>热门排序</a></li>
										<li><a className={_this.state.navChild==1 ? "btn btn-info" : "btn btn-default"} href="javascript:void(0)" onClick={_this.hamdleNavChange}>最近更新</a></li>
										<li><a className={_this.state.navChild==2 ? "btn btn-info" : "btn btn-default"} href="javascript:void(0)" onClick={_this.hamdleNavChange}>关注度排序</a></li>
										<li><a className={_this.state.navChild==3 ? "btn btn-info" : "btn btn-default"} href="javascript:void(0)" onClick={_this.hamdleNavChange}>最新创建排序</a></li>
									</ul>
									<ul className="clearfix">{cloumnList}</ul>
									<a className="more" style={_this.state.next[next] ? {display:'block'} : {display:'none'}} onClick={_this.handleMore}>更多</a>
								</div>
								<div style={_this.state.nav==1 ? {display:'block'} : {display:'none'}}>
									<ul className="clearfix">{cloumnList}</ul>
									<a className="btn btn-default btn-large" style={_this.state.next['me'] ? {display:'block',margin:'20px auto'} : {display:'none',margin:'20px auto'}} onClick={_this.handleMore}>更多</a>
								</div>	
							</div>
						</ReactCSSTransitionGroup>
					</div>

			);
		}
	});

});