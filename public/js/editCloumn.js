
"use strict"

$(function() {

	var editCloumn = {
		$el: $('#editCloumn'),
		
		bindEvent: function() {
			var _this = this;
			var $el = _this.$el;

			$el.find('input[name="data[name]"]').on('keyup',function(e) {
				$(this).parent().removeClass('has-error').find('.help-block').hide();
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

			$el.find('.btn-submit').on('click',function() {
				$el.find('textarea').trigger('blur');

				var $input = $el.find('input[name="data[name]"]');
				var name = $input.val();
				if ($.trim(name)=='') {
					$input.parent().addClass('has-error').find('.help-block').html('专栏标题不能为空').show();
					return false;
				}

				if ($el.find('[name="data[id]"]').length>0) {
					var params = {data:{name: name,id:$el.find('[name="data[id]"]').val()}};
				} else {
					var params = {data:{name: name}};
				}

				WQ.post('/cloumn/check/name',params,function(data) {
					if (data.unique) {
						$input.parent().removeClass('has-error').find('.help-block').hide();
					} else {
						$input.parent().addClass('has-error').find('.help-block').html(data.msg).show();
					}

					if ($el.find('.form-group').hasClass('has-error')) {
						return false;
					} else {
						$el.submit();
					}
				});

			});
			$el.submit(function(e) {
				if (e.which==13) {
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