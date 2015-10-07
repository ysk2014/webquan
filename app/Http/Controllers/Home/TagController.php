<?php namespace App\Http\Controllers\Home;
use  App\Services\Home\Tag\Process as TagProcess;
use Request;

class TagController extends Controller {


	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// $isLogin = (new LoginProcess())->getProcess()->hasLogin();
		// if($isLogin) $this->returnData = ['userInfo'=>$isLogin];
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index()
	{
		return view('home.app');
	}

    /**
     * 添加标签
     *
     * @param App\Services\Tag\Process $process 标签处理
     * @access public
     */
	public function addTag(TagProcess $manager)
	{
		$data = (array) Request::input('data');
		$data['addtime'] = time();

		$param = new \App\Services\Home\Tag\TagSave();
		$param->setAttributes($data);

		$result = $manager->addTag($param);

		return response()->json($result);
		
	}

    /**
     * 编辑专题
     *
     * @param App\Services\Tag\Process $process 标签处理
     * @access public
     */
	public function editTag(TagProcess $manager)
	{
		$data = (array) Request::input('data');
		
		$param = new \App\Services\Home\Tag\TagSave();
		$param->setAttributes($data);

		$result = $manager->editCloumn($param);

		return response()->json($result);
		
	}

    /**
     * 删除专题
     *
     * @param App\Services\Tag\Process $process 标签处理
     * @access public
     */
	public function delTag(TagProcess $manager)
	{
		$ids = (array) Request::input('id');
		
		$result = $manager->delTag($ids);

		return response()->json($result);
		
	}

    /**
     * 删除专题
     *
     * @param App\Services\Tag\Process $process 标签处理
     * @access public
     */
	public function getTagsByName(TagProcess $manager)
	{
		$name = Request::input('name');
		
		$result = $manager->getTagsByName($name);

		return response()->json($result);
		
	}

}
