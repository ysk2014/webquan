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
	public function index($id=0)
	{
		return view('home.app');
	}


    /**
     * 处理专题
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function dealCloumn(CloumnProcess $manager,$id=0)
	{
		$method = Request::method();
		$param = new \App\Services\Home\Cloumn\CloumnSave();

		if($method=='POST') {

			$data = (array) Request::input('data');
			$data['addtime'] = time();

			$param->setAttributes($data);
			$result = $manager->addCloumn($param);

		} else if($method=='PUT') {

			$data = (array) Request::input('data');
			$data['update_time'] = time();

			$param->setAttributes($data);
			$result = $manager->editCloumn($param);

		} else if($method=='DELETE') {
			$ids = [$id];
			$result = $manager->delCloumn($ids);
		} else {
			$result = array('error'=>true,'msg'=>'路由匹配失败');
		}
		
		return response()->json($result);
		
	}

    /**
     * 根据专题id获取专题信息
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function getCloumnById(CloumnProcess $manager,$id=0)
	{
		$uid = Request::input('uid');
		$result = $manager->getCloumnById($id,$uid);

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
		$data = Request::input('data');
		
		$result = $manager->getCloumns($data);

		return response()->json($result);
		
	}

    /**
     * 根据用户id获取专题信息
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function getCloumnsByUid(CloumnProcess $manager,$uid=0)
	{
		$data = Request::input('data');
		
		$result = $manager->getCloumnsByUid($data);

		return response()->json($result);
		
	}


    /**
     * 获取用户关注的专题信息
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function getCareCloumnsByUid(CloumnProcess $manager,$uid=0)
	{
		$data = Request::input('data');
		
		$result = $manager->getCareCloumnsByUid($data);

		return response()->json($result);
		
	}

    /**
     * 更新头像
     */
    public function updateLogo(CloumnProcess $manager)
    {
		$file = Request::file('cloumn-image');
		$id = Request::input('id');
		$logoDir = Request::input('logo');

		$result = $manager->uploadLogo($file,$id,$logoDir);
		
		return response()->json($result);
    }

    /**
     * 处理关注
     */
    public function dealCare(CloumnProcess $manager)
    {
    	$method = Request::method();

    	$data = Request::input('data');

    	if($method=="POST") {
    		$data['addtime'] = time();
    		$result = $manager->dealCare($data,$method);
    	} else if($method=="DELETE") {
    		$result = $manager->dealCare($data,$method);
    	} else {
    		$result = array('error'=>true,'msg'=>'路由匹配失败');
    	}
		
		return response()->json($result);
    }

}
