
;$(function() {
	'use strict'

	var Auth = {

		$el: $('#main'),

		bindUser: function() {
			var _this = this;
			var $page = _this.$el.find('.auth-content > .user');
			var $btn = _this.$el.find('.auth-top a');

			$btn.eq(0).on('click',function() {
				$btn.hide().eq(1).show();
				$page.hide().siblings('.sign-in-page').hide().siblings('.sign-up-page').show();
			});
			$btn.eq(1).on('click',function() {
				$btn.hide().eq(0).show();
				$page.hide().siblings('.sign-up-page').hide().siblings('.sign-in-page').show();
			});

			$page.on('click','.bind-login',function() {
				$page.hide().siblings('.sign-in-page').show();
				$btn.eq(0).show();
			}).on('click','.register',function() {
				$page.hide().siblings('.sign-up-page').show();
				$btn.eq(1).show();
			});
		},

		handleSignIn: function() {
			var _this = this;
			var $form = _this.$el.find('.auth-content > .sign-in-page');

			var submit = function() {

				if (!_this.checkForm($form)) return false;

				$form.find('a.sign_in').html('登录中...');

				var data = $form.serialize();
				
				WQ.ajax({
					url:'/sign_in',
					data:data,
					success: function(data) {
						$form.find('a.sign_in').html('登录');
						window.location.reload();
					},
					error: function(msg) {
						$form.find('a.sign_in').html('登录');
						$form.children('.help-block').html(msg);
					}
				});
			};

			$form.on('click','a.sign-in',function() {
				submit();
			}).on('keypress','input',function(e) {
				if (e.which==13) {
					submit();
				}
			}).on('keyup','input[name="password"]', function() {
				_this.checkPwd($(this));
			}).on('blur','input[name="username"]',function() {
				_this.checkUserName($(this));
			});

		},

		handleSignUp: function() {
			var _this = this;
			var $form = _this.$el.find('.auth-content > .sign-up-page');

			var submit = function() {

				if (!_this.checkForm($form)) return false;

				$form.find('a.sign_up').html('注册中...');

				var data = $form.serialize();
				WQ.post({
					url:'/sign_up',
					data: data,
					success: function(data) {
						$form.find('a.sign_up').html('注册');
						window.location.reload();
					},
					error: function(msg) {
						$form.find('a.sign_up').html('注册');
						$form.children('.help-block').html(data.msg);
					}
				});
			};

			$form.on('click','a.sign-up',function() {
				submit();
			}).on('keypress','input',function(e) {
				if (e.which==13) {
					submit();
				}
			}).on('keyup','input[name="password"]', function() {
				_this.checkPwd($(this));
			}).on('keyup','input[name="email"]',function() {
				_this.checkEmail($(this))
			}).on('blur','input[name="username"]',function() {
				if (_this.checkUserName($(this))) {
					var $username = $(this);
					WQ.ajax({
						url:'/user/name/check',
						data: {'username':$username.val()},
						success: function(data) {
							$username.parents('.form-group').addClass('has-success').removeClass('has-error').find('.help-block').hide();
						},
						error: function(msg) {
							$username.parents('.form-group').addClass('has-error').removeClass('has-success').find('.help-block').show().html('用户名已被占用');
						}
					});
				}
			});
		},

		checkUserName: function($el) {
			var tip = $el.parent().siblings('.help-block');

			if (WQ.trim($el.val())=="") {
				tip.html('用户名不能为空');
				tip.parent().addClass('has-error');
				return false;
			} else {
				tip.html('');
				tip.parent().removeClass('has-error');
				return true;
			}
		},
		checkPwd: function($el) {
			var tip = $el.parent().siblings('.help-block');

			if (WQ.trim($el.val())=="") {
				tip.html('密码不能为空');
				tip.parent().addClass('has-error');
				return false;
			} else if ($el.val().length<6) {
				tip.html('密码长度不能小于6位');
				tip.parent().addClass('has-error');
				return false;
			} else {
				tip.html('');
				tip.parent().removeClass('has-error');
				return true;
			}
		},
		checkEmail: function($el) {
			var tip = $el.parent().siblings('.help-block');

			if (WQ.trim($el.val())=="") {
				tip.html('邮箱不能为空');
				tip.parent().addClass('has-error');
				return false;
			} else if (!WQ.check.email($el.val())) {
				tip.html('邮箱格式不正确');
				tip.parent().addClass('has-error');
				return false;
			} else {
				tip.html('');
				tip.parent().removeClass('has-error');
				return true;
			}
		},
		checkForm: function($form) {
			var _this = this;
			var result = true;
			$form.find('input').each(function() {
				if ($(this).attr('name')=='username') {
					result =  _this.checkUserName($(this));
				} else if ($(this).attr('name')=='password') {
					result =  _this.checkPwd($(this));
				} else {
					result =  _this.checkEmail($(this));
				}
			});
			return result;
		},

		init: function() {
			var _this = this;
			_this.bindUser();
			_this.handleSignIn();
			_this.handleSignUp();
		}
	};
	Auth.init();
});