define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel',
	'home/model/cloumnModel',
	],function(React, $, WQ, ArticleModel,CloumnModel) {


	var mixin = {
		init: function() {
			var _this = this;
			_this.getAllArticle(0);
			CloumnModel.getAllCloumns({way:'addtime'},function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							cloumns: data.data,
						});
					} else {
						alert(data.msg);
					}
				}
			});
		},
		hamdleTabChange: function(event) {
			var _this = this;
			var cid = $(event.target).data('cid');

			if($(event.target).hasClass('active')) return;
			_this.setState({
				nav: cid,
			});

			if(!_this.state.list[cid]) {
				_this.getAllArticleByCid(cid,0);
			}
			$(event.target).addClass('active').siblings().removeClass('active');
		},
		getAllArticle: function(page) {
			var _this = this;
			ArticleModel.getAllArticle({way:'addtime',page:page},function(success,data) {
				if(success) {
					if(!data.error) {
						if(_this.state.list['0']) {
							_this.state.list['0'].push(data.data);
						} else {
							_this.state.list['0'] = data.data;
						}
						_this.setState({
							list: _this.state.list
						});
					} else {
						alert(data.error);
					}
				}
			});
		},
		getAllArticleByCid: function(cid,page) {
			var _this = this;
			ArticleModel.getAllArticleByCid({cid:cid,way:'addtime',page:page},function(success,data) {
				if(success) {
					if(!data.error) {
						if(_this.state.list[cid]) {
							_this.state.list[cid].push(data.data);
						} else {
							_this.state.list[cid] = data.data;
						}
						_this.setState({
							list: _this.state.list
						});
					} else {
						alert(data.msg);
					}
				} 
			});
		},
		hamdleMore: function(event){
			var page = $(event.target).data('page');
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				list: [],
				cloumns: [],
				nav: '0',
				more:[]
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
						</a>
						<div className="desc">
							<a className="title" href={"/article/"+d.id}>{d.title}</a>
							<div className="author">
								<a href="javascript:void(0)">
									<img className="avatar" src="/image/user-default.png" />
									<span className="name">{d.username}</span>
								</a>
								<span className="time">&nbsp;•&nbsp;{WQ.timeFormat(d.addtime)}</span>
							</div>
							<div className="description">{d.description}</div>
						</div>
					</article>
				);
			}) : null;
			var cloumns = this.state.cloumns.length>0 ? this.state.cloumns.map(function(c,i) {
				return (
					<a key={c.id} data-cid={c.id} onClick={_this.hamdleTabChange} className="tab" href="javascript:void(0)">{c.title}</a>
				);
			}) : null;
			return (
				<div>
					<div className="header">
						<div className="nav">
							<a className="tab active" data-cid="0" onClick={this.hamdleTabChange} href="javascript:void(0)">全部</a>
							{cloumns}
						</div>
					</div>
					<div className="article-list">
						{list}
						<a className="more" data-page={ _this.state.more[nav] ? _this.more[nav] : 0} onClick={_this.hamdleMore}>更多</a>
					</div>
				</div>
			);
		}
	});

});