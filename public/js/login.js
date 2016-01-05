
"use strict"

$(function() {


	var Login = {

		login: $('#header .login'),
		dropdown: $('#header .dropdown'),

		init: function() {
			this.bindEvent();
		},
		bindEvent: function() {
			var _this = this;

			//登录后的下拉菜单
			if (_this.dropdown.length>0) {
				_this.dropdown.children('a').on('click',function(e) {
					e.preventDefault();
					e.stopPropagation();
					var $this = $(this);
					if ($(this).parent().hasClass('open')) {
						$(this).parent().removeClass('open');
					} else {
						$(this).parent().addClass('open');
					};
					$('body').on('click',function() {
						$this.parent().removeClass('open');
					});
				})
			}

			if (_this.login.length>0) {
				_this.login.children('a').on('click', function(e) {

					e.preventDefault();
					e.stopPropagation();

					var target = $(this).data('target');
					$('body').addClass('modal-open');
					$(target).show();
					$('#mask').show();

					setTimeout(function() {
						$(target).addClass('in');
						$('#mask').addClass('in');
					},0);

					$(target).on('click', function(ev) {

						if (ev.target !== $(target)[0]) {
							return false;
						}
						
						$('body').removeClass('modal-open');
						$('#mask').removeClass('in');
						$(target).removeClass('in');

						setTimeout(function() {
							$(target).hide();
							$('#mask').hide();
						},150);

					});
				});
			}
		},
	};
		
	Login.init();
});