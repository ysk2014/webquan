
define(['home/model/base','jquery'],function(BaseModel, $) {
	var ArticleModel = {
	    /**
	     * 获取已公布的文章列表
	     * 
	     * @param way 根据way进行排序
	     */
		getAllArticle: function(data, callback) {
			BaseModel.post('/article/list', {'data':data}, callback);
		},
	    /**
	     * 根据专题id获取文章列表
	     * 
	     * @param cid 专题id
	     * @param way 根据way进行排序，可以不传，默认为addtime创建时间排序
	     */
		getAllArticleByCid: function(data, callback) {
			BaseModel.post('/cloumn/article/list',{'data':data}, callback);
		},

	    /**
	     * 获取用户关注专题的文章列表
	     * 
	     * @param uid 用户id
	     * @param page 
	     */
		getAllArtsByUidCare: function(data, callback) {
			BaseModel.post('/cloumn/care/article',{'data':data}, callback);
		},

	    /**
	     * 根据文章id获取文章详情
	     * 
	     * @param id 文章id
	     */
		getArticleById: function(id, callback) {
			BaseModel.post('/article/'+id, {}, callback);
		},

		//添加文章
		addArticle: function(data, callback) {
			BaseModel.post('/article/add', {'data':data}, callback);
		},
		//编辑文章
		editArticle: function(data, callback) {
			BaseModel.post('/article/edit', {'data':data}, callback);
		},
	    /**
	     * 删除文章
	     * 
	     * @param id 文章id
	     */
		delArticle: function(data, callback) {
			BaseModel.post('/article/del', data, callback);
		},




		// 评论相关操作
		//添加评论
		addComment: function(data,callback) {
			BaseModel.post('/article/comments/add', {'data':data}, callback);
		},
		// 根据文章ID取得评论的内容
		getContentsByAid: function(data,callback) {
			BaseModel.post('/article/comments', {'data':data}, callback);
		},
		// 删除评论
		delContent: function(cid,callback) {
			BaseModel.del('/article/comments', {'cid':cid}, callback);
		},


		// 标签
		getAllTags: function(name,callback) {
			BaseModel.post('/tags/all', {'name':name}, callback);
		},
		// 添加标签
		addTag: function(data,callback) {
			BaseModel.post('/tags/add', {'data':data}, callback);
		},

		// 添加推荐
		addPraise: function(data,callback) {
			BaseModel.post('/article/addPraise', {'data':data}, callback);
		},
		// 取消推荐
		delPraise: function(data,callback) {
			BaseModel.post('/article/addPraise', {'data':data}, callback);
		},

	};
	return ArticleModel;
});