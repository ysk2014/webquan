
var WQ = WQ || {};

WQ.init = function(){
	var that = this;
	that.bindEvent();
	that.goTop();
}

WQ.bindEvent = function(){
	var that = this;

	//下拉菜单
	$('[data-toggle="dropdown"]').dropdown();
	// 工具提示
	$('[data-toggle="tooltip"]').tooltip();
	// 滚动监听
	$(document).on('scroll',function(){
		that.goTop();
	});
}
// 到页面顶部
WQ.goTop = function(){
	if($(document).scrollTop()>100){
		$('.fixed-btn .go-top').removeClass('hide-go-top');
	}else{
		$('.fixed-btn .go-top').addClass('hide-go-top');
	}
	$('.fixed-btn .go-top').on('click',function(){
		$(document).scrollTop(0);
	});
}


if ( typeof define === "function" && define.amd ) {
    define( "WQ", [], function() {
        return WQ;
    });
}
