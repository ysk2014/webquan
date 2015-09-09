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
                    <form className = "form-horizontal" method="post">
                        <div className = "input-prepend">
                            <span className = "add-on">
                                <i className = "icon-user"></i>
                            </span>
                            <input type = "text" name = "username" placeholder = "用户名"/>
                        </div>
                        <div className = "input-prepend">
                            <span className = "add-on">
                                <i className = "icon-key"></i>
                            </span>
                            <input type = "password" name = "password" placeholder = "密码"/>
                        </div>
                        <input type="submit" className = "btn btn-submit" />
                        <a className = "text-right" href = "">忘记密码</a>
                    </form>
                </div>
            );
        }
    });
})
