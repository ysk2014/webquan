
define(['jquery'],function($) {

	var BaseModel = {

		ajax : function(url, method, data, callback) {
	        var _this = this;

	        if(url.indexOf('?') > -1) {
	            url = url + '&rand=' + Math.random()*1+100000;
	        } else {
	            url = url + '?rand=' + Math.random()*1+100000;
	        }

	        $.ajax(url, {
	            headers: {
	                Accept : "application/json; charset=utf-8"
	            },
	            method: method,
	            data: data,
	            success: function(result) {
	                callback(true, result);
	            },
	            error: function(jqXHR, textStatus, errorThrown) {
	                try {
	                    callback(false, JSON.parse(jqXHR.responseText), jqXHR);
	                } catch (e) {
	                    console.log(e);
	                }
	            }
	        });
	    },
        handleStatus: function(jqXHR) {
            if (jqXHR.status == 401) {
                return true;
            }

            return false;
        },

        callbackWrapper: function(callback) {
            var _this = this;
            return function(success, data, xhr) {
                if (!success) {
                    if (!callback(success, data, xhr)) {
                        _this.handleStatus(xhr);
                    }
                } else {
                    callback(success, data, xhr);
                }
            };
        },

        get: function(url, data, callback) {
            this.ajax(url, 'GET', data, this.callbackWrapper(callback));
        },

        post: function(url, data, callback) {
            this.ajax(url, 'POST', data, this.callbackWrapper(callback));
        },

        put: function(url, data, callback) {
            this.ajax(url, 'PUT', data, this.callbackWrapper(callback));
        },

        del: function(url, data, callback) {
            this.ajax(url, 'DELETE', data, this.callbackWrapper(callback));
        },
    };

	return BaseModel;
});