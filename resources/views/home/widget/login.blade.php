

@if ($userinfo)
	<li class="login">
		<a href="javascript:;" data-toggle="modal" data-target="#myModal">登录/注册</a>

		<div class="modal fade" id="myModal">
			<div class="modal-dialog modal-login">
				<div class="modal-content">
					<a class="close fa fa-close" data-dismiss="modal"></a>
					<div class="tab-nav clearfix">
						<a href="#sign_in" class="active">登录</a>
						<b>·</b>
						<a href="#sign_up">注册</a>
					</div>
					<!-- Tab panes -->
					<div class="tab-content">
					    <div role="tabpanel" class="tab-pane active" id="sign_in">
					    	<form autocomplete="off">
					    		<p class="help-block"></p>
							  	<div class="form-group">
								    <div class="input-group">
								      	<div class="input-group-addon input-lg"><i class="fa fa-user" style="margin-right:0px"></i></div>
								      	<input type="text" class="form-control input-lg" name="username" placeholder="用户名">
								    </div>
								    <p class="help-block"></p>
							  	</div>
							  	<div class="form-group">
								    <div class="input-group">
								      	<div class="input-group-addon input-lg"><i class="fa fa-lock" style="margin-right:0px"></i></div>
								      	<input type="password" class="form-control input-lg" name="password" placeholder="密码">
								    </div>
								    <p class="help-block"></p>
							  	</div>
							  	<a class="btn btn-primary btn-lg btn-block sign-in" style="width: 100%;">登录</a>
							  	<div class="clearfix" style="margin: 10px 0;">
							  		<a class="pull-right forget" href="">忘记密码</a>
							  	</div>
							</form>
						  	<div class="login-other">
						  		<p>您还可以通过以下方式直接登录</p>
						  		<ul class="clearfix">
						  			<li class="qq"><a href="/auth/qq"><i class="fa fa-qq"></i></a></li>
						  			<li class="weibo"><a href="/auth/weibo"><i class="fa fa-weibo"></i></a></li>
						  			<li class="weixin"><a href="/auth/weixin"><i class="fa fa-weixin"></i></a></li>
						  		</ul>
						  	</div>
					    </div>
					    <div role="tabpanel" class="tab-pane" id="sign_up">
					    	<form autocomplete="off">
					    		<p class="help-block"></p>
							  	<div class="form-group">
								    <div class="input-group">
								      	<div class="input-group-addon input-lg"><i class="fa fa-user" style="margin-right:0px"></i></div>
								      	<input type="text" class="form-control input-lg" name="username" placeholder="用户名">
								    </div>
								    <p class="help-block"></p>
							  	</div>
							  	<div class="form-group">
								    <div class="input-group">
								      	<div class="input-group-addon input-lg"><i class="fa fa-lock" style="margin-right:0px"></i></div>
								      	<input type="password" class="form-control input-lg" name="password" placeholder="密码">
								    </div>
								    <p class="help-block"></p>
							  	</div>
							  	<div class="form-group">
								    <div class="input-group">
								      	<div class="input-group-addon input-lg"><i class="fa fa-envelope-o" style="margin-right:0px"></i></div>
								      	<input type="text" class="form-control input-lg" name="email" placeholder="邮箱">
								    </div>
								    <p class="help-block"></p>
							  	</div>
							  	<a class="btn btn-primary btn-lg btn-block sign-up" style="width: 100%;">注册</a>
							  	<div class="clearfix" style="margin: 10px 0;">
							  		<a class="pull-right forget" href="">忘记密码</a>
							  	</div>
							</form>
						  	<div class="login-other">
						  		<p>您还可以通过以下方式直接登录</p>
						  		<ul class="clearfix">
						  			<li class="qq"><a href="/auth/qq"><i class="fa fa-qq"></i></a></li>
						  			<li class="weibo"><a href="/auth/weibo"><i class="fa fa-weibo"></i></a></li>
						  			<li class="weixin"><a href="/auth/weixin"><i class="fa fa-weixin"></i></a></li>
						  		</ul>
						  	</div>
							
					    </div>
					</div>
				</div>
			</div>
		</div>
	</li>
@else 
	<li class="dropdown">
		<a href="javascript:;"><img class="img-circle" src="{{ $userinfo['userUrl'] }}"><b class="caret"></b></a>
		<ul class="dropdown-menu">
			<li><a href="/article/add">写文章</a></li>
			<li><a href="{{ '/user/'.$userinfo['id'] }}">我的首页</a></li>
			<li><a href="#">我的专栏</a></li>
			<li><a href="#">我的笔记</a></li>
			<li><a href="#">草稿箱</a></li>
			<li><a href="#">帐号设置</a></li>
			<li><a href="#">意见反馈</a></li>
			<li><a href="/sign_out">退出</a></li>
		</ul>
	</li>
@endif

