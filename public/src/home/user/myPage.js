define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/common/tooltip',
        'home/model/articleModel',
        'WQ'
        ],function(React, $, UserModel, Tooltip, ArticleModel, WQ) {



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
				<div className="article-list">
        			{list}
        			<a className="more" style={_this.state.next ? {display:'block'} : {display:'none'}}  onClick={_this.hamdleMore}>更多</a>
        		</div>
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
				<div className="article-list">
        			{list}
        			<a className="more" style={_this.state.next ? {display:'block'} : {display:'none'}}  onClick={_this.hamdleMore}>更多</a>
        		</div>
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
        	return (
        		<div className="tag-page">
        			{	
        				_this.state.type == 'draft' ? <div className="top"><i className="fa fa-inbox"></i>我的草稿箱</div> : <div className="top"><i className="fa fa-bookmark"></i>我的收藏</div>
        			}
        			{
        				_this.state.type == 'draft' ? <Draft uid={_this.state.uid} /> : <Store uid={_this.state.uid} type={_this.state.type} />
        			}
        		</div>
        	);
        }
    });
});