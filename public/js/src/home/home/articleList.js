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
			ArticleModel.getAllArticle({way:'addtime'},function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							list: data.data
						});
						_this.cache.set('0',data.data);
					} else {
						alert(data.error);
					}
				}
			});
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
		cache:{
			objData:{},
			set: function(key,data) {
				this.objData[key] = data;
			},
			get: function(key){
				return this.objData[key];
			},
			isset: function(key) {
				return this.objData.hasOwnProperty(key);
			}
		},
		hamdleTabChange: function(event) {
			var _this = this;
			var cid = $(event.target).data('cid');

			if($(event.target).hasClass('active')) return;

			if(_this.cache.isset(cid)) {
				_this.setState({
					list: _this.cache.get(cid)
				});
			} else {
				ArticleModel.getAllArticleByCid({cid:cid,way:'addtime'},function(success,data) {
					if(success) {
						if(!data.error) {
							_this.setState({
								list: data.data
							});
							_this.cache.set(cid,data.data);
						} else {
							alert(data.msg);
						}
					} 
				});
			}
			$(event.target).addClass('active').siblings().removeClass('active');
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				list: [],
				cloumns: [],
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var list = this.state.list.length>0 ? this.state.list.map(function(d,i) {
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
					</div>
				</div>
			);
		}
	});

});