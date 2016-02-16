
$(function() {
	'use strict'

	var Settings = {
		$el: $('#main'),
		// 个人信息
		profile: function() {
			var _this = this;
			var $page = $('#profile-manager');

			$page.on('click','.upload-handler',function() {                       //上传头像
				$('#upload-logo').find('input[type="file"]').trigger('click');
			}).on('change','[name="logo"]',function() {
				$(this).parent().submit();
				$('#hidden_frame').on('load',function() {
	                var uploadIframe = $(this).get(0);
	                var body = (uploadIframe.contentWindow ? uploadIframe.contentWindow : uploadIframe.contentDocument).document.body;
	                var json = (body.innerText) ? body.innerText : ( (body.textContent) ? body.textContent : null);

	                json = (typeof JSON.parse !== "undefined") ? JSON.parse(json) : eval("(" + json + ")");

	                if (json.rc === 0) {
	                    $('.avatar.img-100').css('background-image','url('+ json.data +'?date='+(new Date()).getTime()+')').find('input').val(json.data);
	                } else {
	                    WQ.tooltip(json.msg);
	                }
	                return false;
	            });
			}).on('click','.save-handler',function() {
				var params = $(this).parents('form').serialize();
				var url = $(this).data('action');
				WQ.ajax({
					type: 'put',
					url: url,
					data: params,
					success: function(data) {
						WQ.tooltip(data.msg,'info');
					}
				});
			});
		},

		email: function() {

		},

		pwd: function() {
			var _this = this;
			var $page = $('#pwd-manager');

			var formSubmit = function($form) {
				var oldPassword = $form.find('[name="data[oldPassword]"]');
				var newPassword = $form.find('[name="data[newPassword]"]');
				var newPasswordRepeat = $form.find('[name="data[newPasswordRepeat]"]');


				if (oldPassword.val() == '') {
					oldPassword.parents('.form-group').addClass('has-error').removeClass('has-success').find('small').show().html('当前密码不能为空');
					oldPassword.focus();
					return false;
				} else if (oldPassword.val().length<6) {
					oldPassword.parents('.form-group').addClass('has-error').removeClass('has-success').find('small').show().html('当前密码不能小于6位数');
					oldPassword.focus();
					return false;
				} else {
					oldPassword.parents('.form-group').addClass('has-success').removeClass('has-error').find('small').hide();
				}

				if (newPassword.val() == '') {
					newPassword.parents('.form-group').addClass('has-error').removeClass('has-success').find('small').show().html('新密码不能为空');
					newPassword.focus();
					return false;
				} else if (newPassword.val().length<6) {
					newPassword.parents('.form-group').addClass('has-error').removeClass('has-success').find('small').show().html('新密码不能小于6位数');
					newPassword.focus();
					return false;
				} else {
					newPassword.parents('.form-group').addClass('has-success').removeClass('has-error').find('small').hide();
				}

				if (newPasswordRepeat.val() != newPassword.val()) {
					newPasswordRepeat.parents('.form-group').addClass('has-error').removeClass('has-success').find('small').show().html('新密码输入不一致');
					newPasswordRepeat.focus();
					return false;
				} else {
					newPasswordRepeat.parents('.form-group').addClass('has-success').removeClass('has-error').find('small').hide();
				}

				$form.find('.save-handler').html('正在提交...');
				var params = $form.serialize();
				var url = $form.data('action');
				
				WQ.ajax({
					type: 'put',
					url: url,
					data: params,
					success: function(data) {
						WQ.tooltip(data.msg,'info');
						$form.find('.save-handler').html('提交');
					},
					error: function(msg) {
						WQ.tooltip(msg);
						$form.find('.save-handler').html('提交');
					}
				});
			}

			$page.on('click','.save-handler',function() {
				formSubmit($(this).parents('form'));
			}).on('keyup','input',function(e) {
				if(e.which==13) {
					formSubmit($(this).parents('form'));
				}
			});
		},

		oauth: function() {

		},

		notify: function() {

		},

		bindEvent: function() {
			var _this = this;
			_this.$el.on('click','.sidebar-nav a',function() {
				if ($(this).hasClass('active')) return false;

				var target = $(this).attr('href');
				$(this).addClass('active').parent().siblings().find('a').removeClass('active');
				$(target).removeClass('hide').addClass('show').siblings('.card').removeClass('show').addClass('hide');
			});
		},

		init: function() {
			var target = window.location.hash;
			if (target!='') {
				var index = $(target).index();
				this.$el.find('.sidebar-nav a').eq(index).addClass('active');
			} else {
				var target = this.$el.find('.sidebar-nav a').eq(0).addClass('active').attr('href');
			}
			$(target).addClass('show').removeClass('hide');
			
			this.bindEvent();
			this.profile();  //个人信息
			this.email();    //email
			this.pwd();      //修改密码
			this.oauth();    //第三方登录
			this.notify();   //通知
		}
	};

	Settings.init();
});