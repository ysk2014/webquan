
"use strict"

$(function() {

	var editCloumn = {
		$el: $('#editCloumn'),
		
		bindEvent: function() {
			var _this = this;
			var $el = _this.$el;

			$el.find('input[name="data[name]"]').on('blur',function() {
				if (WQ.trim($(this).val())=='') {
					$(this).parent().addClass('has-error').find('.help-block').html('专栏标题不能为空').show();
					return false;
				} else {
					_this.checkName($(this));
					$(this).parent().removeClass('has-error').find('small').hide();
					return true;
				}
			});

			$el.find('textarea').on('blur',function() {
				if (WQ.trim($(this).val())=='') {
					$(this).parent().addClass('has-error').find('.help-block').html('专栏描述不能为空').show();
					return false;
				} else {
					$(this).parent().removeClass('has-error').find('small').hide();
					return true;
				}
			});

			$el.submit(function() {
				if (WQ.trim($el.find('input[name="data[name]"]').val())=='') {
					$el.find('input[name="data[name]"]').parent().addClass('has-error').find('.help-block').html('专栏标题不能为空').show();
					return false;
				}

				if (WQ.trim($el.find('textarea').val())=='') {
					$el.find('textarea').parent().addClass('has-error').find('.help-block').html('专栏描述不能为空').show();
					return false;
				}
			});
		},
		checkName: function($input) {
			var name = $input.val();
			WQ.post('/cloumn/check/name',{'name':name},function(data) {
				if (data.unique) {
					$input.parent().removeClass('has-error').find('.help-block').hide();
				} else {
					$input.parent().addClass('has-error').find('.help-block').html(data.msg).show();
				}
				return false;
			});
		},
		init: function() {
			this.bindEvent();
		}

	};

	editCloumn.init();
	
});