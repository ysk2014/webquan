
"use strict"

$(function() {


	var Login = {

		$login: $('#header .login'),
		$dropdown: $('#header .dropdown'),
		$body: $('body'),
		$mask: $('#mask'),

		init: function() {
			this.bindEvent();
		},
		bindEvent: function() {
			var _this = this;

			//登录后的下拉菜单
			if (_this.$dropdown.length>0) {
				_this.$dropdown.children('a').on('click',function(e) {
					e.preventDefault();
					e.stopPropagation();
					var $this = $(this);
					if ($(this).parent().hasClass('open')) {
						$(this).parent().removeClass('open');
					} else {
						$(this).parent().addClass('open');
					};
					$(document).one('click',function() {
						$this.parent().removeClass('open');
					});
				})
			};

			if (_this.$login.length>0) {

				_this.$login.find('.tab-nav a').on('click',function() {
					if ($(this).hasClass('active')) {
						return false;
					}
					$(this).addClass('active').siblings().removeClass('active');
					var target = $(this).attr('href');
					$(target).addClass('active').siblings().removeClass('active');
				});

				//登录处理
				_this.signIn($('#sign_in').children('form'));
				_this.signUp($('#sign_up').children('form'));
			};
		},
		signIn: function($form) {
			var _this = this;

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
			});
		},
		signUp: function($form) {
			var _this = this;

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
			});
		},
		checkUserName: function($el) {
			var tip = $el.parent().siblings('.help-block');

			if (WQ.trim($el.val())=="") {
				tip.html('用户名不能为空');
				return false;
			} else {
				tip.html('');
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
		}
	};
		
	Login.init();
});