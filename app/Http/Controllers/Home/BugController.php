<?php namespace App\Http\Controllers\Home;

use App\Models\Bug as BugModel;
use Request;

class BugController extends Controller 
{

    /**
     * bug模型
     * 
     * @var object
     */
    private $bugModel;

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		if( !$this->bugModel) $this->bugModel = new BugModel();
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
     * 添加bug
     *
     * @param App\Services\User\Process $process 用户核心处理
     * @access public
     */
	public function addBug()
	{
		$data = Request::input('data');
		$data['addtime'] = time();
		$resultData = $this->bugModel->addBug($data);
		if($resultData) {
			$resultArr = array('error'=>false, 'msg'=>'提交成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'提交失败');
		}
		return response()->json($resultArr);
	}

    /**
     * 添加bug
     *
     * @param App\Services\User\Process $process 用户核心处理
     * @access public
     */
	public function getAllBugs()
	{
		$uid = Request::input('uid');

		$resultData = $this->bugModel->getAllBugs();
		if($resultData && $uid==5) {
			$resultArr = array('error'=>false, 'data'=>$resultData);
		} else {
			$resultArr = array('error'=>true, 'msg'=>'没有bug');
		}
		return response()->json($resultArr);
	}

}