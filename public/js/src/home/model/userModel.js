
define(['home/model/base','jquery'],function(BaseModel, $) {
	var UserModel = {
		// 登陆处理
		login: function(data,callback) {
			BaseModel.post('/login', data, callback);
		},
		// 注册处理
		register: function(data,callback) {
			BaseModel.post('/register',data, callback);
		},
	};
	return UserModel;
});