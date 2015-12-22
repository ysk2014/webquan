
define(['home/model/base','jquery'],function(BaseModel, $) {
	var DraftModel = {
	    /**
	     * 根据草稿id获取草稿详情
	     * 
	     * @param id 草稿id
	     */
		getDraftById: function(id, callback) {
			BaseModel.get('/draft/'+id+'/info', {}, callback);
		},

		//添加草稿
		addDraft: function(data, callback) {
			BaseModel.post('/draft/add', {'data':data}, callback);
		},
		//编辑草稿
		editDraft: function(data, callback) {
			var id = data.id;
			BaseModel.put('/draft/'+id, {'data':data}, callback);
		},
	    /**
	     * 删除草稿
	     * 
	     * @param did 草稿id
	     */
		delDraft: function(did, callback) {
			BaseModel.del('/draft/'+did, {}, callback);
		}

	};
	return DraftModel;
});