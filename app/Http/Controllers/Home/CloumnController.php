<?php namespace App\Http\Controllers\Home;
use App\Services\User\Login\Process as LoginProcess;
use  App\Services\Home\Cloumn\Process as CloumnProcess;
use Request;

class CloumnController extends Controller {


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
	// 专题详情页
	public function cloumnPage($id)
	{
		return view('home.app');
	}
	// 专题列表页
	public function cloumnListPage()
	{
		return view('home.app');
	}

    /**
     * 添加专题
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function addCloumn(CloumnProcess $manager)
	{
		$data = (array) Request::input('data');
		$data['addtime'] = time();

		$param = new \App\Services\Home\Cloumn\CloumnSave();
		$param->setAttributes($data);

		$result = $manager->addCloumn($param);

		return response()->json($result);
		
	}

    /**
     * 编辑专题
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function editCloumn(CloumnProcess $manager)
	{
		$data = (array) Request::input('data');
		
		$param = new \App\Services\Home\Cloumn\CloumnSave();
		$param->setAttributes($data);

		$result = $manager->editCloumn($param);

		return response()->json($result);
		
	}

    /**
     * 删除专题
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function delCloumn(CloumnProcess $manager)
	{
		$ids = (array) Request::input('id');
		
		$result = $manager->delCloumn($ids);

		return response()->json($result);
		
	}

    /**
     * 根据专题id获取专题信息
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function getCloumnById(CloumnProcess $manager)
	{
		$id = Request::input('id');
		
		$result = $manager->getCloumnById($id);

		return response()->json($result);
		
	}

    /**
     * 获取所有专题信息
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function getAllCloumns(CloumnProcess $manager)
	{
		$data = Request::input('way');
		
		$result = $manager->getCloumns($data);

		return response()->json($result);
		
	}

}
