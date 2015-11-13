define(['react', 'jquery', 'home/model/userModel','home/common/tooltip'],function(React, $, UserModel,Tooltip) {

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    var mixin = {
        // 输入框的值改变
        handleUnameChange: function(event) {
            var _this = this;
            _this.setState({
                username: event.target.value,
            });
        },
        handlePwdChange: function(event) {
            var _this = this;
            _this.setState({
                password: event.target.value,
            });
        },
        handleEmailChange: function(event) {
            var _this = this;
            _this.setState({
                email: event.target.value,
            });
        },
        handleJobChange: function(event) {
            var _this = this;
            _this.setState({
                job: event.target.value,
            });
        },
        // 登陆处理
        handleSignIn: function() {
            var _this = this;
            var data = {
                username: _this.state.username,
                password: _this.state.password,
            }
            UserModel.login(data,function(success,data) {
                if(success) {
                    if(!data.error) {
                        if(_this.state.method && _this.state.page) {
                            window.location.href ="/"+_this.state.page+'/'+_this.state.method;
                        } else if(_this.state.page) {
                            window.location.href ="/"+_this.state.page;
                        } else {
                            window.location.href ="/";
                        }
                    } else {
                        Tooltip(data.msg);
                    }
                }
            });
        },
        //注册处理
        handleSignUp: function() {
            var _this = this;
            var data = {
                username: _this.state.username,
                password: _this.state.password,
                   email: _this.state.email,
                     job: _this.state.job,
            }
            UserModel.register(data,function(success,data) {
                if (success) {
                    if(!data.error) {
                        Tooltip("注册成功");
                        _this.setState({
                            nav: "sign_in",
                        });
                    } else {
                        Tooltip(data.msg);
                    }
                };
            });
        },
        handleSubmit: function() {
            var _this = this;
            if(_this.state.nav == 'sign_in') {
                _this.handleSignIn();
            } else if(_this.state.nav == 'sign_up') {
                _this.handleSignUp();
            }
        },
    };

    return React.createClass({
        mixins: [mixin],
        getInitialState: function() {
            return {
                nav: this.props.way,
                page: this.props.params&& this.props.params['page'] ? this.props.params['page'] : null,
                method: this.props.params&& this.props.params['method'] ? this.props.params['method'] : null,
                username: '',
                password: '',
                email: '',
                job: '',
            }
        },
        componentWillReceiveProps: function(nextProps) {
            this.setState({
                nav: nextProps.way
            });
        },
        render: function() {
            var _this = this;

            return (
                React.createElement(ReactCSSTransitionGroup, {transitionName: "fade", transitionAppear: true}, 
                    React.createElement("div", {className: "login-page", id: "login-page"}, 
                        React.createElement("div", {className: "logo"}), 
                        React.createElement("h4", {className: "title"}, 
                            React.createElement("span", null, 
                                React.createElement("a", {className: _this.state.nav=='sign_in' ? "active" : "", href: "/login/sign_in"}, "登陆"), 
                                React.createElement("b", null, "·"), 
                                React.createElement("a", {className: _this.state.nav=='sign_up' ? "active" : "", href: "/login/sign_up"}, "注册")
                            )
                        ), 
                        React.createElement("div", {className: "login-contianer"}, 
                            React.createElement("form", {className: "form-horizontal"}, 
                                React.createElement("div", {className: "input-prepend"}, 
                                    React.createElement("span", {className: "add-on"}, 
                                        React.createElement("i", {className: "fa fa-user"})
                                    ), 
                                    React.createElement("input", {type: "text", className: "input-login", name: "username", value: _this.state.username, placeholder: "用户名", onChange: _this.handleUnameChange})
                                ), 
                                React.createElement("div", {className: "input-prepend"}, 
                                    React.createElement("span", {className: "add-on"}, 
                                        React.createElement("i", {className: "fa fa-unlock-alt"})
                                    ), 
                                    React.createElement("input", {type: "password", className: "input-login", name: "password", value: _this.state.password, placeholder: "密码", onChange: _this.handlePwdChange})
                                ), 
                                
                                    (_this.state.nav =='sign_up') ? 
                                    (React.createElement("div", null, 
                                        React.createElement("div", {className: "input-prepend"}, 
                                            React.createElement("span", {className: "add-on"}, 
                                                React.createElement("i", {className: "fa fa-envelope-o"})
                                            ), 
                                            React.createElement("input", {type: "text", className: "input-login", name: "email", value: _this.state.email, placeholder: "email", onChange: _this.handleEmailChange})
                                        ), 
                                        React.createElement("div", {className: "input-prepend"}, 
                                            React.createElement("span", {className: "add-on"}, 
                                                React.createElement("i", {className: "fa fa-leaf"})
                                            ), 
                                            React.createElement("input", {type: "text", className: "input-login", name: "job", value: _this.state.job, placeholder: "职位", onChange: _this.handleJobChange})
                                        )
                                    )) : null, 
                                
                                
                                React.createElement("a", {className: "btn btn-info btn-submit", href: "javascript:void(0)", onClick: this.handleSubmit}, (_this.state.nav=='sign_in') ? "登陆" : "注册")
                            )
                        )
                    )
                )
            );
        }
    });
});