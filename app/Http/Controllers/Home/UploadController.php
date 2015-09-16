<?php namespace App\Http\Controllers\Home;

use App\Services\Home\Upload\Process as UploadManager;
use Request;

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
        // $parpams = Request::only('authkey', 'args');
        // // var_dump($parpams); exit;
        // $config = @ unserialize(base64url_decode($parpams['args']));
        // echo $config; exit;
        //检测请求是否合法
        $uploadObject = new UploadManager();
        // if( ! $uploadObject->setParam($config)->checkUploadToken($parpams['authkey'])) return abort(500);
        //开始处理上传
        $file = Request::file('editormd-image-file');
        $returnFileUrl = $uploadObject->setFile($file)->upload();
        if( ! $returnFileUrl) return response()->json(['msg'=>'上传失败']);;
        return response()->json(['file'=>$returnFileUrl]);
	}
}
