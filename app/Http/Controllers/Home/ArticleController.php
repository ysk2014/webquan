<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Article\NoteProcess as NoteProcess;
use App\Services\Home\Article\Process as ArticleProcess;
use App\Services\Home\Cloumn\Process as CloumnProcess;
use App\Services\Home\Comment\Process as CommentProcess;
use App\Widget\Home\Common as WidgetCommon;
use Request,Cache,Redis;

class ArticleController extends Controller {

	protected $widget;

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		parent::__construct();
		$this->widget = new WidgetCommon();
	}

	/**
	 * article
	 *
	 */
	public function index(ArticleProcess $articleProcess)
	{	
		return response()->view('home/article/index');
	}


	/**
	 * 分页
	 *
	 */
	public function pagination($page) {
		//获取文章列表数据
		return $this->widget->articles($page);
	}



	/**
	 * edit article
	 *
	 */
	public function editPage(NoteProcess $noteProcess,$id=0)
	{
		$userinfo = $this->userinfo;

		$cloumns = (new CloumnProcess())->getAllCloumnsByUid($userinfo['id']);

		if($cloumns['rc']!=0) {
			return redirect('/cloumn/add');
		} else {
			if ($id!=0) {
				$noteInfo = $noteProcess->getNoteById(intval($id));
				return response()->view('home.article.edit',compact('userinfo','cloumns','noteInfo','id'));
			} else {
				return response()->view('home.article.edit',compact('userinfo','cloumns'));
			}
		}
	}


	/**
	 * 获取文章详情
	 *
	 * @return Response
	 */
	public function info(ArticleProcess $articleProcess,$id)
	{
		$articleInfo = $articleProcess->getArticleById(intval($id));

		if ($articleInfo['rc']==0) {

			$comments = (new CommentProcess())->getCommentsByAid($id,0);

			$author = ['uid'=>$articleInfo['data']['uid'],'nick'=>$articleInfo['data']['username'],'avatar'=>$articleInfo['data']['userUrl'],'description'=>$articleInfo['data']['uDescription']];
			$cloumn = ['cid'=>$articleInfo['data']['cid'],'name'=>$articleInfo['data']['cloumnName'],'description'=>$articleInfo['data']['cDescription']];
			
			$userinfo = $this->userinfo;

			return response()->view('home.article.article',compact('userinfo','author','cloumn','articleInfo','comments'));
		} else {
			abort(404);
		}
	}


	/**
	 * 根据专题id获取文章列表
	 *
	 * @return Response
	 */
	public function getArtsByCid(ArticleProcess $articleProcess,$cid)
	{
		$data = Request::input('data');
		$page = isset($data['page']) ? $data['page'] : 0;
		$way = isset($data['way']) ? $data['way'] : 'addtime';
		//文章数据列表
        $articles = $articleProcess->getArtsByCid(array('way'=>$way,'page'=>$page,'cid'=>$data['cid']));

        $result = view('home.widget.articles', compact('articles','page'));

		return response()->json($result);
	}

	/**
	 * 根据用户id获取已经发布文章列表
	 *
	 * @return Response
	 */
	public function getPubArtsByUid()
	{
		$page = Request::input('page');

		if (Request::input('uid')) {
			$uid = Request::input('uid');
		} else {
			$uid = $this->userinfo['id'];
		}

		$way = 'addtime';

		//文章数据列表
        $articles = (new ArticleProcess())->getArtsByUid(array('way'=>$way,'page'=>$page,'uid'=>$uid));

        return view('home.widget.articles', compact('articles','page'));
	}

	/**
	 * 根据用户id获取草稿的文章列表
	 *
	 * @return Response
	 */
	public function getDraftsByUid(NoteProcess $noteProcess)
	{
		$page = Request::input('page');
		$articles = $noteProcess->getNotesByUid(array('id'=>$this->userinfo['id'],'page'=>$page));
		return view('home.widget.articles',compact('articles','page'));
	}

	/**
	 * 模糊查询标签名称的文章列表
	 *
	 * @return Response
	 */
	public function getArtsLikeTagName(ArticleProcess $articleProcess,$name)
	{
		$data = Request::input('data');
		$data = $articleProcess->getArtsLikeTagName($data);
		return response()->json($data);
	}

	/**
	 * 获取用户关注专题的文章列表
	 *
	 * @return Response
	 */
	public function getArtsByCare(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		$data = $articleProcess->getArtOfCareByUid($data);
		return response()->json($data);
	}

	/**
	 * 获取用户收藏或者推荐的文章列表
	 *
	 * @return Response
	 */
	public function getArtsByPraiseOrStore(ArticleProcess $articleProcess)
	{
		$data = Request::input('data');
		$data = $articleProcess->getArtsByPraiseOrStore($data);
		return response()->json($data);
	}

	/**
	 * 删除文章
	 *
	 * @return Response
	 */

	public function delArticle(ArticleProcess $articleProcess,$id=0)
	{
		$data = Request::input('data');
		$nid = $data['nid'];
		$result = $articleProcess->delArticle($id,$nid);
		return response()->json($result);
	}

	/**
	 * 删除文集
	 *
	 * @return Response
	 */

	public function delNote(NoteProcess $noteProcess,$id=0)
	{
		$result = $noteProcess->delNotes($id);
		return response()->json($result);
	}

	/**
	 * 处理文章, 添加、更新和删除操作
	 *
	 * @return Response
	 */
	public function dealArticle(NoteProcess $noteProcess,$id=0)
	{
		if($id!=0) {                      //更新文章
			$data = Request::input('data');
			$data['update_time'] = time();
			$data['id'] = $id;

			$param = new \App\Services\Home\Article\ArticleSave();
			$param->setAttributes($data); 

			$result = $noteProcess->editNote($param,$data['way']);

			if ($data['way']==1) {
				if ($result['rc']==0) {
					return redirect('/article/'.$result['aid']);
				} else {
					return redirect('/');
				}
			} else {
				return response()->json($result);
			}
			

		}else {

			$data = Request::input('data');

			$data['addtime'] = time();

			$param = new \App\Services\Home\Article\ArticleSave();
			$param->setAttributes($data); 
			if ($data['id']!=0) {
				$result = $noteProcess->editNote($param,$data['way']);
			} else {
				$result = $noteProcess->addNote($param,$data['way']);
			}
			

			if ($data['way']==1) {
				if ($result['rc']==0) {
					return redirect('/article/'.$result['aid']);
				} else {
					return redirect('/');
				}
			} else {
				return response()->json($result);
			}

		} 
	}


	/**
	 * 根据nid更新文章
	 *
	 * @return Response
	 */
	public function upadteArtByNid(ArticleProcess $articleProcess)
	{

		$data = Request::input('data');
		$result = $articleProcess->upadteArtByNid($data);
		
		return response()->json($result);
	}

	/**
	 * 处理文章推荐和收藏
	 *
	 * @return Response
	 */
	public function addPraiseOrStore(ArticleProcess $articleProcess,$id=0)
	{

		$data = Request::input('data');
		$data['aid'] = $id;
		$data['addtime'] = time();

		$result = $articleProcess->addPraiseOrStore($data);
		
		return response()->json($result);
	}
	/**
	 * 删除文章推荐和收藏
	 *
	 * @return Response
	 */
	public function delPraiseOrStore(ArticleProcess $articleProcess,$id=0)
	{

		$data = Request::input('data');
		$data['id'] = $id;

		$result = $articleProcess->delPraiseOrStore($data);
		
		return response()->json($result);
	}
}
