
define(['home/model/base','jquery'],function(BaseModel, $) {
	var CloumnModel = {
	    /**
	     *根据专题id获取专题信息
	     * 
	     * @param id 专题id
	     */
		getCloumnById: function(data, callback) {
			BaseModel.post('/cloumn/info', {'id':data}, callback);
		},

	    /**
	     *获取所有专题信息
	     * 
	     * @param way 根据way进行排序，默认为addtime添加时间
	     */
		getAllCloumns: function(data, callback) {
			BaseModel.post('/cloumn/list', data, callback);
		},
	    /**
	     *获取所有专题信息
	     * 
	     * @param way 根据way进行排序，默认为addtime添加时间
	     */
		getCloumnsByUid: function(data,callback) {
			BaseModel.post('/cloumn/myCloumn', data, callback);
		},

		//添加专题
		addCloumn: function(data, callback) {
			BaseModel.post('/cloumn/add', {'data':data}, callback);
		},
		//编辑专题
		editCloumn: function(data, callback) {
			BaseModel.post('/cloumn/edit', {'data':data}, callback);
		},
	    /**
	     * 删除专题
	     * 
	     * @param id 专题id
	     */
		delCloumn: function(data, callback) {
			BaseModel.post('/cloumn/del', data, callback);
		},
	};
	return CloumnModel;
});