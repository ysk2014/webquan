<?php namespace App\Http\Controllers\Home;
use  App\Services\Home\Cloumn\Process as CloumnProcess;
use App\Widget\Home\Common as WidgetCommon;
use Request;

class CloumnController extends Controller {


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
	 * 专栏
	 *
	 * @return Response
	 */
	public function index(CloumnProcess $manager,$id=0)
	{
		$header = $this->widget->header();

		$footer = $this->widget->footer();

		$top = $this->widget->top($this->userinfo);

		$userinfo = $this->userinfo;

		$cloumnInfo = $manager->getCloumnById($id,$userinfo['id']);

		if ($cloumnInfo['rc']==0) {
			$cloumn = $cloumnInfo['data'];
			$articles = $this->widget->articlesByCid($cloumn['id']);
			return response()->view('home.cloumn.index',compact('header','top','footer','userinfo','cloumn','articles'));
		} else {
			abort(404);
		}

	}

	/**
	 * 我的专栏
	 *
	 * @return Response
	 */
	public function myCloumn(CloumnProcess $manager,$uid=0)
	{
		$header = $this->widget->header();

		$footer = $this->widget->footer();

		$top = $this->widget->top($this->userinfo);

		$userinfo = $this->userinfo;

		$cloumnInfo = $manager->getCloumnByUid($uid);

		if ($cloumnInfo['rc']==0) {
			$cloumn = $cloumnInfo['data'];
			$articles = $this->widget->articlesByCid($cloumn['id']);
			return response()->view('home.cloumn.index',compact('header','top','footer','userinfo','cloumn','articles'));
		} else {
			abort(404);
		}

	}

	/**
	 * 添加专题处理
	 *
	 * @return Response
	 */
	public function editPage($id=0)
	{
		$header = $this->widget->header();

		$footer = $this->widget->footer();

		$top = $this->widget->top($this->userinfo);

		$userinfo = $this->userinfo;

		return response()->view('home.cloumn.edit',compact('header','top','footer','userinfo'));
	}

    /**
     * 处理专题
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function delCloumn(CloumnProcess $manager,$id=0)
	{
		$ids = [$id];
		$result = $manager->delCloumn($ids);
	}
    /**
     * 处理专题
     *
     * @param App\Services\Cloumn\Process $process 专题处理
     * @access public
     */
	public function dealCloumn(CloumnProcess $manager,$id=0)
	{
		$param = new \App\Services\Home\Cloumn\CloumnSave();

		if ($id!=0) {
			$data = (array) Request::input('data');
			$data['update_time'] = time();

			$param->setAttributes($data);
			$result = $manager->editCloumn($param);

			if ($result['rc']==0) {
				return redirect('/user/'.$this->userinfo['id'].'/cloumn');
			} else {
				return redirect('/cloumn/'.$id.'/edit');
			}
		} else {
			$data = (array) Request::input('data');
			$data['addtime'] = time();
			$data['update_time'] = time();
			$data['uid'] = $this->userinfo['id'];

			$param->setAttributes($data);
			$result = $manager->addCloumn($param);

			if ($result['rc']==0) {
				return redirect('/user/'.$this->userinfo['id'].'/cloumn');
			} else {
				return redirect('/cloumn/add');
			}
		}
		
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
		$uid = Request::input('uid');
		$logoDir = Request::input('logo');

		$result = $manager->uploadLogo($file,$uid,$logoDir);
		
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
    		$result = array('rc'=>405,'msg'=>'路由匹配失败');
    	}
		
		return response()->json($result);
    }

}
