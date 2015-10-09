define([
	'react',
	'jquery',
	'WQ',
	'home/common/leftNav',
	'home/common/tooltip',
	'home/model/articleModel',
	],function(React, $, WQ, LeftNav, Tooltip, ArticleModel) {


	var mixin = {
		init: function() {
			var _this = this;
			ArticleModel.tagInfo(_this.state.name,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							tagInfo: data.data
						});
					} else {
						Tooltip(data.msg);
					}
				}
			});
			_this.getArts(_this.state.name,_this.state.page);
		},
		getArts: function(name,page) {
			var _this = this;
			var params = {name:_this.state.name,page:page};
			ArticleModel.getArtsLikeTag(params,function(success,data) {
				if(success) {
					if(!data.error) {
						if(_this.state.articles.length>0) {
							Array.prototype.push.apply(_this.state.articles,data.data);
						} else {
							_this.state.articles = data.data;
						}
						
						_this.setState({
							articles: _this.state.articles,
							next: data.next,
							page: _this.state.page+1,
						});
					} else {
						Tooltip(data.msg)
					}
				}
			});
		},
		handleMore: function() {
			_this.getArts(_this.state.name,_this.state.page);
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				navName: 'home',
				name: this.props.params.name ? this.props.params.name : null,
				tagInfo: null,
				articles: [],
				next: false,
				page: 0,
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var list = _this.state.articles.length>0 ? _this.state.articles.map(function(d,i) {
				if(d.tags) {
					if(d.tags.indexOf('|')) {
						var tagsList = d.tags.split('|').map(function(t,k) {
							return (<a style={{marginRight:'6px'}} href={"/t/"+t}>{t}</a>);
						});
					} else {
						var tagsList = (<a href={"/t/"+d.tags}>d.tags</a>);
					}
					tagsList = (<span className="tag">&nbsp;<i className="fa fa-tags"></i>&nbsp;{tagsList}</span>);
				} else {
					var tagsList = null;
				}
				return (
					<article key={d.id}>
						{
							d.logo_dir ? 
							(<a className="pic" href={"/article/"+d.id} style={{backgroundImage: 'url('+d.logo_dir+')'}}>
								<span>{d.cloumn}</span>
							</a>) : null
						}
						
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
								{tagsList}
							</div>
							<div className="description">{d.description}</div>
						</div>
					</article>
				);
			}) : null;
			return (
				<div>
					<LeftNav active={this.state.navName} />
					<div className="tag-page">
						<div className="page">
							<div className="top">
								<i className="fa fa-tags"></i>{_this.state.name}
							</div>
							<div className="article-list">
								{list}
								<a className="more" style={_this.state.next ? {display:'block'} : {display:'none'}}  onClick={_this.hamdleMore}>更多</a>
							</div>
						</div>
					</div>
				</div>
			);
		}
	});

});