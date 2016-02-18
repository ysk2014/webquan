
<?php echo widget('Home.Common')->header(); ?>

<?php echo widget('Home.Common')->top(); ?>

<div class="container settings-page" id="main">
	<div class="row">
		<div class="col-sm-2 col-md-3">
			<div class="card sidebar-user hidden-sm">
				<div class="card-content clearfix">
					<div class="avatar info-avatar img-60" style="background-image: url({{ $userInfo['logo_dir'] }})"></div>
					<div class="info-items">
						<div class="info-name">{{ $userInfo['username'] }}</div>
						<div class="info-desc"></div>
					</div>
				</div>
			</div>
			<div class="card sidebar-nav">
				<ul class="nav">
					<li><a class="" href="#profile-manager">
						<i class="fa fa-user"></i><br>
						<span class="nav-title">个人信息</span>
					</a></li>
					<li><a href="#email-manager">
						<i class="fa fa-envelope"></i><br>
						<span class="nav-title">Email</span>
					</a></li>
					<li><a href="#pwd-manager">
						<i class="fa fa-eye"></i><br>
						<span class="nav-title">密码修改</span>
					</a></li>
					<li><a href="#oauth-manager">
						<i class="fa fa-group"></i><br>
						<span class="nav-title">Oauth</span>
					</a></li>
					<li><a href="#notify-manager">
						<i class="fa fa-bell"></i><br>
						<span class="nav-title">通知提醒</span>
					</a></li>
				</ul>
			</div>
		</div>
		<div class="col-sm-10 col-md-9">
			<div class="card hide profile-manager" id="profile-manager">
				<div class="card-header">
					<h4 class="card-title">个人信息</h4>
				</div>
				<div class="card-content">
					<form id="upload-logo" action="{{ '/user/'.$userInfo['id'].'/logo' }}" encType="multipart/form-data" method="post" target="hidden_frame">
						<input type="file" class="hide" name="logo" /> 
						<iframe  name='hidden_frame' id="hidden_frame" class="hide" src=""></iframe>
					</form>
					<form class="form-horizontal info-group">
						<input type="hidden" class="hide" name="data[id]" value="{{ $userInfo['id'] }}" /> 
						<!-- 头像 -->
						<div class="form-group">
							<label class="col-sm-2 control-label avatar-label">头像</label>
							<div class="col-sm-10">
								<div class="avatar-wrap">
									<div class="avatar img-100" style="background-image:url({{ $userInfo['logo_dir'] }})">
										<div class="progress-mask"></div>
										<input type="hidden" class="hide" name="data[logo_dir]" value="{{ $userInfo['logo_dir'] }}" /> 
									</div>
									<div class="avatar-set">
										<a class="btn btn-default upload-handler">上传新头像</a>
									</div>
								</div>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">姓名</label>
							<div class="col-sm-10"><input class="form-control" type="text" name="data[username]" value="{{ $userInfo['username'] }}"><small class="help-block"></small></div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">职位</label>
							<div class="col-sm-10"><input class="form-control" type="text" name="data[job]" value="{{ $userInfo['job'] }}"></div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">性别</label>
							<div class="col-sm-10">
								<label class="radio-inline"><input type="radio" name="data[sex]" value="0" @if ($userInfo['sex']==0) checked @endif>男</label>
								<label class="radio-inline"><input type="radio" name="data[sex]" value="1" @if ($userInfo['sex']==1) checked @endif>女</label>
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">联系电话</label>
							<div class="col-sm-10"><input class="form-control" type="text" name="data[phone]" value="{{ $userInfo['phone'] }}"></div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">github</label>
							<div class="col-sm-10"><input class="form-control" type="text" name="data[github]" value="{{ $userInfo['github'] }}"></div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 control-label">自我简介</label>
							<div class="col-sm-10"><textarea class="form-control" type="text" name="data[description]" rows="3">{{ $userInfo['description'] }}</textarea></div>
						</div>
						<div class="form-group"><div class="col-sm-10 col-sm-offset-2"><a class="btn btn-lg btn-primary btn-block save-handler" data-action="{{ '/user/'.$userInfo['id'] }}">保存</a></div></div>
					</form>
				</div>
			</div>
			<div class="card hide" id="email-manager">
				<div class="card-header">
					<h4 class="card-title">Email地址</h4>
				</div>
				<div class="card-content">
					<form class="form-horizontal info-group">
						<div class="form-group">
							<label class="col-sm-2 control-label avatar-label">Email</label>
							<div class="col-sm-8"><input class="form-control" type="text" name="data[email]" style="max-width: 100%;" value="{{ $userInfo['email'] }}"></div>
							<div class="col-sm-2"><a class="btn btn-primary btn-block save-handler" data-action="{{ '/user/'.$userInfo['id'] }}">提交</a></div>
						</div>
					</form>
				</div>
			</div>
			<div class="card hide" id="pwd-manager">
				<div class="card-header">
					<h4 class="card-title">密码修改</h4>
				</div>
				<div class="card-content">
					<form class="form-horizontal info-group" data-action="{{ '/user/'.$userInfo['id'].'/password' }}">
						<input type="hidden" class="hide" name="data[id]" value="{{ $userInfo['id'] }}" /> 
						<div class="form-group">
							<label class="col-sm-3 control-label avatar-label">当前密码<i style="color: #e74c3c;">*</i></label>
							<div class="col-sm-9"><input class="form-control" type="password" name="data[oldPassword]"><small class="help-block"></small></div>
							
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label avatar-label">新密码<i style="color: #e74c3c;">*</i></label>
							<div class="col-sm-9"><input class="form-control" type="password" name="data[newPassword]"><small class="help-block"></small></div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 control-label avatar-label">确认新密码<i style="color: #e74c3c;">*</i></label>
							<div class="col-sm-9"><input class="form-control" type="password" name="data[newPasswordRepeat]"><small class="help-block"></small></div>
						</div>
						<div class="form-group"><div class="col-sm-9 col-sm-offset-3"><a class="btn btn-lg btn-primary btn-block save-handler">提交</a></div></div>
					</form>
				</div>
			</div>
			<div class="card hide" id="oauth-manager">
				<div class="card-header">
					<h4 class="card-title">第三方帐号</h4>
				</div>
				<div class="card-content">
					<div class="list-group info-group group-lg bounds-list">
						<div class="list-group-item">
							<div class="handler-set">
								<a class="btn unbind-handler btn-sm btn-danger" data-id="5601242cf0f5f1ca6198c1c3" data-type="QQ">解除绑定</a>
							</div>
							<div class="info-app">
								<span class="fa fa-qq"></span>QQ：<a href="https://qq.com">ysk2014</a>
							</div>
						</div>
						<div class="list-group-item">
							<div class="handler-set">
								<a class="btn unbind-handler btn-sm btn-danger" data-id="5601242cf0f5f1ca6198c1c3" data-type="weibo">解除绑定</a>
							</div>
							<div class="info-app">
								<span class="fa fa-weibo"></span>微博：<a href="https://weibo.com">ysk2014</a>
							</div>
						</div>
						<div class="list-group-item">
							<div class="handler-set">
								<a class="btn unbind-handler btn-sm btn-danger" data-id="5601242cf0f5f1ca6198c1c3" data-type="weixin">解除绑定</a>
							</div>
							<div class="info-app">
								<span class="fa fa-weixin"></span>微信：<a href="https://github.com">ysk2014</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="card hide" id="notify-manager"></div>
		</div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/settings.js') }}"></script>

<?php echo widget('Home.Common')->footer(); ?>