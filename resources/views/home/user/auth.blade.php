
<?php echo widget('Home.Common')->header(); ?>

<?php echo widget('Home.Common')->top(); ?>

<div class="container user-auth-page" id="main">
	<div class="row">
    	<div class="col-md-12">
    		<div class="auth-top">
    			<h3>关联Web圈帐号</h3>
    			<a href="javascript:void(0);" class="pull-right" style="display: none;">关联已有帐号</a>
    			<a href="javascript:void(0);" class="pull-right" style="display: none;">关联新帐号</a>
    		</div>
    		<div class="auth-content">
    			<div class="user" style="display: block;">
    				<div class="avatar"><img class="img-120" src="{{ $authData['avatar'] }}"></div>
    				<div class="name">{{ $authData['nick'] }}</div>
    				<div class="desc">您尚未关联Web圈帐号</div>
    				<div class="links">
    					<a href="javascript:void(0);" class="btn btn-primary btn-block bind-login" style="margin-bottom: 10px;">关联已有帐号</a>
    					<a href="javascript:void(0);" class="btn btn-default btn-block register">关联新帐号</a>
    				</div>
    			</div>
    			<form autocomplete="off" class="sign-in-page" style="display: none;">
		    		<p class="help-block"></p>
		    		<input type="hidden" name="auth[nick]" value="{{ $authData['nick'] }}">
		    		<input type="hidden" name="auth[avatar]" value="{{ $authData['avatar'] }}">
		    		<input type="hidden" name="auth[openid]" value="{{ $authData['openid'] }}">
		    		<input type="hidden" name="auth[type]" value="{{ $authData['type'] }}">
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
				  	<a class="btn btn-primary btn-lg btn-block btn-sign-in" style="width: 100%;">登录</a>
				  	<div class="clearfix" style="margin: 10px 0;">
				  		<a class="pull-right forget" target="_blank" href="/page/forget">忘记密码</a>
				  	</div>
				</form>
				<form autocomplete="off" class="sign-up-page" style="display: none;">
					<input type="hidden" name="auth[nick]" value="{{ $authData['nick'] }}">
		    		<input type="hidden" name="auth[avatar]" value="{{ $authData['avatar'] }}">
		    		<input type="hidden" name="auth[openid]" value="{{ $authData['openid'] }}">
		    		<input type="hidden" name="auth[type]" value="{{ $authData['type'] }}">
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
				  	<a class="btn btn-primary btn-lg btn-block btn-sign-up" style="width: 100%;">注册</a>
				</form>
    		</div>
    		
    	</div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/auth.js') }}"></script>

<?php echo widget('Home.Common')->footer(); ?>
