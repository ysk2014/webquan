define(['react','jquery'],function(React, $) {

    return React.createClass({
        getInitialState: function() {
            return {
                name: 'signUp',
            }
        },
        render: function() {
            return (
                <div className="LoginBox" id="content">
                    <form method="post">
                        <input type="text" name="username" placeholder="请输入手机号或邮箱" />
                        <div className="code">
                        	<input type="text" name="code" placeholder="短信验证码" />
                        	<a href="#" className="gain" >点击获取</a>
                        	<div className="clear"></div>
                        </div>
                        <input type="text" name="password" placeholder="请输入密码" />
                        <input type="submit" className="sub" value="注册" />
                    </form>
                </div>
            );
        }
    });
})
