define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/common/leftNav',
        'home/common/tooltip',
        ],function(React, $, UserModel, LeftNav, Tooltip) {


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
        render: function(){
            return(
                <div className="articles">
                    <div className="left">
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

                    <div className="details">
                        <p className="top">22天之前</p>
                        <p className="middle">
                            <a href="#">踪的工资条可能SD敢达快递费送顾客家第三方开讲啦，发货</a>
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
                <div className="home-page">
                    <LeftNav />
                        <div className="host-box">
                            <div className="host clearfix">
                                <img src="/upload_path/logo/web5.jpg" />
                                <div className="sign">好好学习，天天向上</div>
                                <div className="mes">
                                    
                                        <div className="nickname">
                                            <div>昵称：&nbsp;&nbsp;{_this.state.username == "" ? "未填写" : _this.state.username}</div>
                                            <div>性别：&nbsp;&nbsp;{_this.state.sex == "" ? "未填写" : _this.state.sex}</div>
                                            <div>城市：&nbsp;&nbsp;{_this.state.city == "" ? "未填写" : _this.state.city}</div>
                                        </div>
                                        <div className="job">
                                            <div>职位：&nbsp;&nbsp;{_this.state.job == "" ? "未填写" : _this.state.job}</div>
                                            <div>邮箱：&nbsp;&nbsp;{_this.state.email == "" ? "未填写" : _this.state.email}</div>
                                        </div>
                                    
                                </div>
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
            );
        }
    });
});