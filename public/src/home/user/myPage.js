define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/model/bugModel',
        'home/common/tooltip',
        'home/model/articleModel',
        'WQ'
        ],function(React, $, UserModel, BugModel, Tooltip, ArticleModel, WQ) {

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    var Store = React.createClass({
    	getInitialState: function() {
    		var type = (this.props.type=='store') ? 1 : 0;
    		return {
                uid: this.props.uid,
                type: this.props.type,
                articles: [],
                page: 0,
            }
    	},
    	componentDidMount: function() {
            this.getArticles(0);
        },
    	getArticles: function(page) {
    		var _this = this;
    		var params = {uid:_this.state.uid,type:_this.state.type,page:page};
    		ArticleModel.getArticlesByPS(params,function(success,data) {
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
    				}
    			}
    		});
    	},
    	handleMore: function() {
			_this.getArts(_this.state.name,_this.state.page);
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
								<a href={"/user/"+d.uid}>
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
				<ReactCSSTransitionGroup transitionName="fadeToTop" transitionAppear={true}>
					<div>
						<div className="top"><i className="fa fa-bookmark"></i>我的收藏</div>
						<div className="article-list">
		        			{list}
		        			<a className="btn btn-default btn-large" href="javascript:void(0)" style={_this.state.next ? {display:'block',marginTop:'15px'} : {display:'none'}}  onClick={_this.hamdleMore}>更多</a>
		        		</div>
					</div>
				</ReactCSSTransitionGroup>
			);
		}
    });


    var Draft = React.createClass({
    	getInitialState: function() {
    		return {
                uid: this.props.uid,
                articles: [],
                page: 0,
            }
    	},
    	componentDidMount: function() {
            this.getArticles(0);
        },
    	getArticles: function(page) {
    		var _this = this;
    		var params = {uid:_this.state.uid, way:'is_publish', page:page, is_publish:0};

    		ArticleModel.getAllArticleByUid(params,function(success,data) {
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
    				}
    			}
    		});
    	},
    	handleMore: function() {
			_this.getArts(_this.state.name,_this.state.page);
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
								<a href={"/user/"+d.uid}>
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
				<ReactCSSTransitionGroup transitionName="fadeToTop" transitionAppear={true}>
					<div>
						<div className="top"><i className="fa fa-inbox"></i>我的草稿箱</div>
						<div className="article-list">
		        			{list}
		        			<a className="btn btn-default btn-large" href="javascript:void(0)" style={_this.state.next ? {display:'block',marginTop:'15px'} : {display:'none'}}  onClick={_this.hamdleMore}>更多</a>
		        		</div>
					</div>
				</ReactCSSTransitionGroup>
			);
		}
    });

	var mixin = {
		init: function() {
			var _this = this;
			_this.getNews({
				uid: _this.state.uid,
				page: 0
			},true);
		},
		getNews: function(params,status) {
			var _this = this;
			UserModel.getNews(params,function(success,data) {
				if(success) {
					if(!data.error) {
						if(status) {
							var nav = 'all';
						} else {
							var nav = 'unread'
						}

						if(_this.state.news[nav]) {
							Array.prototype.push.apply(_this.state.news[nav],data.data);
						} else {
							_this.state.news[nav] = data.data;
						}

						_this.state.more[nav] = parseInt(params['page'])+1;
						_this.setState({
							news: _this.state.news,
							next: data.next,
							more: _this.state.more
						});
					}
				}
			});
		},
		componentDidMount: function() {
			this.init();
		},
		hamdleChangeNav: function(event) {
			var _this = this;
			var index = $(event.target).index();
			if(index==0) {
				nav = 'all';
			} else {
				nav = 'unread';
			}
			if(nav == _this.state.nav) return;

			_this.setState({
				nav: nav
			});
			if(!_this.state.news[nav]) {
				_this.getNews({
					uid: _this.state.uid,
					unread: 1,
					page: 0
				},false);
			}
		},
		handleMore: function(event){
			var page = $(event.target).data('page');
			var _this = this;
			var nav = _this.state.nav;
			if(nav=='all') {
				var params = {
					uid: _this.state.uid,
					page: page
				};
				var status = true;
			} else {
				var params = {
					uid: _this.state.uid,
					unread: 1,
					page: page
				};
				var status = false;
			}
			_this.getNews(params,status);
		},
		updateNews: function(params,status) {
			var _this = this;
			UserModel.updateNews(params,function(success,data) {
				if(success) {
					if(!data.error) {
						if(status) {
							$('.news-list li.active').removeClass('active');
							$('.drop-menu .news').hide();
							_this.state.news['unread'] = null;
							_this.setState({
								news: _this.state.news
							});
						}
					}
				}
			});
		},
		handleRead: function(event) {
			var li = $(event.target).parents('li');
			if(!li.hasClass('active')) return;

			var nid = li.data('nid');
			this.updateNews({
				id: nid
			});
		},
		handleAllRead: function() {
			var _this = this;
			_this.updateNews({
				uid: _this.state.uid,
			},true);
		}
	};

	var News = React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
                uid: this.props.uid,
                news: [],
                next: false,
                more: [],
                nav: 'all'
            }
		},
		render: function() {
			var _this = this;
			var nav = this.state.nav;
			var news = _this.state.news[nav] ? _this.state.news[nav].map(function(n,i) {
				return (
					<li key={n.id} data-nid={n.id} className={n.unread ? 'active' : ''}>
						<i className="fa fa-fw fa-comments-o"></i>
						<span>你在《<a href={"/article/"+n.aid} ><span onClick={this.handleRead}>{n.title}</span></a>》中收到一条 <a href={"/user/"+n.send_id} onClick={this.handleRead}>{n.username}</a> 的评论</span>
						<span className="time pull-right">{WQ.timeFormat(n.addtime)}</span>
					</li>
				);
			}) : null;
			return (
				<ReactCSSTransitionGroup transitionName="fadeToTop" transitionAppear={true}>
					<div>
						<div className="top" style={{borderBottom:'0px'}}><i className="fa fa-bell-o"></i>我的消息</div>
						<div className="news-nav clearfix">
							<a href="javascript:void(0)" className={nav=="all" ? "active pull-left message" : "pull-left message"} onClick={_this.hamdleChangeNav}>全部消息</a>
							<a href="javascript:void(0)" className={nav=="unread" ? "active pull-left message" : "pull-left message"} onClick={_this.hamdleChangeNav}>未读消息</a>
							<a href="javascript:void(0)" className="pull-right btn btn-default" onClick={this.handleAllRead}><i className="fa fa-fw fa-check"></i>全部标记为已读</a>
						</div>
						<ul className="news-list">
							{news}
							<a className="btn btn-default btn-large" href="javascript:void(0)" style={_this.state.next ? {display:'block',marginTop:'15px'} : {display:'none'}} data-page={ _this.state.more[nav] ? _this.state.more[nav] : 1} onClick={_this.handleMore}>更多</a>
						</ul>
					</div>
				</ReactCSSTransitionGroup>
			);
		}
	});

	var Bugs = React.createClass({
		getInitialState: function() {
			return {
                uid: this.props.uid,
                bugs: [],
            }
		},
		componentDidMount: function() {
			var _this = this;
			BugModel.getAll(this.state.uid,function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							bugs: data.data
						});
					}
				}
			});
		},
		render: function() {
			var _this = this;
			var nav = this.state.nav;
			var bugList = _this.state.bugs.map(function(b,i) {
				return (
					<li key={b.id} data-nid={b.id}>
						<i className="fa fa-fw fa-comments-o"></i>
						<span><a href={"/user/"+b.uid}>{b.username}</a> 提交了bug：</span>
						<span><a>{b.content}</a></span>
						<span className="time pull-right">{WQ.timeFormat(b.addtime)}</span>
					</li>
				);
			});
			return (
				<ReactCSSTransitionGroup transitionName="fadeToTop" transitionAppear={true}>
					<div>
						<div className="top" style={{borderBottom:'0px'}}><i className="fa fa-question-circle"></i>bug反馈</div>
						<ul className="news-list">
							{bugList}
						</ul>
					</div>
				</ReactCSSTransitionGroup>
			);
		}
	});


    return React.createClass({
    	getInitialState: function() {
    		return {
                uid: this.props.uid,
                type: this.props.type,
            }
    	},
    	componentWillReceiveProps: function(nextProps) {
    		this.setState({
    			uid: nextProps.uid,
    			type: nextProps.type,
    		});
    	},
        render: function() {
        	var _this = this;
        	if(_this.state.type == 'draft') {
        		var content = <Draft uid={_this.state.uid} />;
        	} else if(_this.state.type == 'store') {
        		var content = <Store uid={_this.state.uid} type={_this.state.type} />;
        	} else if(_this.state.type == 'news') {
        		var content = <News uid={_this.state.uid} />;
        	} else if(_this.state.type == 'bugs') {
        		var content = <Bugs uid={_this.state.uid} />;
        	}

        	return (
        		<div className="tag-page">
        			{content}
        		</div>
        	);
        }
    });
});