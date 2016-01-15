
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
			// 提交表单
			_this.el.form.submit(function() {
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
			});
		}
		
	};

	editArticle.init();
	
});