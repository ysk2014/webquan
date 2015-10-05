define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/model/cloumnModel',
	'home/common/tooltip',
	],function(React, $, WQ, ArticleModel, CloumnModel, Tooltip) {


	var mixin = {
		init: function() {
			var _this = this;
			var uid = WQ.cookie.get('id') ? WQ.cookie.get('id') : null;
			_this.setState({
				uid: uid
			});
			_this.getAllArticle('praise',0);
		},
		hamdleTabChange: function(event) {
			var _this = this;
			var index = $(event.target).index();
			var way = _this.state.cacheNav[index];
			

			if($(event.target).hasClass('active')) return;
			_this.setState({
				nav: way,
			});

			if(!_this.state.list[way]) {
				if(way=='care') {
					_this.getAllArtsByUidCare(0);
				} else {
					_this.getAllArticle(way,0);
				}
				
			}
			
			$(event.target).addClass('active').siblings().removeClass('active');
		},
		// 获取全部文章
		getAllArticle: function(way,page) {
			var _this = this;
			ArticleModel.getAllArticle({way:way,page:page},function(success,data) {
				if(success) {
					if(!data.error) {
						if(_this.state.list[way]) {
							Array.prototype.push.apply(_this.state.list[way],data.data);
						} else {
							_this.state.list[way] = data.data;
						}
						
						_this.state.more[way] = parseInt(page)+1;
						_this.setState({
							list: _this.state.list,
							more: _this.state.more,
							next: data.next
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
		},
		// 获取专题文章
		getAllArtsByUidCare: function(page) {
			var _this = this;
			var uid = WQ.cookie.get('id');
			ArticleModel.getAllArtsByUidCare({uid:uid,page:page},function(success,data) {
				if(success) {
					if(!data.error) {
						if(_this.state.list['care']) {
							Array.prototype.push.apply(_this.state.list['care'],data.data);
						} else {
							_this.state.list['care'] = data.data;
						}
						_this.state.more['care'] = parseInt(page)+1;
						_this.setState({
							list: _this.state.list,
							more: _this.state.more,
							next: data.next
						});
					} else {
						Tooltip(data.msg);
					}
				} 
			});
		},
		hamdleMore: function(event){
			var page = $(event.target).data('page');
			var _this = this;
			var nav = _this.state.nav;
			if(nav!='care') {
				_this.getAllArticle(nav,page)
			} else {
				_this.getAllArtsByUidCare(page);
			}
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				list: [],        //文章列表
				nav: 'praise',	
				more:[],         //记录每个专题进入到了第几页
				next: false,     //判断是否还有数据
				cacheNav: ['praise','addtime','view','care'],
				uid: null,
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var nav = this.state.nav;
			var list = (this.state.list[nav] && this.state.list[nav].length>0) ? this.state.list[nav].map(function(d,i) {
				return (
					<article key={d.id}>
						<a className="pic" href={"/article/"+d.id} style={{backgroundImage: 'url('+d.logo_dir+')'}}>
							<span>{d.cloumn}</span>
						</a>
						<div className="desc">
							<a className="title" href={"/article/"+d.id}>{d.title}</a>
							<div className="author">
								<a href="javascript:void(0)">
									<img className="avatar" src={d.userUrl ? d.userUrl : "/image/user-default.png"} />
									<span className="name">{d.username}</span>
								</a>
								<span className="time">&nbsp;•&nbsp;{WQ.timeFormat(d.addtime)}</span>
								<span className="tag">&nbsp;阅读:&nbsp;{d.view}</span>
								<span className="tag">&nbsp;推荐:&nbsp;{d.praise}</span>
								<span className="tag">&nbsp;评论:&nbsp;{d.comment}</span>
								<span className="tag">{d.tags}</span>
							</div>
							<div className="description">{d.description}</div>
						</div>
					</article>
				);
			}) : null;
			
			return (
				<div>
					<div className="header">
						<div className="nav">
							<a className="tab active" onClick={this.hamdleTabChange} href="javascript:void(0)">推荐</a>
							<a className="tab" onClick={this.hamdleTabChange} href="javascript:void(0)">最新</a>
							<a className="tab" onClick={this.hamdleTabChange} href="javascript:void(0)">热门</a>
							{
								_this.state.uid ? (<a className="tab" onClick={this.hamdleTabChange} href="javascript:void(0)">关注</a>) : null
							}
						</div>
					</div>
					<div className="article-list">
						{list}
						<a className="more" style={_this.state.next ? {display:'block'} : {display:'none'}} data-page={ _this.state.more[nav] ? _this.state.more[nav] : 1} onClick={_this.hamdleMore}>更多</a>
					</div>
				</div>
			);
		}
	});

});