
define(['react', 'jquery', 'home/model/userModel'],function(React, $, UserModel) {


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
        // nav切换
        changeNav: function(event) {
            var _this = this;
            var nav = $(event.target).data('nav');
            if(nav != _this.state.nav) {
                _this.setState({
                    nav: nav
                });
            }
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
                        window.location.href ="/";
                    } else {
                        alert(data.msg);
                    }
                }
            });
        },
        handleSubmit: function() {
            var _this = this;
            if(_this.state.nav=='sign_in') {
                _this.handleSignIn();
            } else if(_this.state.nav == 'sign_up') {

            }
        },
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
            return (
                <div className="login-page">
                    <div className="logo"></div>
                    <h4 className="title">
                        <span>
                            <a className={_this.state.nav=='sign_in' ? "active" : ""} data-nav="sign_in" onClick={this.changeNav} href="javascript:void(0);">登陆</a>
                            <b>·</b>
                            <a className={_this.state.nav=='sign_up' ? "active" : ""} data-nav="sign_up" onClick={this.changeNav} href="javascript:void(0);">注册</a>
                        </span>
                    </h4>
                    <div className="login-contianer">
                        <form className="form-horizontal">
                            <div className="input-prepend">
                                <span className="add-on">
                                    <i className="fa fa-user"></i>
                                </span>
                                <input type="text" name="username" value={_this.state.username} placeholder="用户名" onChange={_this.handleUnameChange} />
                            </div>
                            <div className="input-prepend">
                                <span className="add-on">
                                    <i className="fa fa-unlock-alt"></i>
                                </span>
                                <input type="password" name="password" value={_this.state.password} placeholder="密码" onChange={_this.handlePwdChange} />
                            </div>
                            {
                                (_this.state.nav =='sign_up') ? 
                                (<div>
                                    <div className="input-prepend">
                                        <span className="add-on">
                                            <i className="fa fa-envelope-o"></i>
                                        </span>
                                        <input type="text" name="email" value={_this.state.email} placeholder="email" onChange={_this.handleEmailChange} />
                                    </div>
                                    <div className="input-prepend">
                                        <span className="add-on">
                                            <i className="fa fa-leaf"></i>
                                        </span>
                                        <input type="text" name="job" value={_this.state.job} placeholder="职位" onChange={_this.handleJobChange} />
                                    </div>
                                </div>) : null
                            }
                            
                            <a className="submit-button" onClick={this.handleSubmit}>登陆</a>
                        </form>
                    </div>
                </div>
            );
        }
    });
});