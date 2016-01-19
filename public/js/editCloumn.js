
"use strict"

$(function() {

	var editCloumn = {
		$el: $('#editCloumn'),
		
		bindEvent: function() {
			var _this = this;
			var $el = _this.$el;

			$el.find('input[name="data[name]"]').on('blur',function() {
				if (WQ.trim($(this).val())=='') {
					$(this).parent().addClass('has-error');
					WQ.tooltip('专栏标题不能为空');
					return false;
				} else {
					$(this).parent().removeClass('has-error');
					return true;
				}
			});

			$el.find('textarea').on('blur',function() {
				if (WQ.trim($(this).val())=='') {
					$(this).parent().addClass('has-error');
					WQ.tooltip('专栏描述不能为空');
					return false;
				} else {
					$(this).parent().removeClass('has-error');
					return true;
				}
			});

			$el.submit(function() {
				if (WQ.trim($el.find('input[name="data[name]"]').val())=='') {
					$el.find('input[name="data[name]"]').parent().addClass('has-error');
					WQ.tooltip('专栏标题不能为空');
					return false;
				}

				if (WQ.trim($el.find('textarea').val())=='') {
					$el.find('textarea').parent().addClass('has-error');
					WQ.tooltip('专栏描述不能为空');
					return false;
				}
			});
		},

		init: function() {
			this.bindEvent();
		}

	};

	editCloumn.init();
	
});