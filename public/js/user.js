
$(function() {
	'use strict'

	var User = {
		$el: $('#main'),

		model: function(opt) {
			WQ.ajax({
				url: opt.url,
				data: {'data':opt.data},
				success: function(data) {
					opt.callback && opt.callback(data);
				}
			});
		},
		changeTabs: function($tab) {
			var _this = this;
			var index = $tab.parent().index();

			if (index == 0) {
				var url = '/articles/user/pub';
			} else {
				var url = '/articles/user/draft';
			}

			$.post(url,{},function(data) {
				_this.$el.find('.user-page-content').html(data);
				$tab.parents('.user-nav').find('a').removeClass('active');
				$tab.addClass('active');

				_this.$el.find('.user-page-content').on('click','.article-more',function() {
					var page = parseInt($(this).data('page'),10)+1;
					var $this = $(this);
					$this.text('加载中...');

					$.post(url,{'page':page},function(htmlData) {
						$this.before(htmlData).remove();
					});
				});
			});
		},
		updateArticle: function($btn) {
			var _this = this;
			var aid = $btn.parent().data('id');
			var nid = $btn.data('nid');
			if ($btn.html() == '更新中...') return false;

			$btn.html('更新中...');
			_this.model({
				url: '/note/update/article',
				data: {'id':aid,'nid':nid},
				callback: function(data) {
					$btn.remove();
					WQ.tooltip(data.msg,'info');
				}
			});
		},
		bindEvent: function() {
			var _this = this;
			this.$el.on('click','.user-nav a',function() {
				if ($(this).hasClass('active')) return false;

				_this.changeTabs($(this));
			}).on('click','.update',function() {
				_this.updateArticle($(this));
			});
		},

		init: function() {
			this.bindEvent();
		}
	};

	User.init();
});