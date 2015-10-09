define(['jquery'],function($){
	// 下拉菜单插件
	$.fn.dropdown = function(){
		return this.each(function(){
			var menu = $(this);
			var parent = menu.parent();
			menu.on('click',function(e){
				e.stopPropagation();
				if(parent.hasClass('open')){
					parent.removeClass('open');
				}else{
					parent.addClass('open');
				};

				$(document).on('click',function(e){
					parent.removeClass('open');
				});
			});

		});
	};
	//提示框 tooltip
	$.fn.tooltip = function(){
		return this.each(function(){
			var ele = $(this);
			var placement = ele.data('placement');
			var title = ele.data('title');
			var tip = $('<div>').addClass('tooltip').addClass(placement).html(title);
			ele.on('mouseenter',function(e){
				var e = event || window.event;
				var left = ele.offset().left;
				var top = ele.offset().top;
				var tWidth = tip.outerWidth;
				$('body').append(tip);
				tip.addClass('fade');
				switch(placement){
					case 'left':
						var nLeft = left - tip.outerWidth();
						var nTop = top + ele.outerHeight()/2 - tip.outerHeight()/2;
						break;
					case 'right':
						var nLeft = left + ele.outerWidth();
						var nTop = top + ele.outerHeight()/2 - tip.outerHeight()/2;
						break;	
					case 'top':
						var nLeft = left + ele.outerWidth()/2 - tip.outerWidth()/2;
						var nTop = top - tip.outerHeight();
						break;
					case 'bottom':
						var nLeft = left + ele.outerWidth()/2 - tip.outerWidth()/2;
						var nTop = top + ele.outerHeight();
						break;
				}
				tip.css({left:nLeft+'px',top:nTop+'px'});
			}).on('mouseleave',function(){
				tip.remove();
			});
		});
	}
})
// (function( $, undefined ) {


// }(jQuery));
