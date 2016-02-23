<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>忘记密码 | Web圈</title>
	<link href="{{ asset('image/web.ico') }}" rel="shortcut icon">
	<link href="{{ asset('css/font-awesome.min.css') }}" rel="stylesheet">
	<link href="{{ asset('css/web-ui-light.css') }}" rel="stylesheet">
	<link href="{{ asset('css/other.css') }}" rel="stylesheet">
</head>
	
<body>
    <div id="mask" style="z-index: 9999;"></div>
	<canvas id="cas-bc"></canvas>
	<div class="contain page-show" id="page-1">
		<div class="logo"><a href="/"><img src="{{ asset('image/logo.png') }}"></a></div>
		<div class="title"><span></span><h3>密码重置</h3></div>
		<div class="content">
			<div class="form-group">
				<input type="text" class="input-login form-control" name="username"  placeholder="请输入用户绑定的邮箱" />
                <small class="help-block"></small>
			</div>
			<a class="btn btn-primary btn-block" id="next-1" href="javascript:void(0)">发送</a>
		</div>
	</div>
    <div class="contain" id="page-2">
        <div class="logo"><a href="/"><img src="{{ asset('image/logo.png') }}"></a></div>
        <div class="title"><span></span><h3>为了账号安全，需要验证邮箱有效性</h3></div>
        <div class="desc">一封包含有验证码的邮件已经发送至邮箱：<a></a></div>
        <div class="content">
            <div class="input-group" style="margin-bottom:15px;">
                <input type="text" class="input-login check form-control" maxlength="6" name="verifyCode"  placeholder="请输入六位数验证码" />
                <div class="input-group-addon" id="resend">等待60秒</div>
            </div>
            <div class="form-group">
                <a class="btn btn-primary btn-block" id="next-2" href="javascript:void(0)">下一步</a>
            </div>
        </div>
    </div>
    <div class="contain" id="page-3">
        <div class="logo"><a href="/"><img src="{{ asset('image/logo.png') }}"></a></div>
        <div class="title"><span></span><h3>密码重置</h3></div>
        <div class="content">
            <div class="form-group">
                <input type="password" class="form-control" name="newPassword"  placeholder="请输入新密码" />
            </div>
            <div class="form-group">
                <input type="password" class="form-control" name="newPasswordRepeat"  placeholder="请重复新密码" />
            </div>
            <a class="btn btn-primary btn-block" id="next-3" href="javascript:void(0)">提交</a>
        </div>
    </div>
	<script type="text/javascript" src="{{ asset('js/lib/jquery-1.11.3.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/lib/wq.js') }}"></script>
	<script type="text/javascript">
        var forget = {
            init: function() {
                var _this = this;
                _this.canvasAnimate();
                _this.bindEvent();
            },
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
                                ctx.strokeStyle = 'rgba(189,251,239,' + (ratio + 0.1) + ')';
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
            bindEvent: function() {
                var _this = this;
                _this.email = '';
                _this.page1 = $('#page-1');
                _this.page2 = $('#page-2');
                _this.page3 = $('#page-3');

                _this.page1.find('input.input-login').focus();

                var dealAjax = function() {
                    var time = 60;
                    var timer = setInterval(function() {
                        --time;
                        if(time==0) {
                            clearInterval(timer);
                            $('#resend').removeClass('disabled').html('重新发送');
                            $('#next-2').addClass('disabled');
                        } else {
                            $('#resend').html('等待'+time+'秒');
                        }
                    },1000);
                };
                _this.page1.find('input').on('click',function(e) {
                    e = event || window.event;
                    if(e.which==13) {
                        $('#next-1').trigger('click');
                    }
                });
                // page1的下一步点击处理
                $('#next-1').on('click',function() {
                    var $this = $(this);
                    _this.email = $(this).siblings().find('input').val();
                    if(WQ.trim(_this.email) == '') {
                        WQ.tooltip('邮箱不能为空');
                        $(this).siblings().find('input').focus().parent().addClass('has-error');
                        return;
                    }
                    if(!WQ.check.email(_this.email)) {
                        WQ.tooltip('邮箱格式不正确');
                        $(this).siblings().find('input').focus().parent().addClass('has-error');
                        return;
                    }
                    $(this).html('发送中...').siblings('.input-group').removeClass('has-error');
                    $.get('/email',{email:_this.email},function(data) {
                        if(!data.error) {
                            $(this).html('发送');
                            _this.page1.addClass('fadeOutLeft animated');
                            _this.page2.addClass('fadeInRight animated page-show').find('.desc a').html(_this.email);

                            dealAjax();
                        } else {
                            WQ.tooltip(data.msg);
                        }
                        
                    });
                });
                // page2的验证码重新发送按钮的处理
                $('#resend').on('click',function() {

                    if($(this).hasClass('disabled')) return;

                    if($('#next-2').hasClass('disabled')) $('#next-2').removeClass('disabled');
                    
                    $.get('/email',{email:_this.email},function(data) {
                        if(!data.error) {
                            dealAjax();
                        } else {
                            WQ.tooltip(data.msg);
                        }
                    });
                });
                // page2的下一步点击处理
                $('#next-2').on('click',function() {

                    if($(this).hasClass('disabled')) return;

                    var verifyCode = $(this).parent().siblings().find('input').val();

                    if(verifyCode.length!=6) {
                        WQ.tooltip('请输入六位数的验证码');
                        return;
                    }

                    if(!WQ.check.number(verifyCode)) {
                        WQ.tooltip('您输入的验证码不能有除数字以外的字符');
                        return;
                    }

                    $.post('/email/verifyCode',{email:_this.email,code:verifyCode},function(data) {
                        if(!data.error) {
                            _this.page3.data('code',data.data);
                            _this.page2.addClass('fadeOutLeft animated');
                            _this.page3.addClass('fadeInRight animated page-show');
                        }
                    },'json');
                });

                $('#next-3').on('click', function() {
                    var newPassword = _this.page3.find('input[name="newPassword"]').val();
                    var newPasswordRepeat = _this.page3.find('input[name="newPasswordRepeat"]').val();
                    if(newPassword == '' || newPasswordRepeat == '') {
                        WQ.tooltip('密码不能为空');
                        return;
                    }
                    if(newPassword.length<6) {
                        WQ.tooltip('密码不能小于六位数');
                        return;
                    }
                    if(newPasswordRepeat != newPassword) {
                        WQ.tooltip('两次密码输入不一致');
                        return;
                    }

                    $.post('/password/reset',{code:_this.page3.data('code'),newPassword: newPassword},function(data) {
                        if(!data.error) {
                            WQ.tooltip(data.msg);
                            setTimeout(function() {
                                window.location.href = '/login/sign_in';
                            },1200);
                        } else {
                            WQ.tooltip(data.msg);
                        }
                    },'json');
                });
            }
        };
        forget.init();
	</script>
</body>
</html>
