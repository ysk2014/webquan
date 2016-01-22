<div class="navbar navbar-default" id="header">
	<div class="container">
		<a class="logo" href="/">
			<img alt="web圈" src="{{ asset('image/logo.png') }}">
		</a>
		<a class="navbar-toggle collapsed" type="button" data-toggle="collapse" aria-expanded="false">
	        <span class="sr-only">Toggle navigation</span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	        <span class="icon-bar"></span>
	    </a>
		<div class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
				<li class="active"><a href="/">首页</a></li>
				<li style="display: none;"><a href="">问答</a></li>
				<li style="display: none;"><a href="">文章</a></li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li class="search"><a href=""><i class="fa fa-search"></i></a></li>
				<?php echo $login;?>
			</ul>
		</div>
	</div>
</div>