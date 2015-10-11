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
    
    var LatestArticles = React.createClass({displayName: "LatestArticles",
        render: function(){
            return(
                React.createElement("div", {className: "articles"}, 
                    React.createElement("div", {className: "left"}, 
                        React.createElement("div", {className: "details"}, 
                            React.createElement("p", {className: "top"}, "22天之前"), 
                            React.createElement("p", {className: "middle"}, 
                                React.createElement("a", {href: "#"}, "踪的工资条可能让你的孩子上不了学（薪人薪事百科）")
                            ), 
                            React.createElement("p", {className: "bottom"}, 
                                React.createElement("a", {href: "#"}, "阅读 56"), 
                                React.createElement("a", {href: "#"}, "评论 55"), 
                                React.createElement("a", {href: "#"}, "喜欢 0")
                            )
                    )
                    ), 

                    React.createElement("div", {className: "details"}, 
                        React.createElement("p", {className: "top"}, "22天之前"), 
                        React.createElement("p", {className: "middle"}, 
                            React.createElement("a", {href: "#"}, "踪的工资条可能SD敢达快递费送顾客家第三方开讲啦，发货")
                        ), 
                        React.createElement("p", {className: "bottom"}, 
                            React.createElement("a", {href: "#"}, "阅读 56"), 
                            React.createElement("a", {href: "#"}, "评论 55"), 
                            React.createElement("a", {href: "#"}, "喜欢 0")
                        )
                    )

                )
            )
        }
    })

    var HotArticles = React.createClass({displayName: "HotArticles",
        render: function(){
            return(
                React.createElement("div", {className: "articles"}, 
                    React.createElement("div", {className: "details"}, 
                        React.createElement("p", {className: "top"}, "22天之前"), 
                        React.createElement("p", {className: "middle"}, 
                            React.createElement("a", {href: "#"}, "踪的工资条可能让你的孩子上不了学（薪人薪事百科）")
                        ), 
                        React.createElement("p", {className: "bottom"}, 
                            React.createElement("a", {href: "#"}, "阅读 56"), 
                            React.createElement("a", {href: "#"}, "评论 55"), 
                            React.createElement("a", {href: "#"}, "喜欢 0")
                        )
                    ), 
                    React.createElement("div", {className: "details"}, 
                        React.createElement("p", {className: "top"}, "22天之前"), 
                        React.createElement("p", {className: "middle"}, 
                            React.createElement("a", {href: "#"}, "踪的工资条可能让你的孩子上不了学（薪人薪事百科）")
                        ), 
                        React.createElement("p", {className: "bottom"}, 
                            React.createElement("a", {href: "#"}, "阅读 56"), 
                            React.createElement("a", {href: "#"}, "评论 55"), 
                            React.createElement("a", {href: "#"}, "喜欢 0")
                        )
                    ), 

                    React.createElement("div", {className: "details"}, 
                        React.createElement("p", {className: "top"}, "22天之前"), 
                        React.createElement("p", {className: "middle"}, 
                            React.createElement("a", {href: "#"}, "踪的工资条可能让你的孩子上不了学（薪人薪事百科）")
                        ), 
                        React.createElement("p", {className: "bottom"}, 
                            React.createElement("a", {href: "#"}, "阅读 56"), 
                            React.createElement("a", {href: "#"}, "评论 55"), 
                            React.createElement("a", {href: "#"}, "喜欢 0")
                        )
                    )


                )
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
                React.createElement("div", null, 
                    React.createElement(LeftNav, null), 
                        React.createElement("div", {className: "host-box"}, 
                            React.createElement("div", {className: "host clearfix"}, 
                                React.createElement("img", {src: "/upload_path/logo/web5.jpg"}), 
                                React.createElement("div", {className: "sign"}, "好好学习，天天向上"), 
                                React.createElement("div", {className: "mes"}, 
                                    
                                        React.createElement("div", {className: "nickname"}, 
                                            React.createElement("div", null, "昵称：  ", _this.state.username == "" ? "未填写" : _this.state.username), 
                                            React.createElement("div", null, "性别：  ", _this.state.sex == "" ? "未填写" : _this.state.sex), 
                                            React.createElement("div", null, "城市：  ", _this.state.city == "" ? "未填写" : _this.state.city)
                                        ), 
                                        React.createElement("div", {className: "job"}, 
                                            React.createElement("div", null, "职位：  ", _this.state.job == "" ? "未填写" : _this.state.job), 
                                            React.createElement("div", null, "邮箱：  ", _this.state.email == "" ? "未填写" : _this.state.email)
                                        )
                                    
                                )
                            )
                        ), 
                        React.createElement("div", {className: "content"}, 
                            React.createElement("div", {className: "nav"}, 
                                React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav == "latestArticles" ? "active" : null, onClick: _this.handleClick.bind(this,"latestArticles")}, "最新文章"), 
                                React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav == "hotArticles" ? "active" : null, onClick: _this.handleClick.bind(this,"hotArticles")}, "热门文章"), 
                                React.createElement("a", {href: "javascript:void(0)", className: _this.state.nav == "myDraft" ? "active" : null, onClick: _this.handleClick.bind(this,"myDraft")}, "我的草稿")
                            ), 

                                React.createElement("div", {style: _this.state.nav=='latestArticles' ? {display:'block'} : {display:'none'}}, 
                                    React.createElement(LatestArticles, null)
                                ), 

                                React.createElement("div", {style: _this.state.nav=='hotArticles' ? {display:'block'} : {display:'none'}}, 
                                    React.createElement(HotArticles, null)
                                ), 

                                React.createElement("div", {style: _this.state.nav=='myDraft' ? {display:'block'} : {display:'none'}}
                                    
                                )
                        )
                )
            );
        }
    });
});