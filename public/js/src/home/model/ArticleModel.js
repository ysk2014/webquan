
define(['home/model/base','jquery'],function(BaseModel, $) {
	var ArticleModel = {
	    /**
	     * 获取已公布的文章列表
	     * 
	     * @param way 根据way进行排序
	     */
		getAllArticle: function(data, callback) {
			BaseModel.post('/article/list', data, callback);
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
	};
	return ArticleModel;
});