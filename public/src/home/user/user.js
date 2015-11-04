define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/common/tooltip',
        'home/model/articleModel',
        'WQ'
        ],function(React, $, UserModel, Tooltip, ArticleModel, WQ) {

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    var mixin = {
        init: function() {
            var _this = this;
            UserModel.getUserInfoById(_this.state.uid,function(success,data) {
                if(success) {
                    if(!data.error) {
                        _this.setState({
                            info: data.data
                        });
                    } else {
                        Tooltip(data.msg);
                    }
                }
            });
        }
    };
    
    var Articles = React.createClass({
        getInitialState: function() {
            return {
                list: {},        //文章列表
                next: false,     //判断是否还有数据
                uid: this.props.uid,
                nav: 'addtime',
                more:[],         //记录每个专题进入到了第几页
            }
        },
        init: function(nav) {
            var _this = this;
            
            if (nav != "is_publish") {
                _this.getAllArticleByUid(nav,0,1);
            }else{
                _this.getAllArticleByUid(nav,0,0);
            };
        },

        componentDidMount: function() {
            this.init(this.state.nav);
        },
        handleClick: function(nav){
            var _this = this;
            _this.setState({
                nav: nav,
            })
            if(!_this.state.list[nav]) {
                if(nav == 'is_publish') {
                    var is_publish = 0;
                } else {
                    var is_publish = 1;
                }
                _this.getAllArticleByUid(nav,0,is_publish);
            }
        },
        handleMore: function() {
            var page = $(event.target).data('page');
            var _this = this;
            var nav = _this.state.nav;
            if(nav!='is_publish') {
                _this.getAllArticleByUid(nav,page,1);
            } else {
                _this.getAllArticleByUid(nav,page,0);
            }
        },
        getAllArticleByUid: function(way,page,is_publish) {
            var _this = this;
            var uid = _this.state.uid;
            var params = {uid:uid,way:way,page:page,is_publish:is_publish};

            ArticleModel.getAllArticleByUid(params,function(success,data) {
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
                            next: data.next,
                            more: _this.state.more
                        });
                    } else {
                        Tooltip(data.msg);
                    }
                }
            });
        },

        render: function() {
            var _this = this;
            var nav = this.state.nav;

            var list = (this.state.list[nav] && this.state.list[nav].length>0) ? this.state.list[nav].map(function(d,i) {

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
                    <div>
                        <div className="host-addtime">
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
                        </div>
                    </div>
                );
            }) : null;
            
            return (
                <div>
                    <ul className="nav-orderBy clearfix">
                        <li><a href="javascript:void(0)" className={_this.state.nav == "addtime" ? "btn btn-info" : "btn btn-default"} onClick={_this.handleClick.bind(this,"addtime")}>最新文章</a></li>
                        <li><a href="javascript:void(0)" className={_this.state.nav == "view" ? "btn btn-info" : "btn btn-default"} onClick={_this.handleClick.bind(this,"view")}>热门文章</a></li>
                        {
                            (_this.state.uid == WQ.cookie.get('id')) ? (<li><a href="javascript:void(0)" className={_this.state.nav == "is_publish" ? "btn btn-info" : "btn btn-default"} onClick={_this.handleClick.bind(this,"is_publish")}>我的草稿</a></li>) : null
                        }
                        
                    </ul>
                    <ReactCSSTransitionGroup transitionName="fadeToTop" transitionAppear={true}>
                        <div className="article-list">
                            {list}
                            <a className="more" style={_this.state.next ? {display:'block'} : {display:'none'}} data-page={ _this.state.more[nav] ? _this.state.more[nav] : 1} onClick={_this.handleMore}>更多</a>
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            );
        }
    })

    return React.createClass({
        mixins: [mixin],
        getInitialState: function() {
            return {
                uid: this.props.uid,
                info: null,
            }
        },
        componentDidMount: function() {
            this.init();
        },
        
        render: function() {
            var _this = this;
            var username    = (_this.state.info && _this.state.info.username && _this.state.info.username!='')       ? _this.state.info.username    : '未填写';
            var email       = (_this.state.info && _this.state.info.email && _this.state.info.email!='')             ? _this.state.info.email       : '未填写';
            var job         = (_this.state.info && _this.state.info.job && _this.state.info.job!='')                 ? _this.state.info.job         : '未填写';
            var description = (_this.state.info && _this.state.info.description && _this.state.info.description!='') ? _this.state.info.description : '未填写';
            var logo        = (_this.state.info && _this.state.info.logo_dir && _this.state.info.logo_dir!='')       ? _this.state.info.logo_dir    : '未填写';
            var github      = (_this.state.info && _this.state.info.github && _this.state.info.github!='')           ? _this.state.info.github      : '未填写';
            return (
                <ReactCSSTransitionGroup transitionName="fade" transitionAppear={true}>
                    <div className="user-page">
                        <div className="host-box clearfix">
                            <img src={logo} />
                            <div className="info">
                                <div className="username">昵称:&nbsp;{username}</div>
                                <div className="desc">简介:&nbsp;{description}</div>
                                <div className="other">
                                    <span>职位:&nbsp;{job}</span>&nbsp;&nbsp;&nbsp;
                                    <span>邮箱:&nbsp;{email}</span>
                                </div>
                                <div className="github">github:&nbsp;{github}</div>
                            </div>
                        </div>
                        
                        <Articles uid={_this.state.uid} />
                    </div>
                </ReactCSSTransitionGroup>
            );
        }
    });
});