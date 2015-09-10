define(['react','jquery'],function(React, $) {

    var SignUpForm = React.createClass({
        render: function(){
        return(
            <form method="post">
                <input type="text" name= "username" placeholder="请输入手机号或邮箱" />
                <input type="text" name= "nickname" placeholder="写一个昵称" />
                <input type="text" name="password" placeholder= "请输入密码" />
                <input type="submit" className="sub" value="注册" />
            </form>
        )    
        }
    });

    var SignInForm = React.createClass({
        render: function(){
        return(
            <form method="post">
                <input type="text" name="username" placeholder="请输入手机号或邮箱" />
                <input type="text" name="password" placeholder="请输入密码" />
                <input type="submit" className="sub" value="登录" />
                <a className="text-left" href="">忘记密码</a>
            </form>
        )    
        }
    });
    var Choose = React.createClass({
        render: function(){
        return(
            <div className="choose">
                <span className="chooseA">
                    <a href="#" onClick={this.props.handleClick.bind(this,"SignIn")} className="fontColor">登陆</a>&nbsp;&nbsp;&middot;&nbsp;&nbsp;<a href="#" onClick={this.props.handleClick.bind(this,"SignUp")}>注册</a>
                </span>
            </div>
        )    
        }
    });

    return React.createClass({
        getInitialState: function() {
            return {
                name: 'LoginIn',
                login: 'SignIn'
            }
        },
        handleClick: function(a){
            this.setState({login: a});
        },
        render: function() {
            $(".chooseA").find("a").removeClass("fontColor");
            if (this.state.login=="SignIn"){
                $(".chooseA").find("a:eq(0)").addClass("fontColor")
                return (
                    <div className="LoginBox" id="content">
                        <Choose handleClick={this.handleClick}/> 
                        <SignInForm />
                    </div>
                )
            }else{ 
                $(".chooseA").find("a:eq(1)").addClass("fontColor")
                return (
                    <div className="LoginBox" id="content">
                        <Choose handleClick={this.handleClick}/>
                        <SignUpForm />
                    </div>
                )
            }
        }
    });
})
