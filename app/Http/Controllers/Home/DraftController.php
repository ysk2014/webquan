<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Article\DraftProcess;
use App\Services\Home\Article\Process as ArticleProcess;
use App\Services\Home\Cloumn\Process as CloumnProcess;
use App\Widget\Home\Common as WidgetCommon;
use Request,Cache,Redis;

class DraftController extends Controller {

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
	public function editpage(DraftProcess $draftProcess,$id=0)
	{

		$userinfo = $this->userinfo;

		$cloumns = (new CloumnProcess())->getAllCloumnsByUid($userinfo['id']);

		if ($id!=0) {
			$draftInfo = $DraftProcess->getDraftById(intval($id));
			return response()->view('home.article.edit',compact('userinfo','cloumns','draftInfo','id'));
		} else {
			return response()->view('home.article.edit',compact('userinfo','cloumns'));
		}
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
	public function getDraftsByUid($id=0)
	{
		$data = Request::input('data');
		
		$draftProcess = new DraftProcess();

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


	/**
	 * 草稿变成文章
	 *
	 * @return Response
	 */
	public function draftToArt()
	{
		$data = Request::input('data');

		$draftProcess = new DraftProcess();
		$result = $draftProcess->draftToArt(intval($data));

		return response()->json($result);
	}

}
