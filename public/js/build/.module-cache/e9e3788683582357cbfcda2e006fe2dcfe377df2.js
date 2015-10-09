
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
	     * @param page 分页
	     */
		getAllCloumns: function(data, callback) {
			BaseModel.post('/cloumn/list',{'data':data}, callback);
		},
	    /**
	     *获取所有专题信息
	     * 
	     * @param uid 用户id
	     * @param page 分页
	     */
		getCloumnsByUid: function(data,callback) {
			BaseModel.post('/cloumn/myCloumn', {'data':data}, callback);
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
	    /**
	     * 添加关注
	     */
		addCare: function(data, callback) {
			BaseModel.post('/cloumn/addCare', {'data':data}, callback);
		},
	    /**
	     * 添加关注
	     */
		delCare: function(data, callback) {
			BaseModel.post('/cloumn/delCare', {'data':data}, callback);
		},
	};
	return CloumnModel;
});