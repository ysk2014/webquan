
var WQ = WQ || {};

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

//时间转化
WQ.timeFormat = function(time) {
    time = time ? parseInt(time)*1000 : false;
    if(!time) return false;

    var nowDate = new Date();
    
    var oldDate = new Date(time);
    var oldYear = oldDate.getFullYear();
    var oldMonth = oldDate.getMonth()+1;
    var oldDay = oldDate.getDate();
    var oldHour = oldDate.getHours();
    var oldMinute = oldDate.getMinutes();

    var data = Math.floor(parseInt(nowDate - oldDate)/1000/60); //获取时间差，以分钟为单位


    if(oldMonth<10) {
        oldMonth = '0' + oldMonth;
    }

    if(oldDay<10) {
        oldDay = '0' + oldDay;
    }

    if(oldHour<10) {
        oldHour = '0' + oldHour;
    }

    if(oldMinute<10) {
        oldMinute = '0' + oldMinute;
    }
    
    if(data==0) {
        return '1 分钟内';
    } else if(data>0 && Math.floor(data/60)==0) {
        return data + ' 分钟前';
    } else if(Math.floor(data/60)>0 && Math.floor(data/60/24)==0) {
        return Math.floor(data/60) + ' 小时前';
    } else {
        return oldYear + '/' + oldMonth + '/' + oldDay + '  ' + oldHour + ':' +oldMinute;
    }
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

// 判断是否为数组
WQ.isArray = Array.isArray || function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
};
// 转化为数组
WQ.toArray = function(value) {
    return Array.prototype.slice.call(value);
};

// 本地存储cookie
WQ.cookie = {
    // 工具
    utils: {
        isPlainObject: function (value) {
            return !!value && Object.prototype.toString.call(value) === '[object Object]';
        },
        getKeys: Object.keys || function (obj) {
            var keys = [],
                key = '';
            for (key in obj) {
                if (obj.hasOwnProperty(key)) keys.push(key);
            }
            return keys;
        },
        escape: function (value) {
            return String(value).replace(/[,;"\\=\s%]/g, function (character) {
                return encodeURIComponent(character);
            });
        },
        retrieve: function (value, fallback) {
            return value == null ? fallback : value;
        }
    },

    defaults: {},
    // 有效期
    expiresMultiplier: 60 * 60 * 24,

    // 添加cookie
    set: function(key, value, options) {
        var _this = this;
        if(_this.utils.isPlainObject(key)) {
            for(k in key) {
                if (key.hasOwnProperty(k)) _this.set(k, key[k], value);
            }
        } else {
            options = _this.utils.isPlainObject(options) ? options : {expires: options};

            var expires = options.expires !== undefined ? options.expires : (_this.defaults.expires || '');
            var expiresType = typeof(expires);

            if(expiresType === 'string' && expires != '') expires = new Date(expires);
            else if(expiresType === 'number') expires = new Date(+new Date + 1000 * _this.expiresMultiplier * expires);

            if (expires !== '' && 'toGMTString' in expires) expires = ';expires=' + expires.toGMTString();

            var path = options.path || this.defaults.path;
            path = path ? ';path=' + path : '';

            var domain = options.domain || this.defaults.domain;
            domain = domain ? ';domain=' + domain : '';

            var secure = options.secure || this.defaults.secure ? ';secure' : '';

            document.cookie = _this.utils.escape(key) + '=' + _this.utils.escape(value) + expires + path + domain + secure;
        }
        return _this;
    },
    get: function(keys, fallback) {
        var _this = this;

        fallback = fallback || undefined;

        var cookies = _this.all();

        if(WQ.isArray(keys)) {
            var result = {};

            for (var i = 0, l = keys.length; i < l; i++) {
                var value = keys[i];
                result[value] = _this.utils.retrieve(cookies[value], fallback);
            }

            return result;
        } else {
            return _this.utils.retrieve(cookies[keys], fallback);
        }

    },
    all: function() {
        if(document.cookie == '') return;

        var cookies = document.cookie.split('; ');
        var result = {};

        for (var i = 0, l = cookies.length; i < l; i++) {
            var item = cookies[i].split('=');
            result[decodeURIComponent(item[0])] = decodeURIComponent(item[1]);
        }

        return result;
    },
    remove: function(keys) {
        keys = WQ.isArray(keys) ? keys : WQ.toArray(keys);

        for (var i = 0, l = keys.length; i < l; i++) {
            this.set(keys[i], '', -1);
        }

        return this;
    },
    empty: function() {
        return this.remove(this.utils.getKeys(this.all()));
    },
    enabled: function() {
        if (navigator.cookieEnabled) return true;

        var ret = this.set('_', '_').get('_') === '_';
        this.remove('_');
        return ret;
    }
}



if ( typeof define === "function" && define.amd ) {
    define( "WQ", [], function() {
        return WQ;
    });
}
