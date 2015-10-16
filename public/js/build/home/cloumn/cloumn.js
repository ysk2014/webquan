define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/model/articleModel',
	'home/common/tooltip',
	],function( React, $, WQ, CloumnModel, ArticleModel, Tooltip) {


	var mixin = {
		// 获取专题数据和专题下的所有文章
		init: function() {
			var _this = this;
			var uid = WQ.cookie.get('id') ? WQ.cookie.get('id') : 0;
			CloumnModel.getCloumnById(_this.state.cid,uid,function(success,data) {
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
			_this.getArticlesByCid('view',0);
			return this;
		},
		// 根据专题id获取文章数据
		getArticlesByCid: function(way,page) {
			var _this = this;
			var dataObj = {cid:_this.state.cid,way:way,page:page};
			ArticleModel.getAllArticleByCid(dataObj,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);

						if(_this.state.articles[way]) {
							Array.prototype.push.apply(_this.state.articles[way],data.data);
						} else {
							_this.state.articles[way] = data.data;
						}
						_this.state.more[way] = parseInt(page)+1;
						_this.setState({
							articles: _this.state.articles,
							more: _this.state.more,
							next: data.next,
						});
					} else {
						Tooltip(data.msg);
					}
				} 
			});
		},
		handleCare: function(event) {
			var _this = this;
			var ele = $(event.target);
			var myCare = ele.data('care');
			var cid = _this.state.cid;
			var uid = WQ.cookie.get('id');
			var dataObj = {cid:cid,uid:uid};

			if(myCare) {
				CloumnModel.delCare(dataObj,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.cloumn['careStatus'] = !_this.state.cloumn['careStatus'];
							_this.state.cloumn['care'] = _this.state.cloumn['care']-1;
							_this.setState({
								cloumn: _this.state.cloumn
							});

							ele.data('care',false);
							ele.addClass('btn-info').removeClass('btn-default');
						} else {
							Tooltip(data.msg);
						}
					}
				});
			} else {
				CloumnModel.addCare(dataObj,function(success,data) {
					if(success) {
						if(!data.error) {
							_this.state.cloumn['careStatus'] = !_this.state.cloumn['careStatus'];
							_this.state.cloumn['care'] = _this.state.cloumn['care']+1;
							_this.setState({
								cloumn: _this.state.cloumn
							});
							
							ele.data('care',true);
							ele.addClass('btn-default').removeClass('btn-info');
						} else {
							Tooltip(data.msg);
						}
					}
				});
			}
		},
		handleTabChange: function(event) {
			var _this = this;
			if(event.target.tagName.toLowerCase()=='a') {
				var index = $(event.target).parent().data('nav');
			} else {
				var index = $(event.target).data('nav');
			}
			_this.setState({
				nav: index
			});
			var way = _this.state.way[index];
			if(!_this.state.articles[way]) {
				_this.getArticlesByCid(way,0);
			}
		},
		handleMore: function() {
			var page = $(event.target).data('page');
			var _this = this;
			var way = _this.state.way[_this.state.nav];
			
			_this.getArticlesByCid(way,page);
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'cloumn',
				cid: this.props.cid ? this.props.cid : 0, //专题id
				cloumn: {},      //专题数据
				articles: {},    //文章数据列表
				nav: 0,
				way:['view','addtime'],
				next: false,     //判断是否还有数据
				more:[],         //记录每个专题进入到了第几页
			}
		},
		componentDidMount: function() {
			this.init();
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
		render: function() {
			var _this = this;
			var way = _this.state.way[_this.state.nav];
			var articles = (_this.state.articles[way]&&_this.state.articles[way].length>0) ? _this.state.articles[way].map(function(d,i) {

				if(d.tags) {
					if(d.tags.indexOf('|')) {
						var tagsList = d.tags.split('|').map(function(t,k) {
							return (React.createElement("a", {style: {marginRight:'6px'}, href: "/t/"+t}, t));
						});
					} else {
						var tagsList = (React.createElement("a", {href: "/t/"+d.tags}, "d.tags"));
					}
					tagsList = (React.createElement("span", {className: "tag"}, " ", React.createElement("i", {className: "fa fa-tags"}), " ", tagsList));
				} else {
					var tagsList = null;
				}
				
				return (
					React.createElement("article", {key: d.id}, 
						
							d.logo_dir ? 
							(React.createElement("a", {className: "pic", href: "/article/"+d.id, style: {backgroundImage: 'url('+d.logo_dir+')'}}, 
								React.createElement("span", null, d.cloumn)
							)) : null, 
						
						React.createElement("div", {className: "desc"}, 
							React.createElement("a", {className: "title", href: "/article/"+d.id}, d.title), 
							React.createElement("div", {className: "author"}, 
								React.createElement("a", {href: "javascript:void(0)"}, 
									React.createElement("img", {className: "avatar", src: d.userUrl ? d.userUrl : "/image/user-default.png"}), 
									React.createElement("span", {className: "name"}, d.username)
								), 
								React.createElement("span", {className: "time"}, " • ", WQ.timeFormat(d.addtime)), 
								React.createElement("span", {className: "tag"}, " 阅读: ", d.view), 
								React.createElement("span", {className: "tag"}, " 推荐: ", d.praise), 
								React.createElement("span", {className: "tag"}, " 评论: ", d.comment), 
								tagsList
							), 
							React.createElement("div", {className: "description"}, d.description)
						)
					)
				);
			}) : null;
			return (
				React.createElement("div", {className: "cloumn-page"}, 
					React.createElement("div", {className: "cloumn-header"}, 
						React.createElement("div", {className: "info"}, 
							React.createElement("div", {className: "cname"}, React.createElement("a", {href: "/cloumn/"+_this.state.cid}, React.createElement("h3", null, _this.state.cloumn['name'] ? _this.state.cloumn['name'] : ''))), 
							React.createElement("div", {className: "anthor"}, 
								React.createElement("a", {style: {color:'#3da9f7',marginRight:'10px'}, href: "/cloumn/"+_this.state.cid}, _this.state.cloumn['count'] ? _this.state.cloumn['count'] : 0, " 片文章"), 
								React.createElement("span", null, React.createElement("i", {className: "fa fa-user"}), "  所有者：", _this.state.cloumn['username'] ? _this.state.cloumn['username'] : '')
							), 
							React.createElement("div", {className: "cdesc"}, _this.state.cloumn['description'] ? _this.state.cloumn['description'] : ''), 
							React.createElement("div", {className: "footer"}, 
									_this.state.cloumn['uid'] && _this.state.cloumn['uid']==WQ.cookie.get('id') ? 
									(React.createElement("a", {href: "/cloumn/"+_this.state.cid+'/edit'}, React.createElement("i", {className: "fa fa-edit"}), React.createElement("span", null, "编辑专题"))) : null
								
							), 
							React.createElement("div", {className: "cloumn-right"}, 
								React.createElement("a", {onClick: this.handleCare, onMouseEnter: this.handleOver, onMouseLeave: this.handleOut, href: "javascript:void(0)", "data-care": _this.state.cloumn['careStatus'] ? true : false, className: _this.state.cloumn['careStatus'] ? "btn btn-default" : "btn btn-info"}, _this.state.cloumn['careStatus'] ? '正在关注' : '添加关注')
							)
						)
					), 
					React.createElement("div", {className: "cloumn-content"}, 
						React.createElement("ul", {className: "sequence-nav toolbar"}, 
							React.createElement("li", {className: _this.state.nav==0 ? "active" : '', "data-nav": "0", onClick: _this.handleTabChange}, React.createElement("a", {href: "javascript:void(0)"}, "热门排序")), " ·",  
							React.createElement("li", {className: _this.state.nav==1 ? "active" : '', "data-nav": "1", onClick: _this.handleTabChange}, React.createElement("a", {href: "javascript:void(0)"}, "最近更新"))
						), 
						React.createElement("div", {className: "article-list"}, 
							articles, 
							React.createElement("a", {className: "btn btn-info btn-large", style: _this.state.next ? {display:'block',margin:'20px auto'} : {display:'none',margin:'20px auto'}, "data-page":  _this.state.more[way] ? _this.state.more[way] : 1, onClick: _this.hamdleMore}, "更多")
						)
					)
				)
			);
		}
	});

});