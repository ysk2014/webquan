
var WQ = WQ || {};

// 到页面顶部
WQ.goTop = function(){
    $(document).on('scroll',function() {
        if($(document).scrollTop()>100){
            $('#backtop').show();
        }else{
            $('#backtop').hide();
        }
    });
	
	$('#fixedTools #backtop').on('click',function(){
		$('body,html').animate({scrollTop:0},200);
	});
};

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

// 清除字符串两边的空格
WQ.trim = function(str) {
    return (!String.prototype.trim) ? str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") : str.trim();
};


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
WQ.inArray = function(value,arr) {
    var status = false;

    for(var i=0;i<arr.length;i++) {
        if(arr[i] == WQ.trim(value)) {
            var status = true;
        }
    }
    return status;
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
    expiresMultiplier: 60*60,

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
            path = path ? ';path=' + path : ';path=/';

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
            if(cookies && cookies[keys]) {
                return _this.utils.retrieve(cookies[keys], fallback);
            } else {
                return false;
            }
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
};


//提示框
WQ.tooltipTimer = null;
WQ.tooltip = function(content,cls) {
    var className = cls ? cls : 'danger'
    var tpl = '<div ref="alertBox" class="container"><p class="bg-'+className+'">' + content + '</p></div>';
    if (WQ.tooltipTimer) clearTimeout(WQ.tooltipTimer);
    $('#mask').html(tpl).stop().slideDown();
    
    WQ.tooltipTimer = setTimeout(function() {
        $('#mask').stop().slideUp(function() {
            $('#mask').html('');
            WQ.tooltipTimer = null;
        });
    },1000);
};

//验证
WQ.check = {
    regExps: {
        "require"   : /\S+/,    // 不为空
        "email"     : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,      // 邮箱
        "url"       : /^http(s?):\/\/(?:[A-za-z0-9-]+\.)+[A-za-z]{2,4}(?:[\/\?#][\/=\?%\-&~`@[\]\':+!\.#\w]*)?$/,   // 链接地址
        "currency"  : /^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$/,   // 货币
        "number"    : /^\d+$/,                              // 数字
        "zip"       : /^\d{6}$/,                            // 邮编
        "integer"   : /^(0|-?[1-9][0-9]*)$/,                // 整数
        "pinteger"  : /^(0|[1-9][0-9]*)$/,                  // 正整数
        "double"    : /^-?(0|[1-9][0-9]*)\.[0-9]+$/,        // 浮点数
        "pdouble"   : /^(0|[1-9][0-9]*)\.[0-9]+$/,          // 正浮点数
        "english"   : /^[A-Za-z]+$/,                        // 英文字母
        "chinese"   : /^[\u4e00-\u9fa5]+$/                  // 汉字
    },
    empty: function(str) {
        return !this.regExps['require'].test(str);
    },
    email: function(str) {
        return this.regExps['email'].test(str);
    },
    url: function(url) {
        return this.regExps['url'].test(url);
    },
    currency: function(str) {
        return this.regExps['currency'].test(str);
    },
    number: function(str) {
        return this.regExps['number'].test(str);
    },
    zip: function(str) {
        return this.regExps['zip'].test(str);
    },
    en: function(str) {
        return this.regExps['english'].test(str);
    },
    cn: function(str) {
        return this.regExps['chinese'].test(str);
    }
};

WQ.ajax = function(opt) {

    var errorCallback = function(msg) {
        WQ.tooltip(msg)
    };

    var type = opt.type ? opt.type : 'post',
        async = opt.async ? opt.async : true,
        data = opt.data ? opt.data : {},
        url = opt.url ? opt.url : '',
        dataType = opt.dataType ? opt.dataType : 'json',
        timeout = opt.timeout ? opt.timeout : 3000,
        success = opt.success ? opt.success : function() {},
        error = opt.error ? opt.error : errorCallback;

    $.ajax({
        type: type,
        url: url,
        data: data,
        timeout: timeout,
        async: async,
        dataType: dataType,
        success: function(data) {
            if(data.rc==0) {
                success && success(data);
            } else {
                if (data.rc==1000) {
                    $('#myLogin').modal('show');
                } else {
                    error && error(data.msg);
                }
            }
        },
        error: function() {
            WQ.tooltip('请求错误');
        }
    });
};
WQ.get = function(url,data,callback) {
    WQ.ajax({
        type: 'get',
        url: url,
        data: data,
        success: callback
    });
};
WQ.post = function(url,data,callback) {
    WQ.ajax({
        url: url,
        data: data,
        success: callback
    });
};

$(function() {

    WQ.goTop();

    $('#share-qrcode').on('mouseenter', function() {
        if ($('#qrcode').css('display')=='none') {
            $('#qrcode').html('').qrcode(window.location.href).show(); 
        } else {
            $('#qrcode').hide();
        }
    }).on('mouseleave', function() {
        $('#qrcode').hide();
    });
});

if ( typeof define === "function" && define.amd ) {
    define( "WQ", [], function() {
        return WQ;
    });
}
