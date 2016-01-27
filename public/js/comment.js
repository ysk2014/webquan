
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
					if(data.rc!=0) {
						WQ.tooltip(data.msg);
						return false;
					};

					if ($parent.find('input[name="pid"]').length>0) {
						$parent.before(data);
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
			_this.$el.on('click','.delete',function() {
				var $this = $(this);
				var status = false;

				if ($this.parent().hasClass('comment-footer')) {
					var $parent = $this.parents('.comment-item');
					status = true;
				} else {
					var $parent = $this.parents('.child-comment');
				}

				var confirm = $(this).data('confirm');
				var cid = $(this).data('comment-id');
				var url = $(this).data('url');
				
				if (window.confirm(confirm)) {
					WQ.ajax({
						type: 'delete',
						url: url,
						data: {cid:cid},
						success: function(data) {
							$parent.hide().remove();
							if (status) {
								var count = parseInt(_this.$count.html());
								_this.$count.html(count-1);
							}
						}
					});
				} else {
					return false;
				}
			});
		},
		// 显示回复
		reply: function() {
			var _this = this;
			_this.$el.on('click','.reply',function() {

				if ($(this).parent().hasClass('comment-footer')) {
					var $childList = $(this).parent().siblings(".child-comment-list");
				} else {
					var $childList = $(this).parents(".child-comment-list");
				}
				

				var data = {};
				data.action = $(this).data('action');
				data.fid = $(this).data('fid');
				data.pid = $(this).data('pid');
				data.nick = $(this).data('nick');

				if (_this.replyData && _this.replyData.fid == data.fid && _this.replyData.pid == data.pid && $childList.find('form').length>0) {
					if ($childList.find('form').hasClass('hide')) {
						$childList.find('form').removeClass('hide');
					} else {
						$childList.find('form').addClass('hide');
					}
					return false;
				} else {
					$childList.find('form').remove();
					$childList.append(_this.replyTpl(data));
				}

				$childList.removeClass('hide');

				_this.replyData = data;
			});
		},

		render: function() {
			var _this = this;

			this.send();

			this.pagination();

			this.delComment();

			this.reply();
		},

	};

	Comment.render();

})