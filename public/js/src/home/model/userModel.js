
define(['home/model/base','jquery'],function(BaseModel, $) {
	var UserModel = {
		// 登陆处理
		login: function(data,callback) {
			BaseModel.post('/sign_in', data, callback);
		},
		// 注册处理
		register: function(data,callback) {
			BaseModel.post('/sign_up',data, callback);
		},
		//获取用户信息
		getUserInfo: function(callback) {
			BaseModel.post('/getUserInfo',{}, callback);
		}
	};
	return UserModel;
});