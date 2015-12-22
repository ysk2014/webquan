<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Article\DraftProcess;
use Request;

class DraftController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{

	}

	/**
	 * draft
	 *
	 */
	public function index($id=0,$did=0)
	{
		return view('home.app');
	}

	/**
	 * draft
	 *
	 */
	public function page($id=0)
	{
		return view('home.app');
	}


	/**
	 * 获取草稿详情
	 *
	 * @return Response
	 */
	public function getDraftById($id)
	{
		$draftProcess = new DraftProcess();

		$data = $draftProcess->getDraftById(intval($id));
		
		return response()->json($data);
	}


	/**
	 * 根据用户id获取草稿列表
	 *
	 * @return Response
	 */
	public function getDraftsByUid(DraftProcess $draftProcess)
	{
		$data = Request::input('data');
		
		$data = $draftProcess->getDraftsByUid($data);
		return response()->json($data);
	}




	/**
	 * 处理草稿, 添加、更新和删除操作
	 *
	 * @return Response
	 */
	public function dealDraft(DraftProcess $draftProcess,$id=0)
	{
		$method = Request::method();
		
		if($method=='PUT') {                      //更新草稿

			$data = Request::input('data');
			$data['update_time'] = time();
			$param = new \App\Services\Home\Article\ArticleSave();
			$param->setAttributes($data); 

			$result = $draftProcess->editDraft($param);

		}else if($method=='POST') {

			$data = Request::input('data');
			$data['addtime'] = time();
			
			$data['update_time'] = time();

			$param = new \App\Services\Home\Article\ArticleSave();
			$param->setAttributes($data); 

			$result = $draftProcess->addDraft($param);

		} else if($method== "DELETE") {            //删除草稿
			$result = $draftProcess->delDrafts($id);
		} else {
			$result = array('error'=>true,'msg'=>'路由匹配失败');
		}
		
		return response()->json($result);
	}


}
