

@if (!empty($title))
	<li class="login">
		<a href="javascript:;" data-toggle="modal" data-target="#myModal">登录/注册</a>

		<div class="modal fade" id="myModal">
			<div class="modal-dialog modal-login">
				<div class="modal-content">
					<a class="close fa fa-close" data-dismiss="modal"></a>
					<div class="tab-nav clearfix">
						<a href="#sign_in">登录</a>
						<b>·</b>
						<a href="#sign_up">注册</a>
					</div>
					<!-- Tab panes -->
					<div class="tab-content">
					    <div role="tabpanel" class="tab-pane active" id="sign_in">
					    	<form>
							  	<div class="form-group">
								    <label class="sr-only"><i class="fa fa-user"></i></label>
								    <div class="input-group">
								      	<div class="input-group-addon"><i class="fa fa-user"></i></div>
								      	<input type="text" class="form-control" name="username" placeholder="用户名">
								    </div>
							  	</div>
							  	<div class="form-group">
								    <label class="sr-only"><i class="fa fa-unlock"></i></label>
								    <div class="input-group">
								      	<div class="input-group-addon"><i class="fa fa-lock"></i></div>
								      	<input type="password" class="form-control" name="password" placeholder="密码">
								    </div>
							  	</div>
							  	<button type="submit" class="btn btn-primary">登录</button>
							</form>
					    </div>
					    <div role="tabpanel" class="tab-pane" id="sign_up">dshaudhsua</div>
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

<script type="text/javascript" src="{{ asset('js/lib/modal.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/login.js') }}"></script>