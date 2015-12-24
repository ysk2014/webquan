
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
		},

	    /**
	     * 根据用户id获取草稿列表
	     * 
	     * @param id 用户id
	     */
		getDraftsByUid: function(data, callback) {
			BaseModel.get('/drafts/user/'+data['id'], {'data':data}, callback);
		},

		/**
	     * 草稿转化成文章
	     * 
	     * @param id 用户id
	     */
		draftToArt: function(data, callback) {
			BaseModel.post('/draft/to/article', {'data':data}, callback);
		}

	};
	return DraftModel;
});