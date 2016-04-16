

@if (empty($userinfo))
	<li class="login hidden-xs">
		<a href="#myLogin" data-toggle="modal" data-target="#myLogin">登录/注册</a>
	</li>
@else 
	<li class="dropdown" data-uid="{{$userinfo['id']}}">
		<a href="javascript:;"><img class="img-circle" src="{{ $userinfo['userUrl'] }}"><b class="caret"></b><span class="badge"></span></a>
		<ul class="dropdown-menu">
			<li><a href="/note/add">写文章</a></li>
			<li><a href="{{ '/user/'.$userinfo['id'] }}">我的首页</a></li>
			<li><a href="{{ '/user/'.$userinfo['id'].'/settings' }}">帐号设置</a></li>
			<li class="news"><a href="{{ '/user/'.$userinfo['id'].'/news' }}">消息<span class="badge"></span></a></li>
			<li><a href="#">意见反馈</a></li>
			<li><a href="/sign_out">退出</a></li>
		</ul>
	</li>
@endif

