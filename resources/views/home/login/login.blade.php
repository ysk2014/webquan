<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Web圈</title>

	<link href="{{ asset('/css/font-awesome.min.css') }}" rel="stylesheet">
	<link href="{{ asset('/css/normalize.css') }}" rel="stylesheet">
	<link href="{{ asset('/css/app.css') }}" rel="stylesheet">
	<link href="{{ asset('/css/wq.css') }}" rel="stylesheet">


	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->

	<script src="{{ asset('/js/lib/jquery-1.11.3.min.js') }}"></script>

</head>
<body>
	<div class="navbar-user">
		@if(isset($userInfo))
		<a class="user avatar" data-toggle="dropdown" href="javascript:void(0)">
			<img src="{{ asset('/image/user.png') }}">
			<i class="caret"></i>
		</a>
		<ul class="dropdown-menu arrow-top">
			<li>
				<a href=""><i class="icon-pencil"></i>我的主页</a>
			</li>
			<li>
				<a href=""><i class="icon-user"></i>我的主页</a>
			</li>
			<li>
				<a href=""><i class="icon-bookmark"></i>我的主页</a>
			</li>
			<li>
				<a href=""><i class="icon-cogs"></i>我的主页</a>
			</li>
			<li><a href="/sign_out"><i class="icon-signout"></i>退出</a></li>
		</ul>
		@else
		<a class="login" href="/sign_up"><i class="icon-user"></i>注册</a>
		<a class="login" href="/sign_in"><i class="icon-signin"></i>登陆</a>
		@endif
	</div>
	
	<nav class="navbar-left">
		<a class="logo" href="/"><img src="{{ asset('/image/logo.png') }}"></a>
		<div class="dropdown">
			<a class="{{ isset($navStatus) && $navStatus=='home' ? 'active' : ''}}" href="/" data-toggle="tooltip" data-placement="right" data-title="首页">
				<i class="icon-home icon-large"></i><span class="title">首页</span>
			</a>
			<a class="{{ isset($navStatus) && $navStatus=='cloumn' ? 'active' : ''}}" href="/cloumn" data-toggle="tooltip" data-placement="right" data-title="笔记本">
				<i class="icon-book icon-large"></i><span class="title">专题</span>
			</a>
			<a class="{{ isset($navStatus) && $navStatus=='qa' ? 'active' : ''}}" href="" data-toggle="tooltip" data-placement="right" data-title="问答">
				<i class="icon-lightbulb icon-large"></i><span class="title">问答</span>
			</a>
			<a class="{{ isset($navStatus) && $navStatus=='job' ? 'active' : ''}}" href="" data-toggle="tooltip" data-placement="right" data-title="讨论区">
				<i class="icon-group icon-large"></i><span class="title">讨论区</span>
			</a>
		</div>
		@if(isset($userInfo))
		<div class="nav-user">
			<a href="" data-toggle="tooltip" data-placement="right" data-title="我的首页">
				<i class="icon-user icon-large"></i><span class="title">我的首页</span>
			</a>
			<a class="active" href="" data-toggle="tooltip" data-placement="right" data-title="我的收藏">
				<i class="icon-bookmark icon-large"></i><span class="title">我的收藏</span>
			</a>
			<a href="" data-toggle="tooltip" data-placement="right" data-title="设置">
				<i class="icon-cogs icon-large"></i><span class="title">设置</span>
			</a>
			<a href="/sign_out" data-toggle="tooltip" data-placement="right" data-title="退出">
				<i class="icon-signout icon-large"></i><span class="title">退出</span>
			</a>
		</div>
		@endif
	</nav>

	<div class="container">
		<div class="login-page">
			<div class="logo"></div>
			@yield('content')
		</div>
	</div>
</body>
</html>
