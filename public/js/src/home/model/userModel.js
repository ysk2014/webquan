
define(['home/model/base','jquery'],function(BaseModel, $) {
	var UserModel = {
		// 登陆处理
		login: function(data, callback) {
			BaseModel.post('/sign_in', data, callback);
		},
		// 注册处理
		register: function(data, callback) {
			BaseModel.post('/sign_up',{'data':data}, callback);
		},
		//获取登录用户信息
		getUserInfoByLogin: function(callback) {
			BaseModel.post('/user/me',{}, callback);
		},
		//根据id获取用户信息
		getUserInfoById: function(data, callback) {
			BaseModel.post('/user/info', data, callback);
		},
		//更新用户信息
		editUser: function(data, callback) {
			BaseModel.post('/user/edit', data, callback);
		},
		//修改密码
		modifyPassword: function(data, callback) {
			BaseModel.post('/user/modifyPassword', data, callback);
		},
		//修改密码
		checkUserName: function(data, callback) {
			BaseModel.post('/user/checkUserName', data, callback);
		},
	};
	return UserModel;
});