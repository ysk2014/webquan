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
                        console.log(data.data);
                        _this.setState({
                            info: data.data,
                        });
                    } else {
                        Tooltip(data.msg);
                    }
                }
            });
        }
    };
    var FocusUser = React.createClass({
        render: function(){
            return(
                <div className="focus-user">
                    <div className="details clearfix">
                        <img src="/upload_path/logo/web5.jpg" />
                        <div className="center">
                            <p className="top">殷士凯</p>
                            <div className="middle">
                                <a href="#">关注&nbsp;0</a>
                                <a href="#">粉丝&nbsp;0</a>
                                <a href="#">文章&nbsp;0</a>
                            </div>
                            <p className="bottom">获得了360个喜欢</p>
                        </div>
                        <div className="right">
                            <a href="#">正在关注</a>
                        </div>
                    </div>
                    <div className="details clearfix">
                        <img src="/upload_path/logo/web5.jpg" />
                        <div className="center">
                            <p className="top">殷士凯</p>
                            <div className="middle">
                                <a href="#">关注&nbsp;0</a>
                                <a href="#">粉丝&nbsp;0</a>
                                <a href="#">文章&nbsp;0</a>
                            </div>
                            <p className="bottom">获得了360个喜欢</p>
                        </div>
                        <div className="right">
                            <a href="#">正在关注</a>
                        </div>
                    </div>
                    <div className="details clearfix">
                        <img src="/upload_path/logo/web5.jpg" />
                        <div className="center">
                            <p className="top">殷士凯</p>
                            <div className="middle">
                                <a href="#">关注&nbsp;0</a>
                                <a href="#">粉丝&nbsp;0</a>
                                <a href="#">文章&nbsp;0</a>
                            </div>
                            <p className="bottom">获得了360个喜欢</p>
                        </div>
                        <div className="right">
                            <a href="#">正在关注</a>
                        </div>
                    </div>
                </div>
            )
        }
    });
    var Fans = React.createClass({
        render: function(){
            return(
                    <div className="fans">
                        <div className="details clearfix">
                            <img src="/upload_path/logo/web5.jpg" />
                            <div className="center">
                                <p className="top">殷士凯</p>
                                <div className="middle">
                                    <a href="#">关注&nbsp;0</a>
                                    <a href="#">粉丝&nbsp;0</a>
                                    <a href="#">文章&nbsp;0</a>
                                </div>
                                <p className="bottom">获得了360个喜欢</p>
                            </div>
                            <div className="right">
                                <a href="#">添加关注</a>
                            </div>
                        </div>
                        <div className="details clearfix">
                            <img src="/upload_path/logo/web5.jpg" />
                            <div className="center">
                                <p className="top">殷士凯</p>
                                <div className="middle">
                                    <a href="#">关注&nbsp;0</a>
                                    <a href="#">粉丝&nbsp;0</a>
                                    <a href="#">文章&nbsp;0</a>
                                </div>
                                <p className="bottom">获得了360个喜欢</p>
                            </div>
                            <div className="right">
                                <a href="#">添加关注</a>
                            </div>
                        </div>
                        <div className="details clearfix">
                            <img src="/upload_path/logo/web5.jpg" />
                            <div className="center">
                                <p className="top">殷士凯</p>
                                <div className="middle">
                                    <a href="#">关注&nbsp;0</a>
                                    <a href="#">粉丝&nbsp;0</a>
                                    <a href="#">文章&nbsp;0</a>
                                </div>
                                <p className="bottom">获得了360个喜欢</p>
                            </div>
                            <div className="right">
                                <a href="#">添加关注</a>
                            </div>
                        </div>
                        <div className="details clearfix">
                            <img src="/upload_path/logo/web5.jpg" />
                            <div className="center">
                                <p className="top">殷士凯</p>
                                <div className="middle">
                                    <a href="#">关注&nbsp;0</a>
                                    <a href="#">粉丝&nbsp;0</a>
                                    <a href="#">文章&nbsp;0</a>
                                </div>
                                <p className="bottom">获得了360个喜欢</p>
                            </div>
                            <div className="right">
                                <a href="#">添加关注</a>
                            </div>
                        </div>

                    </div>
            )
        }
    })
    var LatestArticles = React.createClass({
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
                nav: "attention",
                litNav: "focusUser"
            }
        },
        componentDidMount: function() {
            this.init();
        },
        handleClick: function(nav,litNav){
            var _this = this;
            _this.setState({
                nav: nav,
                litNav: litNav
            })
        },
        navHandleClick: function(litNav){
            var _this = this;
            _this.setState({
                litNav: litNav
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
                                <div className="mes">
                                    <p>殷士凯</p>
                                </div>
                                <div className="nav">
                                    <a href="#" onClick={_this.handleClick.bind(this,"attention","focusUser")}>0<br />关注</a>
                                    <a href="#" onClick={_this.handleClick.bind(this,"attention","fans")}>0<br />粉丝</a>
                                    <a href="#" onClick={_this.handleClick.bind(this,"essay","latestArticles")}>0<br />文章</a>
                                    <a>0<br />收获喜欢</a>
                                </div>
                            </div>
                        </div>
                        <div className="host-content">
                        {_this.state.nav == "attention" ?
                            (<div className="nav">
                                <a href="#" className={_this.state.litNav == 'focusUser' ? 'active' : null} onClick={_this.navHandleClick.bind(this,"focusUser")}>关注用户(5)</a>
                                <a href="#" className={_this.state.litNav == 'fans' ? 'active' : null} onClick={_this.navHandleClick.bind(this,"fans")}>粉丝(7)</a>
                            </div>):
                            (<div className="nav">
                                <a href="#" className={_this.state.litNav == 'latestArticles' ? 'active' : null} onClick={_this.navHandleClick.bind(this,"latestArticles")}>最新文章(121)</a>
                                <a href="#" className={_this.state.litNav == 'hotArticles' ? 'active' : null} onClick={_this.navHandleClick.bind(this,"hotArticles")}>热门文章(7)</a>
                            </div>)
                        }
                            <div className="con">
                                <div  style={_this.state.litNav=='focusUser' ? {display:'block'} : {display:'none'}} >
                                    <FocusUser />
                                </div>

                                <div  style={_this.state.litNav=='fans' ? {display:'block'} : {display:'none'}} >
                                    <Fans />
                                </div>
                                        
                                <div  style={_this.state.litNav=='latestArticles' ? {display:'block'} : {display:'none'}} >
                                    <LatestArticles />
                                </div>

                                <div  style={_this.state.litNav=='hotArticles' ? {display:'block'} : {display:'none'}} >
                                    <HotArticles />
                                </div>

                            </div>



                        </div>
                </div>
            );
        }
    });
});