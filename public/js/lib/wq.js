
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


WQ.isIE    = (navigator.appName == "Microsoft Internet Explorer");
WQ.isIE8   = (WQ.isIE && navigator.appVersion.match(/8./i) == "8.");

/**
 * 动态加载JS文件的方法
 * Load javascript file method
 * 
 * @param {String}   fileName              JS文件名
 * @param {Function} [callback=function()] 加载成功后执行的回调函数
 * @param {String}   [into="head"]         嵌入页面的位置
 */
WQ.loadScript = function(fileName, callback, into) {
    var into       =   into     ?  into : 'head';
    var callback   =   callback ? callback :  function(){};

    var script =   null;
    script     =   document.createElement('script');
    script.type=   'text/javascript';
    script.src =   fileName + '.js'

    if(WQ.isIE8) {
        script.onreadystatechange = function() {
            if(script.readyState) {
                if(script.readyState == 'loaded' || script.readyState == 'complete') {
                    script.onreadystatechange = null;
                    callback();
                }
            }
        }
    } else {
        script.onload = function() {
            callback();
        }
    }

    if(into === 'head') {
        document.getElementsByTagName('head')[0].appendChild(script);
    } else {
        document.body.appendChild(script);
    }
};

if ( typeof define === "function" && define.amd ) {
    define( "WQ", [], function() {
        return WQ;
    });
}
