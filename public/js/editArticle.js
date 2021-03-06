
"use strict"

$(function() {

	var editArticle = {
		el: {
			form: $('#editArt'),
			title: $('#myTitle'),
			description: $('#myDesc'),
			cloumn: $('#myCloumn'),
			tagsinput: $('#editArt').find('.tagsinput-add-container input')
		},
		
		init: function() {
			var toolbar = ['title','bold','italic','underline','strikethrough','fontScale','color','|','ol','ul','blockquote','code','table','|','link','image','hr','|','indent','outdent','alignment','fullscreen','preview'];
			this.editor = new Simditor({
			  	textarea: $('#editor'),
			  	toolbar: toolbar,
			    upload: {
			      	url: '/upload',
			      	fileKey: 'editor-image-file',
			      	leaveConfirm: '正在上传文件，如果离开上传会自动取消'
			    },
			    pasteImage: true
			});
			$('#editor').show();
			
			this.bindEvent();
		},
		bindEvent: function() {
			var _this = this;

			//远程图片下载
			_this.editor.on('pasting',function(e,$pasteContent) {
				if (($pasteContent instanceof jQuery && $pasteContent.find('img').length>0) ) {
					$pasteContent.find('img').each(function() {
						var $img = $(this),old_src  = $img.attr('src');
						$img.attr('src','/image/loading.gif');

						WQ.ajax({
							url: '/download_image',
		                    data: {url: old_src},
		                    success: function(data){
		                		$img.attr('src',data.file_path);
		                    },
		                    error: function(msg) {
		                    	$img.attr('src',old_src);
		                    }
						})
					});
				};
			});

			_this.el.form.find('.tagsinput').tagsInput({
				search: true,
				url: '/tags/like',
				dialog: $('#createTag'),
				createURL: '/tags/add'
			});

			// 标题验证
			_this.el.title.on('blur',function() {
				if ($(this).parent().hasClass('has-error') && WQ.trim($(this).val())!='') {
					$(this).parent().removeClass('has-error');
				}
			});

			var checkForm = function() {
				if (WQ.trim(_this.el.title.val())=='') {
					_this.el.title.parent().addClass('has-error');
					WQ.tooltip('标题不能为空','danger');
					_this.el.title.focus();
					return false;
				}

				if (WQ.trim(_this.editor.getValue())=='') {
					WQ.tooltip('内容不能为空','danger');
					return false;
				}
				return true;
			}
			// 提交表单
			_this.el.form.submit(function() {
				return checkForm();
			});

			_this.el.form.find('.btn-primary').on('click',function() {
				_this.el.form.find('input[name="data[way]"]').val(1);
			});

			//保存草稿
			_this.el.form.find('.save-draft').on('click',function() {
				var $this = $(this);
				
				// 表单验证
				if (!checkForm()) return false;

				_this.el.form.find('input[name="data[way]"]').val(0);

				var action = $this.data('action');
				var params = _this.el.form.serialize();

				WQ.ajax({
                    url: action,
                    data: params,
                    success: function(data){
                		_this.el.form.find('input[name="data[id]"]').val(data.nid);
                		WQ.tooltip(data.msg,'info');
                    }
				});
			});
		}
		
	};

	editArticle.init();
	
});