<div class="navbar navbar-default" id="header">
	<div class="container">
		<div class="navbar-wq">
			<a class="logo" href="/">
				<img alt="web圈" src="{{ asset('image/logo.png') }}">
			</a>
			<a class="logo-min" href="javascript:void(0)">
				<img alt="web圈" src="{{ asset('image/logo.png') }}">
			</a>
			<ul class="dropdown-menu">
				<li  class="@if ($cid==0) active @endif"><a href="/">首页</a></li>
				@if (isset($cloumns) && count($cloumns)>0 && $cloumns['rc']==0) 
					@foreach ($cloumns['data'] as $cloumn)
						<li class="@if ($cid==$cloumn['id']) active @endif"><a href="{{'/cloumn/'.$cloumn['id']}}">{{$cloumn['name']}}</a></li>
					@endforeach
				@endif
			</ul>
		</div>
		<div class="collapse navbar-collapse pull-left">
			<ul class="nav navbar-nav">
				<li class="@if ($cid==0) active @endif"><a href="/">首页</a></li>
				@if (isset($cloumns) && count($cloumns)>0 && $cloumns['rc']==0) 
					@foreach ($cloumns['data'] as $cloumn)
						<li class="@if ($cid==$cloumn['id']) active @endif"><a href="{{'/cloumn/'.$cloumn['id']}}">{{$cloumn['name']}}</a></li>
					@endforeach
				@endif
			</ul>
		</div>
		<ul class="nav navbar-nav navbar-right navbar-user">
			<li class="search hidden-xs"><a href="javascript:void(0)"><i class="fa fa-search"></i></a></li>
			<?php echo $login;?>
		</ul>
	</div>
</div>

<!-- 搜索 -->
<div class="search-mask" id="search">
	<div class="container">
		<form class="form-horizontal search-form" action="/search" method="get" target="_blank">
			<div class="input-group">
				<span class="input-group-btn">
		        	<button type="button" class="btn btn-primary"><span class="text">文章</span> <span class="caret"></span></button>
		        	<ul class="dropdown-menu">
			          	<li><a data-type="0" href="javascript:void(0);">文章</a></li>
			          	<li><a data-type="1" href="javascript:void(0);">专题</a></li>
			        </ul>
		      	</span>
				<input class="form-control" type="text" name="search" placeholder="搜索">
				<input type="hidden" name="type" value="0" />
			</div>
		</form>
	</div>
</div>