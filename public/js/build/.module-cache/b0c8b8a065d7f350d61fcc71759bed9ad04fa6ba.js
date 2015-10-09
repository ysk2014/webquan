define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/common/tooltip'
        ],function(React, $, UserModel,Tooltip) {


    var mixin = {
 
    };

    return React.createClass({
        mixins: [mixin],
        getInitialState: function() {
            return {
                nav: this.props.params.way,
                username: '',
                password: '',
                email: '',
                job: '',
            }
        },

        render: function() {
            var _this = this;
            // console.log(_this.props.params.way);
            return (
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
                                React.createElement("input", {type: "text", name: "username", value: _this.state.username, placeholder: "用户名", onChange: _this.handleUnameChange})
                            ), 
                            React.createElement("div", {className: "input-prepend"}, 
                                React.createElement("span", {className: "add-on"}, 
                                    React.createElement("i", {className: "fa fa-unlock-alt"})
                                ), 
                                React.createElement("input", {type: "password", name: "password", value: _this.state.password, placeholder: "密码", onChange: _this.handlePwdChange})
                            ), 
                            
                                (_this.state.nav =='sign_up') ? 
                                (React.createElement("div", null, 
                                    React.createElement("div", {className: "input-prepend"}, 
                                        React.createElement("span", {className: "add-on"}, 
                                            React.createElement("i", {className: "fa fa-envelope-o"})
                                        ), 
                                        React.createElement("input", {type: "text", name: "email", value: _this.state.email, placeholder: "email", onChange: _this.handleEmailChange})
                                    ), 
                                    React.createElement("div", {className: "input-prepend"}, 
                                        React.createElement("span", {className: "add-on"}, 
                                            React.createElement("i", {className: "fa fa-leaf"})
                                        ), 
                                        React.createElement("input", {type: "text", name: "job", value: _this.state.job, placeholder: "职位", onChange: _this.handleJobChange})
                                    )
                                )) : null, 
                            
                            
                            React.createElement("a", {className: "submit-button", onClick: this.handleSubmit}, (_this.state.nav=='sign_in') ? "登陆" : "注册")
                        )
                    )
                )
            );
        }
    });
});