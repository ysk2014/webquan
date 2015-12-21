
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
	                callback(result);
	            },
	            error: function(jqXHR, textStatus, errorThrown) {
	                try {
	                    callback(JSON.parse(jqXHR.responseText), jqXHR);
	                } catch (e) {
	                    console.log(e);
	                }
	            }
	        });
	    },
        

        get: function(url, data, callback) {
            this.ajax(url, 'GET', data, callback);
        },

        post: function(url, data, callback) {
            this.ajax(url, 'POST', data, callback);
        },

        put: function(url, data, callback) {
            this.ajax(url, 'PUT', data, callback);
        },

        del: function(url, data, callback) {
            this.ajax(url, 'DELETE', data, callback);
        },
    };

	return BaseModel;
});