define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/common/tooltip',
        'home/model/articleModel',
        'WQ'
        ],function(React, $, UserModel, Tooltip, ArticleModel, WQ) {


    var mixin = {
        init: function() {
            var _this = this;
            var uid = WQ.cookie.get('id');
            UserModel.getUserInfoById(uid,function(success,data) {
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
    
    var Articles = React.createClass({
        getInitialState: function() {
            return {
                list: [],        //文章列表
                next: false,     //判断是否还有数据
                uid: null,
                nav: "addtime"
            }
        },
        init: function(nav) {
            var _this = this;
            var uid = WQ.cookie.get('id') ? WQ.cookie.get('id') : null;
            _this.setState({
                uid: uid
            });
            if (nav != "is_publish") {
                _this.getAllArticleByUid(uid,nav,0,1);
            }else{
                _this.getAllArticleByUid(uid,nav,0,0);
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
            _this.init(nav);
        },

        getAllArticleByUid: function(uid,way,page,is_publish) {
            var _this = this;
            ArticleModel.getAllArticleByUid({uid:5,way:way,page:page,is_publish:is_publish},function(success,data) {
                if(success) {
                    if(!data.error) {
                        console.log(data);
                        if(!data.error) {
                            _this.state.list[way] = data.data;
                        _this.setState({
                            list: _this.state.list,
                            next: data.next
                        });
                    }
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
                        </div>
                    </div>
                );
            }) : null;
            
            return (
                <div>
                    <div className="article-list">
                        <div className="nav">
                            <a href="javascript:void(0)" className={_this.state.nav == "addtime" ? "active" : null} onClick={_this.handleClick.bind(this,"addtime")}>最新文章</a>
                            <a href="javascript:void(0)" className={_this.state.nav == "view" ? "active" : null} onClick={_this.handleClick.bind(this,"view")}>热门文章</a>
                            <a href="javascript:void(0)" className={_this.state.nav == "is_publish" ? "active" : null} onClick={_this.handleClick.bind(this,"is_publish")}>我的草稿</a>
                        </div>
                        {list}
                    </div>
                </div>
            );
        }
    })

    return React.createClass({
        mixins: [mixin],
        getInitialState: function() {
            return {
                info: null,
            }
        },
        componentDidMount: function() {
            this.init();
        },
        
        render: function() {
            var _this = this;
            return (
                <div className="home-page">
                    <div className="host-box">
                        <div className="host clearfix">
                            <img src="/upload_path/logo/web5.jpg" />
                                <ul>
                                    <li>昵称：&nbsp;{_this.state.username == "" ? "未填写" : _this.state.username}</li>
                                    <li>性别：&nbsp;{_this.state.sex == "" ? "未填写" : _this.state.sex}</li>
                                    <li>城市：&nbsp;{_this.state.city == "" ? "未填写" : _this.state.city}</li>
                                    <li>职位：&nbsp;{_this.state.job == "" ? "未填写" : _this.state.job}</li>
                                    <li>邮箱：&nbsp;{_this.state.email == "" ? "未填写" : _this.state.email}</li>
                                </ul>
                        </div>
                    </div>
                    <div className="content">
                        <Articles />
                    </div>
                </div>
            );
        }
    });
});