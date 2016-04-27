		<!-- footer -->
		<div id="footer">
			<div class="container">
				<p>Copyright © 2015-2016 Web圈. 当前呈现版本 2.0</p>
				<p>京ICP备15054320号-1</p>
			</div>
		</div>

		<!-- 登录弹出框 -->
		<div class="modal fade" id="myLogin">
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
							  		<a class="pull-right forget" target="_blank" href="/page/forget">忘记密码</a>
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

		<!-- 删除modal -->
		<div class="modal fade" id="delModal">
			<div class="modal-dialog modal-sm">
				<div class="modal-content">
					<div class="modal-body" style="padding: 25px 20px;">
						<h4 class="modal-title">你确定要删除该文章吗？</h4>
					</div>
					<div class="modal-footer">
				        <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
				        <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">确定</button>
				    </div>
				</div>
			</div>
		</div>			

		<div id="mask"></div>
		
		<!-- 浮动工具 -->
		<div id="fixedTools" class="hidden-xs hidden-sm">
			<a id="backtop" style="display: none;" class="border-bottom" href="javascript:void(0);"><span class="fa fa-chevron-up"></span></a>
			<a id="share-qrcode" class="border-bottom" href="javascript:void(0);">
				<span class="fa fa-qrcode"></span>
			</a>
			<div id="qrcode"></div>
		</div>

		<script type="text/javascript" src="{{ asset('js/lib/modal.js') }}"></script>
		<script type="text/javascript" src="{{ asset('js/login.js') }}"></script>
	</body>
</html>