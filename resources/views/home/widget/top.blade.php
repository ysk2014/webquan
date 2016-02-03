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
				<li class="active"><a href="/">首页</a></li>
				<li style="display: none;"><a href="">问答</a></li>
				<li style="display: none;"><a href="">文章</a></li>
			</ul>
		</div>
		<div class="collapse navbar-collapse pull-left">
			<ul class="nav navbar-nav">
				<li class="active"><a href="/">首页</a></li>
				<li style="display: none;"><a href="">问答</a></li>
				<li style="display: none;"><a href="">文章</a></li>
			</ul>
		</div>
		<ul class="nav navbar-nav navbar-right navbar-user">
			<li class="search"><a href=""><i class="fa fa-search"></i></a></li>
			<?php echo $login;?>
		</ul>
	</div>
</div>