define(['home/model/base','jquery'],function(BaseModel, $) {
	var BugModel = {
		// 登陆处理
		addBug: function(data, callback) {
			BaseModel.post('/bug', {"data":data}, callback);
		},
		getAll: function(uid, callback) {
			BaseModel.get('/bug/list', {"uid":uid}, callback);
		}
	};
	return BugModel;
});