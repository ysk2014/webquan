
"use strict"

$(function() {


	var Login = {

		$login: $('#header .login'),
		$dropdown: $('#header .dropdown'),
		$body: $('body'),
		$mask: $('#mask'),

		scrollbarWidth: 0,
		bodyIsOverflowing: false,

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
					_this.$body.on('click',function() {
						$this.parent().removeClass('open');
					});
				})
			}

			if (_this.$login.length>0) {
				_this.$login.children('a').modal();				
			}
		},
	};
		
	Login.init();
});