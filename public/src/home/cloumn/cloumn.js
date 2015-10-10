define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/model/articleModel',
	'home/common/leftNav',
	'home/common/tooltip',
	],function( React, $, WQ, CloumnModel, ArticleModel, LeftNav, Tooltip) {


	var mixin = {
		// 获取专题数据和专题下的所有文章
		init: function() {
			var _this = this;
			CloumnModel.getCloumnById(_this.state.cid,function(success,data) {
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
			_this.getArticlesByCid();
			return this;
		},
		// 根据专题id获取文章数据
		getArticlesByCid: function() {
			var _this = this;
			var dataObj = {cid:_this.state.cid,way:'addtime',page:0};
			ArticleModel.getAllArticleByCid(dataObj,function(success,data) {
				if(success) {
					if(!data.error) {
						console.log(data);
						_this.setState({
							articles: data.data
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
				cid: this.props.params.id ? this.props.params.id : 0, //专题id
				cloumn: {},      //专题数据
				articles: [],    //文章数据列表
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var articles = _this.state.articles.length>0 ? _this.state.articles.map(function(d,i) {

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
					<LeftNav active={this.state.name} />
					
					<div className="cloumn-page">
						<div className="cloumn-header">
							<div className="info">
								<div className="cname"><a href={"/cloumn/"+_this.state.cid}><h3>{_this.state.cloumn['name'] ? _this.state.cloumn['name'] : ''}</h3></a></div>
								<div className="anthor">
									<a style={{color:'#3da9f7',marginRight:'10px'}} href={"/cloumn/"+_this.state.cid}>{_this.state.cloumn['count'] ? _this.state.cloumn['count'] : 0}&nbsp;片文章</a>
									<span><i className="fa fa-user"></i>&nbsp;&nbsp;所有者：{_this.state.cloumn['username'] ? _this.state.cloumn['username'] : ''}</span>
								</div>
								<div className="cdesc">{_this.state.cloumn['description'] ? _this.state.cloumn['description'] : ''}</div>
								<div className="footer">
									{	_this.state.cloumn['uid'] && _this.state.cloumn['uid']==WQ.cookie.get('id') ? 
										(<a href={"/cloumn/edit/"+_this.state.cid}><i className="fa fa-edit"></i><span>编辑专题</span></a>) : null
									}
								</div>
								<div className="cloumn-right">
									<a className="btn-success">添加关注</a>
								</div>
							</div>
						</div>
						<div className="cloumn-content">
							<ul className="sequence-nav toolbar">
								<li className="active"><a href="javascript:void(0)">热门排序</a></li> · 
								<li className=""><a href="javascript:void(0)">最近更新</a></li> · 
								<li className=""><a href="javascript:void(0)">关注度排序</a></li>
							</ul>
							<div className="article-list">
								{articles}
							</div>
						</div>
					</div>
				</div>
			);
		}
	});

});