
define(['home/model/base','jquery'],function(BaseModel, $) {
	var CloumnModel = {
	    /**
	     *根据专题id获取专题信息
	     * 
	     * @param id 专题id
	     */
		getCloumnById: function(id, uid, callback) {
			BaseModel.get('/cloumn/'+id+'/info', {uid:uid}, callback);
		},

	    /**
	     *获取所有专题信息
	     * 
	     * @param way 根据way进行排序，默认为addtime添加时间
	     * @param page 分页
	     */
		getAllCloumns: function(data, callback) {
			BaseModel.get('/cloumns/info',{'data':data}, callback);
		},
	    /**
	     *获取所有专题信息
	     * 
	     * @param uid 用户id
	     * @param page 分页
	     */
		getCloumnsByUid: function(data,callback) {
			BaseModel.get('/cloumns/user/'+data.uid, {'data':data}, callback);
		},

	    /**
	     *获取用户关注的所有专题信息
	     * 
	     * @param uid 用户id
	     * @param page 分页
	     */
		getCareCloumnsByUid: function(data,callback) {
			BaseModel.get('/cloumns/care/user/'+data.uid, {'data':data}, callback);
		},

		//添加专题
		addCloumn: function(data, callback) {
			BaseModel.post('/cloumn/add', {'data':data}, callback);
		},
		//编辑专题
		editCloumn: function(data, callback) {
			BaseModel.put('/cloumn/'+data.id, {'data':data}, callback);
		},
	    /**
	     * 删除专题
	     * 
	     * @param id 专题id
	     */
		delCloumn: function(id, callback) {
			BaseModel.del('/cloumn/'+id, {}, callback);
		},
	    /**
	     * 添加关注
	     */
		addCare: function(data, callback) {
			BaseModel.post('/cloumn/'+data.cid+'/care', {'data':data}, callback);
		},
	    /**
	     * 添加关注
	     */
		delCare: function(data, callback) {
			BaseModel.del('/cloumn/'+data.cid+'/care', {'data':data}, callback);
		},
		
	};
	return CloumnModel;
});