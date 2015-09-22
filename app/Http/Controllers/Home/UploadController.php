<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Upload\Process as UploadManager;
use Request, Cache;

class UploadController extends Controller {

	public $navStatus;

	/**
	 * Create a new controller instance.
	 *
	 * @return void
	 */
	public function __construct()
	{
		// $this->navStatus = 'home';
	}

	/**
	 * 
	 *
	 * @return Response
	 */
	public function index()
	{	
		return view('home/app');
	}

	/**
	 * 处理上传
	 *
	 * @return Response
	 */
	public function upload()
	{	
		// 配置参数
		$config = array();
        //检测请求是否合法
        $uploadObject = new UploadManager();

        $uploadObject->setParam($config);
        //开始处理上传
        $file = Request::file('editormd-image-file');
        $result = $uploadObject->setFile($file)->upload();

        if(Cache::has('uploadImg')) 
        {
        	$value = Cache::get('uploadImg');
        	$imgArr = array_push($value, $result['url']);
        	Cache::add('uploadImg',$imgArr,60);
        } 
        else 
        {
        	Cache::add('uploadImg',array($result['url']),60);
        }

        return response()->json($result);
	}

	/**
	 * 远程图片下载到服务器
	 *
	 * @return Response
	 */
	public function downloadImage()
	{	
		// 远程图片地址
		$url = Request::input('url');

        $uploadObject = new UploadManager();

		//开始远程图片下载到服务器
        $result = $uploadObject->downloadImage($url);
        
        if(Cache::has('uploadImg')) 
        {
        	$value = Cache::get('uploadImg');
        	$imgArr = array_push($value, $result['url']);
        	Cache::put('uploadImg',$imgArr,60);
        } 
        else 
        {
        	Cache::add('uploadImg',array($result['url']),60);
        }

        return response()->json($result);
	}
}
