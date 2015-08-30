@extends('home.login.login')

@section('content')
<h4 class="title">
	<span>
        <a class="" href="/sign_in">登录</a>
        <b>·</b>
        <a class="active" href="/sign_up">注册</a>
    </span>
</h4>
<div class="content">
	<div class="sign-up">
		<form class="form-horizontal" method="post">
			<div class="input-prepend">
				<span class="add-on"><i class="icon-user"></i></span>
				<input type="text" name="name" placeholder="用户名">
			</div>
			<div class="input-prepend">
				<span class="add-on"><i class="icon-key"></i></span>
				<input type="password" name="password" placeholder="密码">
			</div>
			<div class="input-prepend">
				<span class="add-on"><i class="icon-envelope"></i></span>
				<input type="text" name="email" placeholder="邮箱">
			</div>
			<div class="input-prepend">
				<span class="add-on"><i class="icon-coffee"></i></span>
				<input type="text" name="job" placeholder="职位">
			</div>
			<a class="btn btn-submit">注册</a>
		</form>

	</div>
</div>
<script>
	$(function(){
		
		$('.sign-up .btn-submit').on('click',function(){
			var form = $('.sign-up').find('.form-horizontal');
			var name = form.find('input[name=name]').val();
			var password = form.find('input[name=password]').val();
			var email = form.find('input[name=email]').val();
			var job = form.find('input[name=job]').val();
			if(name==''||password==''||email==''||job==''){
				alert('信息不能为空');
				return false;
			}

			var objdata = {name:name,password:password,email:email,job:job};
			$.post('/register',{data:objdata},function(data){
				if(data.result){
					window.location.href="/sign_in";
				}else{
					alert(data.msg);
				}
			},'json');
		});
	});
</script>
@endsection
