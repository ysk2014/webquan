

@if (!empty($title))
	<li class="login">
		<a href="javascript:;" data-toggle="modal" data-target="#myModal">登录/注册</a>

		<div class="modal fade" id="myModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 class="modal-title">登录</h4>
					</div>
					<div class="modal-body">
						<p>One fine body&hellip;</p>
					</div>
					<div class="modal-footer">
						<a class="btn btn-default" data-dismiss="modal">Close</a>
						<a class="btn btn-primary">Save changes</a>
					</div>
				</div>
			</div>
		</div>
	</li>
@else 
	<li class="dropdown">
		<a href="javascript:;"><img class="img-circle" src="{{ asset('image/user-default.png') }}"><b class="caret"></b></a>
		<ul class="dropdown-menu">
			<li><a href="/article/add">写文章</a></li>
			<li><a href="#">我的首页</a></li>
			<li><a href="#">我的专栏</a></li>
			<li><a href="#">我的笔记</a></li>
			<li><a href="#">草稿箱</a></li>
			<li><a href="#">帐号设置</a></li>
			<li><a href="#">意见反馈</a></li>
			<li><a href="#">退出</a></li>
		</ul>
	</li>
@endif

<script type="text/javascript" src="{{ asset('js/login.js') }}"></script>