
$(function() {
	'use strict'

	var Article = {
		$el: $('#main'),

		model: function(opt) {
			$.ajax({
				type: opt.type ? opt.type : 'post',
				url: opt.url,
				data: {'data':opt.data},
				success: function(data) {
					opt.callback && opt.callback(data);
				}
			});
		},

		//收藏
		store: function($target) {
			var _this = this;
			var aid = $target.parents('.single-share').data('aid');
			var num = parseInt($target.find('span').html());

			if ($target.hasClass('active')) {
				var url = '/store/'+$target.data('sid');
				var params = {'type':1,'aid':aid};
			} else {
				var url = '/article/'+aid+'/store';
				var params = {'type':1};
			}

			_this.model({
				url: url,
				data: params,
				callback: function(data) {
					if (!data.error) {
						if ($target.hasClass('active')) {
							$target.find('span').html(num-1);
							$target.removeClass('active');
						} else {
							$target.find('span').html(num+1);
							$target.addClass('active');
						}
						WQ.tooltip(data.msg,'info');
					} else {
						WQ.tooltip(data.msg);
					}
				}
			});
		},
		// 推荐
		praise: function($target) {
			var _this = this;
			var aid = $target.parents('.single-share').data('aid');
			var num = parseInt($target.find('span').html());

			if ($target.hasClass('active')) {
				var url = '/praise/'+$target.data('pid');
				var params = {'type':0,'aid':aid};
			} else {
				var url = '/article/'+aid+'/praise';
				var params = {'type':0};
			}

			_this.model({
				url: url,
				data: params,
				callback: function(data) {
					if (!data.error) {
						if ($target.hasClass('active')) {
							$target.find('span').html(num-1);
							$target.removeClass('active');
						} else {
							$target.find('span').html(num+1);
							$target.addClass('active');
						}
						WQ.tooltip(data.msg,'info');
					} else {
						WQ.tooltip(data.msg);
					}
				}
			});
		},

		bindEvent: function() {
			var _this = this;
			this.$el.on('click','.single-share .store',function() {
				_this.store($(this));
			}).on('click','.single-share .praise',function() {
				_this.praise($(this));
			});
		},

		init: function() {
			this.bindEvent();
		}
	};

	Article.init();
})