
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
	                    $('.avatar.img-100').css('background-image','url('+ json.data +')').find('input').val(json.data);
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

			$page.on('click','.save-handler',function() {
				var $form = $(this).parents('form');
				if ($form.find('[name="data[oldPassword]"]').val() == '') {
					WQ.tooltip('当前密码不能为空');
					$form.find('[name="data[oldPassword]"]').focus();
					return false;
				} else if ($form.find('[name="data[newPassword]"]').val().length<6) {
					WQ.tooltip('当前密码不能小于6位数');
					$form.find('[name="data[oldPassword]"]').focus();
					return false;
				}

				if ($form.find('[name="data[newPassword]"]').val() == '') {
					WQ.tooltip('新密码不能为空');
					$form.find('[name="data[newPassword]"]').focus();
					return false;
				} else if ($form.find('[name="data[newPassword]"]').val().length<6) {
					WQ.tooltip('新密码不能小于6位数');
					$form.find('[name="data[newPassword]"]').focus();
					return false;
				}

				if ($form.find('[name="data[newPasswordRepeat]"]').val() == '') {
					WQ.tooltip('确认新密码不能为空');
					$form.find('[name="data[newPasswordRepeat]"]').focus();
					return false;
				} else if ($form.find('[name="data[newPasswordRepeat]"]').val().length<6) {
					WQ.tooltip('确认新密码不能小于6位数');
					$form.find('[name="data[newPasswordRepeat]"]').focus();
					return false;
				}

				var params = $form.serialize();
				var url = $(this).data('action');
				
				WQ.ajax({
					type: 'put',
					url: url,
					data: params,
					success: function(data) {
						WQ.tooltip(data.msg,'info');
						window.location.href = '/';
					}
				});

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