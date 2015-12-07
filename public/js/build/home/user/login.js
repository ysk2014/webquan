define(['react', 'jquery', 'WQ' ,'home/model/userModel','home/common/tooltip'],function(React, $, WQ, UserModel,Tooltip) {

    var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

    var mixin = {
        canvasAnimate: function() {
            var canvas = document.getElementById("cas-bc");
            var ctx = canvas.getContext("2d");
            canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            var RAF = (function () {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                            window.setTimeout(callback, 1000 / 60);
                        };
            })();
            var warea = {x: null, y: null, max: 20000};
            window.onmousemove = function(e){
                e = e || window.event;
                warea.x = e.clientX;
                warea.y = e.clientY;
            };
            window.onmouseout = function(e){
                warea.x = null;
                warea.y = null;
            };
            // 添加粒子
            // x，y为粒子坐标，xa, ya为粒子xy轴加速度，max为连线的最大距离
            var dots = [];
            for(var i=0;i<300;i++){
                var x = Math.random()*canvas.width;
                var y = Math.random()*canvas.height;
                var xa = Math.random() * 2 - 1;
                var ya = Math.random() * 2 - 1;
                dots.push({
                    x: x,
                    y: y,
                    xa: xa,
                    ya: ya,
                    max: 3000
                })
            }
            // 延迟100秒开始执行动画，如果立即执行有时位置计算会出错
            setTimeout(function(){
                animate();
            }, 100);
            // 每一帧循环的逻辑
            function animate(){
                ctx.clearRect(0,0,canvas.width, canvas.height);
                // 将鼠标坐标添加进去，产生一个用于比对距离的点数组
                var ndots  = [warea].concat(dots);
                dots.forEach(function(dot){
                    // 粒子位移
                    dot.x += dot.xa;
                    dot.y += dot.ya;
                    // 遇到边界将加速度反向
                    dot.xa *= (dot.x > canvas.width || dot.x < 0)? -1 : 1;
                    dot.ya *= (dot.y > canvas.height || dot.y < 0)? -1 : 1;
                    // 绘制点
                    ctx.fillRect(dot.x - 0.5, dot.y - 0.5, 1, 1);
                    // 循环比对粒子间的距离
                    for (var i = 0; i < ndots.length; i++) {
                        var d2 = ndots[i];
                        if (dot === d2 || d2.x === null || d2.y === null) continue;
                        var xc = dot.x - d2.x;
                        var yc = dot.y - d2.y;
                        // 两个粒子之间的距离
                        var dis = xc * xc + yc * yc;
                        // 距离比
                        var ratio;
                        // 如果两个粒子之间的距离小于粒子对象的max值，则在两个粒子间画线
                        if(dis < d2.max){
                            // 如果是鼠标，则让粒子向鼠标的位置移动
                            if (d2 === warea && dis > (d2.max / 2)) {
                                dot.x -= xc * 0.03;
                                dot.y -= yc * 0.03;
                            }
                            // 计算距离比
                            ratio = (d2.max - dis) / d2.max;
                            // 画线
                            ctx.beginPath();
                            ctx.lineWidth = ratio/2;
                            ctx.fillStyle = 'rgba(255,255,255,' + (ratio + 0.1) + ')';
                            ctx.strokeStyle = 'rgba(134,196,143,' + (ratio + 0.1) + ')';
                            ctx.moveTo(dot.x , dot.y);
                            ctx.lineTo(d2.x , d2.y);
                            ctx.stroke();
                        }
                    }
                    // 将已经计算过的粒子从数组中删除
                    ndots.splice(ndots.indexOf(dot), 1);
                });
                RAF(animate);
            }
        },
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
        handlePress: function(event) {
            var _this = this;
            if(event.which==13 && _this.state.nav == 'sign_in') {
                _this.handleSignIn();
            }
        },
        // 登陆处理
        handleSignIn: function() {
            var _this = this;
            var username = WQ.trim(_this.state.username);
            var password = WQ.trim(_this.state.password);

            if(username=='') {
                Tooltip('用户名不能为空');
                $('.login-contianer').find('input[name="username"]').focus();
                return false;
            }

            if(password=='') {
                Tooltip('密码不能为空');
                $('.login-contianer').find('input[name="password"]').focus();
                return false;
            }

            var data = {
                username: WQ.trim(_this.state.username),
                password: WQ.trim(_this.state.password),
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
            var username = WQ.trim(_this.state.username);
            var password = WQ.trim(_this.state.password);
            var email = WQ.trim(_this.state.email);
            var job = WQ.trim(_this.state.job);

            if(username=='') {
                Tooltip('用户名不能为空');
                $('.login-contianer').find('input[name="username"]').focus();
                return false;
            }

            if(password=='') {
                Tooltip('密码不能为空');
                $('.login-contianer').find('input[name="password"]').focus();
                return false;
            }

            if(!WQ.checkEmail(email)) {
                Tooltip('邮箱地址不正确');
                return false;
            }

            var data = {
                username: username,
                password: password,
                   email: email,
                     job: job,
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
        componentDidMount: function() {
            $('.left-bar').hide();
            var h = parseInt($('#login-page').height());
            $('#login-page').animate({'margin-top':-h/2+'px'},300);
            this.canvasAnimate();
        },
        componentWillReceiveProps: function(nextProps) {
            this.setState({
                nav: nextProps.way
            });
            setTimeout(function() {
                var h = parseInt($('#login-page').height());
                $('#login-page').animate({'margin-top':-h/2+'px'},300);
            },0);
        },
        render: function() {
            var _this = this;

            return (
                React.createElement("div", null, 
                    React.createElement("canvas", {id: "cas-bc"}), 
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
                                        React.createElement("input", {type: "text", className: "input-login", name: "username", value: _this.state.username, placeholder: "用户名", onChange: _this.handleUnameChange, onKeyPress: _this.handlePress})
                                    ), 
                                    React.createElement("div", {className: "input-prepend"}, 
                                        React.createElement("span", {className: "add-on"}, 
                                            React.createElement("i", {className: "fa fa-unlock-alt"})
                                        ), 
                                        React.createElement("input", {type: "password", className: "input-login", name: "password", value: _this.state.password, placeholder: "密码", onChange: _this.handlePwdChange, onKeyPress: _this.handlePress})
                                    ), 
                                    
                                        (_this.state.nav =='sign_up') ? 
                                        (React.createElement("div", null, 
                                            React.createElement("div", {className: "input-prepend"}, 
                                                React.createElement("span", {className: "add-on"}, 
                                                    React.createElement("i", {className: "fa fa-envelope-o"})
                                                ), 
                                                React.createElement("input", {type: "text", className: "input-login", name: "email", value: _this.state.email, placeholder: "email", onChange: _this.handleEmailChange, onFocus: _this.handleCheckEmail})
                                            ), 
                                            React.createElement("div", {className: "input-prepend"}, 
                                                React.createElement("span", {className: "add-on"}, 
                                                    React.createElement("i", {className: "fa fa-leaf"})
                                                ), 
                                                React.createElement("input", {type: "text", className: "input-login", name: "job", value: _this.state.job, placeholder: "职位", onChange: _this.handleJobChange})
                                            )
                                        )) : null, 
                                    
                                    
                                    React.createElement("a", {className: "btn btn-info btn-submit", href: "javascript:void(0)", onClick: this.handleSubmit}, (_this.state.nav=='sign_in') ? "登陆" : "注册"), 
                                    React.createElement("a", {target: "_blank", href: "/page/forget", className: "pull-right forget"}, "忘记密码")
                                )
                            )
                        )
                    )
                )
            );
        }
    });
});