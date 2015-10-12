
define(['home/model/base','jquery'],function(BaseModel, $) {
	var ArticleModel = {
	    /**
	     * 获取已公布的文章列表
	     * 
	     * @param way 根据way进行排序
	     */
		getAllArticle: function(data, callback) {
			BaseModel.get('/articles', {'data':data}, callback);
		},
	    /**
	     * 根据专题id获取文章列表
	     * 
	     * @param cid 专题id
	     * @param way 根据way进行排序，可以不传，默认为addtime创建时间排序
	     */
		getAllArticleByCid: function(data, callback) {
			BaseModel.get('/articles/cloumn/'+data.cid,{'data':data}, callback);
		},

	    /**
	     * 根据用户id获取文章列表
	     * 
	     * @param uid 用户id
	     * @param way 根据way进行排序，可以不传，默认为addtime创建时间排序
	     * @param page 分页页数
	     * @param is_publish 是否已经发布，0：为未发布，为草稿箱
	     */
		getAllArticleByUid: function(data, callback) {
			BaseModel.get('/articles/user/'+data.uid,{'data':data}, callback);
		},

	    /**
	     * 获取用户关注专题的文章列表
	     * 
	     * @param uid 用户id
	     * @param page 
	     */
		getAllArtsByUidCare: function(data, callback) {
			BaseModel.get('/articles/care/cloumns',{'data':data}, callback);
		},

	    /**
	     * 根据文章id获取文章详情
	     * 
	     * @param id 文章id
	     */
		getArticleById: function(id, callback) {
			BaseModel.get('/article/'+id+'/info', {}, callback);
		},

		//添加文章
		addArticle: function(data, callback) {
			BaseModel.post('/article/add', {'data':data}, callback);
		},
		//编辑文章
		editArticle: function(data, callback) {
			var id = data.id;
			BaseModel.put('/article/'+id, {'data':data}, callback);
		},
	    /**
	     * 删除文章
	     * 
	     * @param aid 文章id
	     */
		delArticle: function(aid, callback) {
			BaseModel.del('/article/'+aid, {}, callback);
		},




		// 评论相关操作
		//添加评论
		addComment: function(data,callback) {
			BaseModel.post('/article/'+data['aid']+'/comment', {'data':data}, callback);
		},
		// 根据文章ID取得评论的内容
		getContentsByAid: function(data,callback) {
			BaseModel.get('/article/'+data.aid+'/comments', {'data':data}, callback);
		},
		// 删除评论
		delComment: function(data,callback) {
			BaseModel.del('/article/'+data['aid']+'/comment', {'cid':data['cid']}, callback);
		},


		// 标签
		getAllTags: function(name,callback) {
			BaseModel.post('/tags/all', {'name':name}, callback);
		},
		// 添加标签
		addTag: function(data,callback) {
			BaseModel.post('/tags/add', {'data':data}, callback);
		},
		//单个标签信息
		tagInfo: function(name,callback) {
			BaseModel.post('/t/info', {'name':name}, callback);
		},
		// 获取标签下的文章列表
		getArtsLikeTag: function(data,callback) {
			BaseModel.get('/articles/tag/'+data.name, {'data':data}, callback);
		},

		// 添加推荐
		addPraise: function(data,callback) {
			data['type']=0;
			BaseModel.post('/article/'+data.aid+'/praise', {'data':data}, callback);
		},
		// 取消推荐
		delPraise: function(data,callback) {
			data['type']=0;
			BaseModel.del('/article/'+data.aid+'/praise', {'data':data}, callback);
		},

		// 添加收藏
		addStore: function(data,callback) {
			data['type']=1;
			BaseModel.post('/article/'+data.aid+'/store', {'data':data}, callback);
		},
		// 取消收藏
		delStore: function(data,callback) {
			data['type']=1;
			BaseModel.del('/article/'+data.aid+'/store', {'data':data}, callback);
		},
		

	};
	return ArticleModel;
});