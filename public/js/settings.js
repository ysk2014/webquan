
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
			}).on('blur','[name="data[username]"]',function() {
				var $username = $(this);
				if ($(this).val()=='') {
					$(this).parents('.form-group').addClass('has-error').removeClass('has-success').find('small').show().html('用户名不能为空');
					$(this).focus();
					return false;
				} else {
					WQ.ajax({
						url:'/user/name/check',
						data: {'username':$username.val()},
						success: function(data) {
							$username.parents('.form-group').addClass('has-success').removeClass('has-error').find('small').hide();
						},
						error: function(msg) {
							$username.parents('.form-group').addClass('has-error').removeClass('has-success').find('small').show().html('用户名已被占用');
						}
					});
				}
			}).on('click','.save-handler',function() {
				var params = $(this).parents('form').serialize();
				var url = $(this).data('action');
				var $username = $(this).parents('form').find('[name="data[username]"]');
				if ($username.val() == '') {
					$username.parents('.form-group').addClass('has-error').removeClass('has-success').find('small').show().html('用户名不能为空');
					$username.focus();
					return false;
				} else {
					WQ.ajax({
						type: 'put',
						url: url,
						data: params,
						success: function(data) {
							WQ.tooltip(data.msg,'info');
						}
					});
				}
			});
		},

		//专题管理
		cloumnManager: function() {
			var _this = this;
			var $page = $('#cloumn-manager');

			$.post('/cloumns/list',{data:{limit:0}},function(data) {
				$page.find('.card-content').html(data);
			});

			$page.on('click','.btn-del',function() {
				var $tr = $(this).parents('tr');
				var cid = $(this).data('id');
				WQ.ajax({
					type: 'delete',
					url: '/cloumn/'+cid,
					success: function(data) {
						WQ.tooltip(data.msg,'info');
						$tr.remove();
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

				_this.checkCtrl(target);
			});
		},

		checkCtrl: function(target) {
			var _this = this;

			switch(target) {
				case '#profile-manager':
					_this.profile();
					break;
				case '#cloumn-manager':
					_this.cloumnManager();
					break;
				case '#email-manager':
					_this.email();    //email
					break;
				case '#pwd-manager':
					_this.pwd();      //修改密码
					break;
				default: 
					_this.profile();
			}
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
			
			this.checkCtrl(target);

			this.bindEvent();
			
		}
	};

	Settings.init();
});