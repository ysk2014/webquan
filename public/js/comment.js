
$(function() {
	"use strict"

	var Comment = {

		$el: $('#main .comment-wrapper'),
		$count: $('#main .comment-wrapper').children('h4').find('span'),

		// 回复模板
		replyTpl: function(data) {
			return '<form class="new-child-comment" data-action="'+data.action+'" accept-charset="UTF-8" data-remote="true" data-type="json" method="post">'
					+'<input type="hidden" name="data[pid]" value="'+data.pid+'">'
					+'<input type="hidden" name="data[fid]" value="'+data.fid+'">'
					+'<div class="comment-text">'
						+'<textarea maxlength="1000" placeholder="写下你的评论…" class="mousetrap" name="data[content]">@'+data.nick+' </textarea>'
						+'<a class="btn btn-primary btn-sm submit" >发表</a>'
					+'</div></form>'
		},

		//发表评论
		send: function() {
			var _this = this;
			_this.$el.on('click','.btn.submit',function() {
				var $this = $(this);
				var $parent = $this.parents('form');
				var url = $parent.data('action');
				var params = $parent.serialize();

				$.post(url,params,function(data) {
					if ($parent.find('input[name="pid"]').length>0) {

					} else {
						if (_this.$el.find('p.load-more').length>0) {
							_this.$el.find('p.load-more').before(data);
						} else {
							$parent.before(data);
						}
					}
					
					var count = parseInt(_this.$count.html());
					_this.$count.html(count+1);
					$this.siblings('textarea').val('');					
				});
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
					});
				} else {
					return false;
				}
			});
		},

		reply: function() {
			var _this = this;
			_this.$el.on('click','.comment-footer .reply',function() {
				var $childComment = $(this).parent().siblings(".child-comment-list");

				var data = {};
				data.action = $(this).data('action');
				data.fid = $(this).data('pid');
				data.pid = $(this).data('fid');
				data.nick = $(this).data('nick');


				if (_this.replyData && _this.replyData.fid == data.fid && _this.replyData.pid == data.pid && $childComment.find('form').length>0) {
					if ($childComment.find('form').hasClass('hide')) {
						$childComment.find('form').removeClass('hide');
					} else {
						$childComment.find('form').addClass('hide');
					}
					return false;
				} else {
					if ($childComment.find('form').length>0) {
						$childComment.find('form').remove();
					}
					$childComment.append(_this.replyTpl(data));
				}

				$childComment.removeClass('hide');

				_this.replyData = data;
			});
		},

		render: function() {
			var _this = this;

			this.$el.find('.btn-primary.login').modal();

			this.send();

			this.pagination();

			this.delComment();

			this.reply();
		},

	};

	Comment.render();

})