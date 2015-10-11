define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/common/leftNav',
        'home/common/tooltip',
        'home/model/articleModel',
        'WQ'
        ],function(React, $, UserModel, LeftNav, Tooltip, ArticleModel, WQ) {


    var mixin = {
        init: function() {
            var _this = this;
            var uid = WQ.cookie.get('id');
            UserModel.getUserInfoById({id:uid},function(success,data) {
                if(success) {
                    if(!data.error) {
                        var data = data.data
                        _this.setState({
                                        id: data.id,
                                  username: data.username,
                                       job: data.job,
                                      city: data.city,
                                       sex: data.sex,
                               description: data.description,
                                     email: data.email,

                        });
                    } else {
                        Tooltip(data.msg);
                    }
                }
            });
        }
    };
    
    var Articles = React.createClass({displayName: "Articles",
        getInitialState: function() {
            return {
                list: [],        //文章列表
                more:[],         //记录每个专题进入到了第几页
                next: false,     //判断是否还有数据
                uid: null,
            }
        },
        init: function() {
            var _this = this;
            var uid = WQ.cookie.get('id') ? WQ.cookie.get('id') : null;
            _this.setState({
                uid: uid
            });
            _this.getAllArticleByUid(uid,"addtime",0);

        },

        componentDidMount: function() {
            this.init();
        },

        getAllArticleByUid: function(uid,way,page) {
            var _this = this;
            ArticleModel.getAllArticleByUid({uid:uid,way:way,page:page},function(success,data) {
                if(success) {
                    if(!data.error) {
                        console.log(data);
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
                    }
                }
            });
        },

        render: function() {
            var _this = this;
            var nav = this.props.nav;
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
                    React.createElement("div", {className: "host-addtime"}, 
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
                    )
                );
            }) : null;
            
            return (
                React.createElement("div", null, 
                    React.createElement("div", {className: "article-list"}, 
                        list
                    )
                )
            );
        }
    })

    return React.createClass({
        mixins: [mixin],
        getInitialState: function() {
            return {
                info: null,
                nav: "addtime",
            }
        },
        componentDidMount: function() {
            this.init();
        },
        handleClick: function(nav){
            var _this = this;
            _this.setState({
                nav: nav,
            })
        },
        render: function() {
            var _this = this;
            return (
                React.createElement("div", null, 
                    React.createElement(LeftNav, null), 
                    React.createElement("div", {className: "home-page"}, 
                        React.createElement("div", {className: "host-box"}, 
                            React.createElement("div", {className: "host clearfix"}, 
                                React.createElement("img", {src: "/upload_path/logo/web5.jpg"}), 
                                    React.createElement("ul", null, 
                                        React.createElement("li", null, "昵称： ", _this.state.username == "" ? "未填写" : _this.state.username), 
                                        React.createElement("li", null, "性别： ", _this.state.sex == "" ? "未填写" : _this.state.sex), 
                                        React.createElement("li", null, "城市： ", _this.state.city == "" ? "未填写" : _this.state.city), 
                                        React.createElement("li", null, "职位： ", _this.state.job == "" ? "未填写" : _this.state.job), 
                                        React.createElement("li", null, "邮箱： ", _this.state.email == "" ? "未填写" : _this.state.email)
                                    )
                            )
                        ), 
                        React.createElement("div", {className: "content"}, 
                            React.createElement("div", {className: "nav"}, 
                                React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav == "addtime" ? "active" : null, onClick: _this.handleClick.bind(this,"addtime")}, "最新文章"), 
                                React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav == "view" ? "active" : null, onClick: _this.handleClick.bind(this,"view")}, "热门文章"), 
                                React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav == "myDraft" ? "active" : null, onClick: _this.handleClick.bind(this,"myDraft")}, "我的草稿")
                            ), 

                            React.createElement("div", null, 
                                React.createElement(Articles, {nav: _this.state.nav})
                            )

                        )
                    )
                )
            );
        }
    });
});