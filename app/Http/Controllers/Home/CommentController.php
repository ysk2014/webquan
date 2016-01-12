<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Comment\Process as CommentProcess;
use App\Widget\Home\Common as WidgetCommon;
use Request;

class CommentController extends Controller {

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
	 * 根据文章ID取得评论的内容
	 *
	 * @return Response
	 */
	public function getCommentsByAid(CommentProcess $commentProcess,$aid=0)
	{
		$data = Request::input('data');
		$data = $commentProcess->getCommentsByAid($data);
		return response()->json($data);
	}


	/**
	 * 分页
	 *
	 */
	public function pagination($aid,$page) {
		//获取文章列表数据
		return $this->widget->comments($aid,$this->userinfo,$page);
	}

	/**
	 * 评论添加与删除处理
	 *
	 * @return Response
	 */
	public function dealComment(CommentProcess $commentProcess,$aid=0)
	{
		$method = Request::method();

		if($method=="POST") {

			$data = Request::input('data');
			$data['aid'] = $aid;
			$data['uid'] = $this->userinfo['id'];
			$data['addtime'] = time();

			$result = $commentProcess->addComment($data);

			if(!$result['error']) {
				return $this->widget->commentAjax($aid,$result['data']);
			}

		} else if($method=="DELETE") {

			$cid = Request::input('cid');
			$result = $commentProcess->delComment($cid,$aid);

		} else {
			$result = array('error'=>true,'msg'=>'路由匹配失败');
		}
		
		return response()->json($result);
	}


	/**
	 * 根据用户id删除评论
	 *
	 * @return Response
	 */
	public function delCommentByUid(CommentProcess $commentProcess)
	{
		$uid = Request::input('uid');
		$aid = Request::input('aid');
		$result = $commentProcess->delCommentByUid($aid,$uid);
		
		return response()->json($result);
	}

	/**
	 * 删除文章id的所有评论
	 *
	 * @return Response
	 */
	public function delCommentByAid(CommentProcess $commentProcess)
	{
		$aid = Request::input('aid');
		$result = $commentProcess->delCommentsByAid($aid);
		
		return response()->json($result);
	}
}
