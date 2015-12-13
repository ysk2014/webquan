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

            //如果是从消息页面跳转过来的，就把消息设置为已读
            if(_this.state.newsId!=0) {
                UserModel.updateNews({id:_this.state.newsId},function(success,data) {
                    if(success) {
                        if(!data.error) {
                            $('.drop-menu .news').remove();
                            return;
                        }
                    }
                });
            }

            return this;
        }
    };
    
    var Articles = React.createClass({displayName: "Articles",
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
                    React.createElement("div", null, 
                        React.createElement("div", {className: "host-addtime"}, 
                            React.createElement("article", {key: d.id}, 
                                
                                    d.logo_dir ? 
                                    (React.createElement("a", {className: "pic", href: "/article/"+d.id, style: {backgroundImage: 'url('+d.logo_dir+')'}}, 
                                        React.createElement("span", null, d.cloumn)
                                    )) : null, 
                                
                                
                                React.createElement("div", {className: "desc"}, 
                                    React.createElement("a", {className: "title", href: "/article/"+d.id}, d.title), 
                                    React.createElement("div", {className: "author"}, 
                                        React.createElement("a", {href: "/user/"+d.uid}, 
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
                        )
                    )
                );
            }) : null;
            
            return (
                React.createElement("div", null, 
                    React.createElement("ul", {className: "nav-orderBy clearfix"}, 
                        React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav == "addtime" ? "btn btn-info" : "btn btn-default", onClick: _this.handleClick.bind(this,"addtime")}, "最新文章")), 
                        React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav == "view" ? "btn btn-info" : "btn btn-default", onClick: _this.handleClick.bind(this,"view")}, "热门文章")), 
                        
                            (_this.state.uid == WQ.cookie.get('id')) ? (React.createElement("li", null, React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav == "is_publish" ? "btn btn-info" : "btn btn-default", onClick: _this.handleClick.bind(this,"is_publish")}, "我的草稿"))) : null
                        
                        
                    ), 
                    React.createElement(ReactCSSTransitionGroup, {transitionName: "fadeToTop", transitionAppear: true}, 
                        React.createElement("div", {className: "article-list"}, 
                            list, 
                            React.createElement("a", {className: "more", style: _this.state.next ? {display:'block'} : {display:'none'}, "data-page":  _this.state.more[nav] ? _this.state.more[nav] : 1, onClick: _this.handleMore}, "更多")
                        )
                    )
                )
            );
        }
    })

    return React.createClass({
        mixins: [mixin],
        getInitialState: function() {
            return {
                uid: this.props.uid,
                newsId: this.props.params&&this.props.params.news ? this.props.params.news : 0,    //消息id
                info: null,
            }
        },
        componentDidMount: function() {
            this.init();
        },
        
        render: function() {
            var _this = this;
            document.title = '我的主页 | Web圈';

            var username    = (_this.state.info && _this.state.info.username && _this.state.info.username!='')       ? _this.state.info.username    : '未填写';
            var email       = (_this.state.info && _this.state.info.email && _this.state.info.email!='')             ? _this.state.info.email       : '未填写';
            var job         = (_this.state.info && _this.state.info.job && _this.state.info.job!='')                 ? _this.state.info.job         : '未填写';
            var description = (_this.state.info && _this.state.info.description && _this.state.info.description!='') ? _this.state.info.description : '未填写';
            var logo        = (_this.state.info && _this.state.info.logo_dir && _this.state.info.logo_dir!='')       ? _this.state.info.logo_dir    : '未填写';
            var github      = (_this.state.info && _this.state.info.github && _this.state.info.github!='')           ? _this.state.info.github      : '未填写';
            return (
                React.createElement(ReactCSSTransitionGroup, {transitionName: "fade", transitionAppear: true}, 
                    React.createElement("div", {className: "user-page"}, 
                        React.createElement("div", {className: "host-box clearfix"}, 
                            React.createElement("img", {src: logo}), 
                            React.createElement("div", {className: "info"}, 
                                React.createElement("div", {className: "username"}, "昵称: ", username), 
                                React.createElement("div", {className: "desc"}, "简介: ", description), 
                                React.createElement("div", {className: "other"}, 
                                    React.createElement("span", null, "职位: ", job), "   ", 
                                    React.createElement("span", null, "邮箱: ", email)
                                ), 
                                React.createElement("div", {className: "github"}, "github: ", github)
                            )
                        ), 
                        
                        React.createElement(Articles, {uid: _this.state.uid})
                    )
                )
            );
        }
    });
});