
define(['react','jquery'],function(React, $) {

    return React.createClass({
        getInitialState: function() {
            return {
                nav: 0,
            }
        },
        changeNav: function(event) {
            var _this = this;
            var nav = $(event.target).data('nav');
            if(nav != _this.state.nav) {
                _this.setState({
                    nav: nav
                });
            }
        },
        render: function() {
            var _this = this;
            return (
                <div className="login-page">
                    <div className="logo"></div>
                    <h4 className="title">
                        <span>
                            <a className={_this.state.nav==0 ? "active" : ""} data-nav="0" onClick={this.changeNav} href="javascript:void(0);">登陆</a>
                            <b>·</b>
                            <a className={_this.state.nav==1 ? "active" : ""} data-nav="1" onClick={this.changeNav} href="javascript:void(0);">注册</a>
                        </span>
                    </h4>
                    <div className="login-contianer">
                        <form className="form-horizontal">
                            <div className="input-prepend">
                                <span className="add-on">
                                    <i className="fa fa-user"></i>
                                </span>
                                <input type="text" name="username" placeholder="用户名" />
                            </div>
                            <div className="input-prepend">
                                <span className="add-on">
                                    <i className="fa fa-unlock-alt"></i>
                                </span>
                                <input type="password" name="password" placeholder="密码" />
                            </div>
                            {
                                (_this.state.nav ==1) ? 
                                (<div>
                                    <div className="input-prepend">
                                        <span className="add-on">
                                            <i className="fa fa-envelope-o"></i>
                                        </span>
                                        <input type="text" name="email" placeholder="email" />
                                    </div>
                                    <div className="input-prepend">
                                        <span className="add-on">
                                            <i className="fa fa-leaf"></i>
                                        </span>
                                        <input type="text" name="job" placeholder="职位" />
                                    </div>
                                </div>) : null
                            }
                            
                            <button className="submit-button">登陆</button>
                        </form>
                    </div>
                </div>
            );
        }
    });
});