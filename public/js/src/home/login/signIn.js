define(['react','jquery'],function(React, $) {

    return React.createClass({
        getInitialState: function() {
            return {
                name: 'signIn',
            }
        },
        render: function() {
            return (
                <div className="LoginBox" id="content">
                    <form method="post">
                        <input type="text" name="username" placeholder="请输入手机号或邮箱"/>
                        <input type="submit" className="sub" value="登陆/注册" />
                        <a className="text-left" href="">忘记密码</a>
                    </form>
                </div>
            );
        }
    });
})
