
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
			BaseModel.get('/user/me',{}, callback);
		},
		//根据id获取用户信息
		getUserInfoById: function(id, callback) {
			BaseModel.get('/user/'+id+'/info', {}, callback);
		},
		//更新用户信息
		editUser: function(id,data, callback) {
			BaseModel.put('/user/'+id, {'data':data}, callback);
		},
		//修改密码
		modifyPassword: function(id,data, callback) {
			BaseModel.put('/user/'+id+'/password', {'data':data}, callback);
		},
		//退出
		signOut: function(callback) {
			BaseModel.get('/sign_out',{},callback);
		},

		//发送邮件
		sendEmail: function(email,callback) {
			BaseModel.get('/email',{email:email},callback);
		},

		//消息
		getNews: function(data,callback) {
			BaseModel.get('/user/news',{'data':data},callback);
		},
		//未读消息数量
		getNewsCount: function(uid,callback) {
			BaseModel.get('/user/news/count',{'uid':uid},callback);
		},

		updateNews: function(data,callback) {
			BaseModel.post('/user/news',{'data':data},callback);
		}
		
	};
	return UserModel;
});