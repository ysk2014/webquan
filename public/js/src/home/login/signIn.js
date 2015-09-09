define(['react','jquery'],function(React, $) {

    var SignUpForm = React.createClass({
        render: function(){
        return(
            <form method="post">
                <input type="text" name= "username" placeholder="请输入手机号或邮箱" />
                <div className="code">
                    <input type="text" name="code" placeholder="短信验证码" />
                    <a href="#" className="gain" >点击获取</a>
                    <div className="clear"></div>
                </div>
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
                <span><a href="#">登陆</a><a href="#">注册</a></span>
            </div>
        )    
        }
    });

    return React.createClass({
        getInitialState: function() {
            return {
                name: 'LoginIn',
            }
        },
        render: function() {
            return (
                <div className="LoginBox" id="content">
                    <Choose />
                    <SignInForm />
                </div>
            );
        }
    });
})
