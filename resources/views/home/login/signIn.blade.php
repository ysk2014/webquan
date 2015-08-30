@extends('home.login.login')

@section('content')
<h4 class="title">
	<span>
        <a class="active" href="/sign_in">登录</a>
        <b>·</b>
        <a class="" href="/sign_up">注册</a>
    </span>
</h4>
<div class="content">
	<div class="sign-in">
		<form class="form-horizontal" method="post">
			<div class="input-prepend">
				<span class="add-on"><i class="icon-user"></i></span>
				<input type="text" name="username" placeholder="用户名">
			</div>
			<div class="input-prepend">
				<span class="add-on"><i class="icon-key"></i></span>
				<input type="password" name="password" placeholder="密码">
			</div>
			<a class="btn btn-submit">登陆</a>
			<a class="text-right" href="">忘记密码</a>
		</form>
	</div>
</div>
<script>
	$(function(){
		$('.sign-in .btn-submit').on('click',function(){
			var form = $('.sign-in').find('.form-horizontal');
			var username = form.find('input[name=username]').val();
			var password = form.find('input[name=password]').val();
			var objdata = {username:username,password:password};

			$.post('/login',objdata,function(data){
				if(data.result){
					window.location.href = '/';
				}else{
					alert(data.msg);
				}
			},'json');
		});
	});
</script>
@endsection
