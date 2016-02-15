
$(function() {
	'use strict'

	var Article = {
		$el: $('#main'),

		model: function(opt) {
			WQ.ajax({
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
					if ($target.hasClass('active')) {
						$target.find('span').html(num-1);
						$target.removeClass('active');
					} else {
						$target.data('sid',data.id);
						$target.find('span').html(num+1);
						$target.addClass('active');
					}
					WQ.tooltip(data.msg,'info');
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
					if ($target.hasClass('active')) {
						$target.find('span').html(num-1);
						$target.removeClass('active');
					} else {
						$target.data('pid',data.id);
						$target.find('span').html(num+1);
						$target.addClass('active');
					}
					WQ.tooltip(data.msg,'info');
				}
			});
		},

		//删除文章
		delArt: function($target) {
			var _this = this;
			var aid = $target.parents('.single-share').data('aid');
			var nid = $target.data('nid');
			$('#delModal').modal('show').on('click','.btn-primary',function() {
				_this.model({
					type: 'delete',
					url: '/article/'+aid,
					data: {'nid':nid},
					callback: function(data) {
						WQ.tooltip(data.msg,'info');
						setTimeout(function() {
							window.location.href="/";
						},500);
					}
				});
			});
				
		},

		bindEvent: function() {
			var _this = this;
			this.$el.on('click','.single-share .store',function() {
				_this.store($(this));
			}).on('click','.single-share .praise',function() {
				_this.praise($(this));
			}).on('click','.single-share .del',function() {
				_this.delArt($(this));
			});
		},

		init: function() {
			this.bindEvent();
		}
	};

	Article.init();
})