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
    
    var LatestArticles = React.createClass({
        getInitialState: function() {
            return {
                list: [],        //文章列表
                nav: 'praise',   //导航记录
                more:[],         //记录每个专题进入到了第几页
                next: false,     //判断是否还有数据
                cacheNav: ['praise','addtime','view','care'],
                uid: null,
            }
        },
        init: function() {
            var _this = this;
            var uid = WQ.cookie.get('id') ? WQ.cookie.get('id') : null;
            _this.setState({
                uid: uid
            });
            _this.getAllArticleByUid(uid,"praise",0);
        },
        componentDidMount: function() {
            this.init();
        },

        getAllArticleByUid: function(uid,way,page) {
            var _this = this;
            ArticleModel.getAllArticleByUid({uid:uid,way:way,page:page},function(success,data) {
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
                            more: _this.state.more,
                            next: data.next
                        });
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
                );
            }) : null;
            
            return (
                <div>
                    <div className="article-list">
                        {list}
                    </div>
                </div>
            );
        }
    })

    var HotArticles = React.createClass({
        render: function(){
            return(
                <div className="articles">
                    <div className="details">
                        <p className="top">22天之前</p>
                        <p className="middle">
                            <a href="#">踪的工资条可能让你的孩子上不了学（薪人薪事百科）</a>
                        </p>
                        <p className="bottom">
                            <a href="#">阅读&nbsp;56</a>
                            <a href="#">评论&nbsp;55</a>
                            <a href="#">喜欢&nbsp;0</a>
                        </p>
                    </div>
                </div>
            )
        }
    })

    return React.createClass({
        mixins: [mixin],
        getInitialState: function() {
            return {
                info: null,
                nav: "latestArticles",

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
                <div>
                    <LeftNav />
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
                            <div className="nav">
                                <a href="javascript:void(0)" className={_this.state.nav == "latestArticles" ? "active" : null} onClick={_this.handleClick.bind(this,"latestArticles")}>最新文章</a>
                                <a href="javascript:void(0)" className={_this.state.nav == "hotArticles" ? "active" : null} onClick={_this.handleClick.bind(this,"hotArticles")}>热门文章</a>
                                <a href="javascript:void(0)" className={_this.state.nav == "myDraft" ? "active" : null} onClick={_this.handleClick.bind(this,"myDraft")}>我的草稿</a>
                            </div>

                                <div  style={_this.state.nav=='latestArticles' ? {display:'block'} : {display:'none'}} >
                                    <LatestArticles />
                                </div>

                                <div  style={_this.state.nav=='hotArticles' ? {display:'block'} : {display:'none'}} >
                                    <HotArticles />
                                </div>

                                <div  style={_this.state.nav=='myDraft' ? {display:'block'} : {display:'none'}} >
                                    
                                </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
});