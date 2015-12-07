<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>忘记密码|Web圈</title>
	<link href="{{ asset('image/web.ico') }}" rel="shortcut icon">
	<link href="{{ asset('css/font-awesome.min.css') }}" rel="stylesheet">
	<link href="{{ asset('css/base.css') }}" rel="stylesheet">
	<link href="{{ asset('css/other.css') }}" rel="stylesheet">
</head>
	
<body>
	<canvas id="cas-bc"></canvas>
	<div class="container page-show">
		<div class="logo"><a href="/"><img src="{{ asset('image/logo1.png') }}"></a></div>
		<div class="title"><span></span><h3>密码重置</h3></div>
		<div class="content">
			<div class="input-prepend">
				<span class="add-on">
                    <i class="fa fa-envelope-o"></i>
                </span>
				<input type="text" class="input-login" name="username"  placeholder="请输入用户绑定的邮箱" />
			</div>
			<a class="btn btn-info btn-submit" id="next-1" href="javascript:void(0)">下一步</a>
		</div>
	</div>
    <div class="container">
        <div class="logo"><a href="/"><img src="{{ asset('image/logo1.png') }}"></a></div>
        <div class="title"><span></span><h3>为了账号安全，需要验证邮箱有效性</h3></div>
        <div class="desc">一封包含有验证码的邮件已经发送至邮箱：<a></a></div>
        <div class="content">
            <div class="input-prepend">
                <span id="resend" class="add-on-btn btn btn-info disabled">等待60秒</span>
                <input type="text" class="input-login check" name="username"  placeholder="请输入验证码" />
            </div>
            <a class="btn btn-info btn-submit" id="next-2" href="javascript:void(0)">下一步</a>
        </div>
    </div>
    <div class="container">
        <div class="logo"><a href="/"><img src="{{ asset('image/logo1.png') }}"></a></div>
        <div class="title"><span></span><h3>密码重置</h3></div>
        <div class="content">
            <div class="input-prepend">
                <span iclass="add-on">
                    <i class="fa fa-envelope-o"></i>
                </span>
                <input type="text" class="input-login check" name="username"  placeholder="请输入验证码" />
            </div>
            <a class="btn btn-info btn-submit" id="next-3" href="javascript:void(0)">下一步</a>
        </div>
    </div>
	<script type="text/javascript" src="{{ asset('js/lib/jquery-1.11.3.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/lib/wq.js') }}"></script>
	<script type="text/javascript">
        var canvasAnimate = function() {
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
        }
        canvasAnimate();

        $('.input-login').focus();

        var email;

        var dealAjax = function(ele,email) {
            ele.parents('.container').addClass('fadeOutLeft animated').next('.container').addClass('fadeInRight animated page-show').find('.desc a').html(email);
            var time = 60;
            var timer = setInterval(function() {
                --time;
                if(time==0) {
                    clearInterval(timer);
                    $('#resend').removeClass('disabled').html('重新发送')
                } else {
                    $('#resend').html('等待'+time+'秒');
                }
            },1000);
        };

        $('#next-1').on('click',function() {
            var $this = $(this);
            email = $(this).siblings().find('input').val();
        	if(WQ.trim(email) == '') {
        		alert('邮箱不能为空');
        		$(this).siblings().find('input').focus();
        		return;
        	}
            if(!WQ.checkEmail(email)) {
                alert('邮箱格式不正确');
                $(this).siblings().find('input').focus();
                return;
            }
	        $.get('/email',{email:email},function(data) {
	        	dealAjax($this,email);
	        });
        });

        $('#resend').on('click',function() {
            if($(this).hasClass('disabled')) return;

            $.get('/email',{email:email},function(data) {
                dealAjax($('#next-1'),email);
            });
        });

        $('#next-2').on('click',function() {
            $(this).parents('.container').addClass('fadeOutLeft animated').next('.container').addClass('fadeInRight animated page-show');
        });
        
	</script>
</body>
</html>
