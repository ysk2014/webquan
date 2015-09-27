<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Comment\Process as CommentProcess;
use Request;

class CommentController extends Controller {


	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{

	}

	/**
	 * article
	 *
	 */
	public function index()
	{
		return view('home.app');
	}


	/**
	 * 根据文章ID取得评论的内容
	 *
	 * @return Response
	 */
	public function getContentByAid(CommentProcess $commentProcess)
	{
		$data = Request::input('data');
		$data = $commentProcess->getContentByAid($data);
		return response()->json($data);
	}


	/**
	 * 添加文章
	 *
	 * @return Response
	 */
	public function addComment(CommentProcess $commentProcess)
	{
		$data = Request::input('data');
		$data['addtime'] = time();

		$result = $commentProcess->addComment($data);
		
		return response()->json($result);
	}


	/**
	 * 删除评论
	 *
	 * @return Response
	 */
	public function delContent(CommentProcess $commentProcess)
	{
		$id = Request::input('cid');
		$result = $commentProcess->delContent($id);
		
		return response()->json($result);
	}


	/**
	 * 根据用户id删除评论
	 *
	 * @return Response
	 */
	public function delContentByUid(CommentProcess $commentProcess)
	{
		$uid = Request::input('uid');
		$aid = Request::input('aid');
		$result = $commentProcess->delContentByUid($aid,$uid);
		
		return response()->json($result);
	}

	/**
	 * 删除文章id的所有评论
	 *
	 * @return Response
	 */
	public function delContentByAid(CommentProcess $commentProcess)
	{
		$aid = Request::input('aid');
		$result = $commentProcess->delContentByAid($aid);
		
		return response()->json($result);
	}
}
