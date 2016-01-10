
$(function() {
	"use strict"

	var Comment = {

		$el: $('#main .comment-wrapper'),
		$count: $('#main .comment-wrapper').children('h4').find('span'),

		// 回复模板
		replyTpl: function(data) {
			return ''
		},

		//发表评论
		send: function() {
			var _this = this;
			_this.$el.find('.btn.submit').on('click',function() {
				var $this = $(this);
				var $parent = $this.parents('form');
				var url = $parent.data('action');
				var params = $parent.serialize();

				$.post(url,params,function(data) {
					_this.$el.find('p.load-more').before(data);
					var count = parseInt(_this.$count.html());
					_this.$count.html(count+1);
					$this.siblings('textarea').val('');					
				})
			});
		},
		//更多评论
		pagination: function() {
			var _this = this;
			_this.$el.on('click','p.load-more>a',function() {
				var url = $(this).data('action');
				var $form = $(this).parent().next('form');
				$.post(url,function(data) {
					_this.$el.find('.comment-item[data-status="new"]').remove();
					_this.$el.find('p.load-more').remove();
					$form.before(data);
				});
			});
		},

		//删除评论
		delComment: function() {
			var _this = this;
			_this.$el.on('click','.comment-footer .delete',function() {
				var $this = $(this);
				var confirm = $(this).data('confirm');
				var cid = $(this).data('comment-id');
				var url = $(this).data('url');
				if (window.confirm(confirm)) {
					$.ajax({
						type: 'delete',
						url: url,
						data: {cid:cid},
						success: function(data) {
							if(!data.error) {
								$this.parents('.comment-item').remove();
								var count = parseInt(_this.$count.html());
								_this.$count.html(count-1);
							} else {
								alert(data.msg);
							}
						}
					})
				} else {
					return false;
				}
			});
		},

		render: function() {
			var _this = this;

			this.$el.find('.btn-primary.login').modal();

			this.send();

			this.pagination();

			this.delComment();
		},

	};

	Comment.render();

})