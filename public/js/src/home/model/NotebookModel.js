
define(['home/model/base','jquery'],function(BaseModel, $) {
	var NotebookModel = {
	    /**
	     * 根据用户id获取笔记本列表
	     * 
	     * @param uid 用户id
	     */
		getNotebooksByUid: function(data, callback) {
			BaseModel.post('/notebook/list', data, callback);
		},

		//添加笔记本
		addNotebook: function(data, callback) {
			BaseModel.post('/notebook/add', {'data':data}, callback);
		},
		//编辑笔记本
		editNotebook: function(data, callback) {
			BaseModel.post('/notebook/edit', {'data':data}, callback);
		},
	    /**
	     * 删除笔记本
	     * 
	     * @param id 笔记本id
	     */
		delNotebook: function(data, callback) {
			BaseModel.post('/notebook/del', data, callback);
		},
	};
	return UserModel;
});