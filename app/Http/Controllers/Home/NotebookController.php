<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Notebook\Process as NotebookProcess;
use Cache;

class NotebookController extends Controller {

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{

	}

	/**
	 * notebook
	 *
	 */
	public function index()
	{
		return view('home.app');
	}


	/**
	 * 获取笔记本列表
	 *
	 * @return Response
	 */
	public function getNotebooksByUid(NotebookProcess $notebookProcess)
	{
		$uid = Request::input('uid');
		$result = $notebookProcess->getNotebooksByUid($uid);
		return response()->json($result);
	}


	/**
	 * 添加笔记本
	 *
	 * @return Response
	 */
	public function addNotebook(NotebookProcess $notebookProcess)
	{
		$data = Request::input('data');
		$data['addtime'] = time();
		$param = new \App\Services\Home\Notebook\NotebookSave();
		$param->setAttributes($data);

		$result = $notebookProcess->addNotebook($param);
		
		return response()->json($result);
	}

	/**
	 * 编辑笔记本
	 *
	 * @return Response
	 */
	public function editNotebook(NotebookProcess $notebookProcess)
	{
		$data = Request::input('data');
		$param = new \App\Services\Home\Notebook\NotebookSave();
		$param->setAttributes($data);

		$result = $notebookProcess->editNotebook($param);
		
		return response()->json($result);
	}

	/**
	 * 删除笔记本
	 *
	 * @return Response
	 */
	public function delNotebook(NotebookProcess $notebookProcess)
	{
		$id = Request::input('id');
		$ids = [$id];
		$result = $notebookProcess->delNotebook($ids);
		
		return response()->json($result);
	}

}
