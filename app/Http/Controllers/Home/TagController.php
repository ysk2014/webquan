<?php namespace App\Http\Controllers\Home;
use  App\Services\Home\Tag\Process as TagProcess;
use App\Widget\Home\Common as WidgetCommon;
use Request;

class TagController extends Controller {

	protected $widget;

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
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */
	public function index(TagProcess $manager,$name)
	{
		//缓存
		$cacheSecond = config('home.cache_control');
        $time = date('D, d M Y H:i:s', time() + $cacheSecond) . ' GMT';

        $taginfo = $manager->getTagByName($name);

        $articles = $this->widget->articlesByTag($name);

        if ($taginfo['rc']==0) {
        	$tag = $taginfo['data'];
        	return response()->view('home/tag/index', compact('tag','articles'))->header('Cache-Control', 'max-age='.$cacheSecond)->header('Expires', $time);
        } else {
        	abort(404);
        }
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
     * 根据标签name获取所有相关数据
     *
     * @param App\Services\Tag\Process $process 标签处理
     * @access public
     */
	public function getTagByName(TagProcess $manager)
	{
		$name = Request::input('name');
		
		$result = $manager->getTagByName($name);

		return response()->json($result);
		
	}

    /**
     * 根据标签name进行模糊查询所有相关标签信息
     *
     * @param App\Services\Tag\Process $process 标签处理
     * @access public
     */
	public function getTagsLikeName(TagProcess $manager)
	{
		$name = Request::input('name');
		
		$result = $manager->getTagsLikeName($name);

		return response()->json($result);
		
	}

}
