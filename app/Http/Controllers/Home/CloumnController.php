<?php namespace App\Http\Controllers\Home;
use App\Services\User\Login\Process as LoginProcess;
use  App\Services\Home\Cloumn\Process as CloumnProcess;
use Request;

class CloumnController extends Controller {


	public $returnData;
	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		$isLogin = (new LoginProcess())->getProcess()->hasLogin();
		if($isLogin) $this->returnData = ['userInfo'=>$isLogin];
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

	public function showCloumn($id)
	{
		$manager = new CloumnProcess();
		$data = $manager->getCloumnById($id);
		$returnData = $this->returnData;
		if($data) $returnData['cloumnInfo'] = $data;
		return view('home/cloumn/cloumn',$returnData);
	}

	public function newIndex()
	{
		return view('home/cloumn/new',$this->returnData);
	}

    /**
     * 添加专题
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function addCloumn(CloumnProcess $manager)
	{
		$data = (array) Request::input('cloumn');
		$data['addtime'] = time();
		$param = new \App\Services\Home\Cloumn\CloumnSave();
		$param->setAttributes($data);
		if($msg = $manager->addCloumn($param)){
			 return response()->json(['msg' => '注册成功', 'result' => true, 'data'=>$msg]);
		}else{
			$error = $manager->getErrorMessage();
			return response()->json(['msg' => $error, 'result' => false]);
		}
		
	}
}
