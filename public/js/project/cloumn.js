

define('project/cloumn',
	[
		'jquery',
		'backbone',
		'underscore',
		'WQ'
	],
	function($,Backbone,_,WQ){
		var Cloumn = Backbone.View.extend({

			className:'container',

			el: '.container',

			initialize: function(){
				var that = this;
				that.bindEvent();
			},
			bindEvent: function(){
				var that = this;
				// 单选按钮
				$('.radio').on('click',function(){
					if($(this).hasClass('disabled')) return  false;
					var check = $(this).find('input[type="radio"]').attr('checked');
					if(!check){
						$(this).find('input[type="radio"]').attr('checked','checked').siblings('span').addClass('icon-ok-circle').removeClass('icon-circle-blank');
						$(this).siblings('.radio').find('input[type="radio"]').attr('checked',false).siblings('span').removeClass('icon-ok-circle').addClass('icon-circle-blank');
						if($(this).data('sta') == 'no'){
							$('#audit_contribute').addClass('disabled').find('.radio').addClass('disabled');
						}else{
							$('#audit_contribute').removeClass('disabled').find('.radio').removeClass('disabled');
						}
					}
					return false;
				});

				// 提交表单
				that.$el.on('click','form .btn-info',function(){
					var form = $(this).parents('form');
					var title = form.find('input.title').val();
					var description = form.find('input.description').val();
					if(title==''){
						alert('标题不能为空');
						return false;
					};
					if(description==''){
						alert('描述不能为空');
						return false;
					};

					var objdata = form.serialize();
					$.post('/cloumn/create',objdata,function(data){
						if(data.result){
							window.location.href="/cloumn/"+data.data;
						}else{
							alert(data.msg);
						}
					},'json');
				});
			}
		});

		return Cloumn
	}
);