

@if (empty($userinfo))
	<li class="login">
		<a href="#myLogin" data-toggle="modal" data-target="#myLogin">登录/注册</a>
	</li>
@else 
	<li class="dropdown">
		<a href="javascript:;"><img class="img-circle" src="{{ $userinfo['userUrl'] }}"><b class="caret"></b></a>
		<ul class="dropdown-menu">
			<li><a href="/note/add">写文章</a></li>
			<li><a href="{{ '/user/'.$userinfo['id'] }}">我的首页</a></li>
			<li><a href="{{ '/user/'.$userinfo['id'].'/settings' }}">帐号设置</a></li>
			<li><a href="#">意见反馈</a></li>
			<li><a href="/sign_out">退出</a></li>
		</ul>
	</li>
@endif

