<?php
namespace App\Services\Home\Article;

use App\Models\Home\Drafts as DraftsModel;
use App\Services\Home\Article\ArticleValidate;
use App\Models\Home\Cloumn as CloumnModel;
use App\Services\BaseProcess;
use App\Services\SC;
use Lang, Cache;


/**
* 文章处理
*
* @author ysk
*/
class Process extends BaseProcess
{
    /**
     * 草稿模型
     * 
     * @var object
     */
    private $draftsModel;

    /**
     * 文章表单验证对象
     * 
     * @var object
     */
    private $articleValidate;

    /**
     * 专题数据模型
     * 
     * @var object
     */
    private $cloumnModel;

    /**
     * 初始化
     *
     * @access public
     */
	function __construct()
	{
        if( ! $this->draftsModel) $this->draftsModel = new DraftsModel();
        if( ! $this->articleValidate) $this->articleValidate = new ArticleValidate();
        if( !$this->cloumnModel) $this->cloumnModel = new CloumnModel();
	}

	/**
	* 判断上传文件的文件夹是否为空
	*
	* @param string 文件夹路径
	* @access private
	* @return boolean true|false
	*/
	private function is_empty_dir($dir)
	{
		$H = @opendir($dir); 
        $i=0;    
        while($_file=readdir($H)){    
            $i++;    
        }    
        closedir($H);
        if($i>2){ 
            return false; 
        }else{ 
            return true;  
        } 
	}


	/**
	* 文章图片缓存
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function imgCache(\App\Services\Home\Article\ArticleSave $data){

		$content = $this->redis->hget('article_'.$data->id,'content');

		$status = preg_match_all('/!\[\]\(\/upload_path\/.+[png|gif|jpg|jpeg]{1}\)/',$content,$imgArr);

		$cache = 'article_img_uid_'.$data->uid.'_'.date('Y', time()) . date('m', time()) . date('d', time());

		if($status) {
			foreach ($imgArr[0] as $key => $value) {
				$value = str_ireplace('![](','',$value);
				$value = str_ireplace(')','',$value);
				$this->redis->lpush($cache,$value);
			}
		}

		return $data;
	}


	/**
	* 删除上传的没有用到的图片，并把第一张图片作为文章的logo
	*
	* @param object $data;
	* @access private
	* @return object $data
	*/
	private function dealData(\App\Services\Home\Article\ArticleSave $data)
	{
		// 匹配文章内容中所有的图片
		$status = preg_match_all('/!\[\]\(\/upload_path\/.+[png|gif|jpg|jpeg]{1}\)/',$data->content,$imgArr);

		// 把第一张图片设置为文章的logo
		if(!$status) return $data;
		
		if(count($imgArr[0])) {
			$logo_dir = $imgArr[0][0];
			$logo_dir = preg_replace('/!\[\]\(/', '', $logo_dir);
			$logo_dir = preg_replace('/\)/', '', $logo_dir);
			$data->setLogoDir($logo_dir);
		}

		$cache = 'article_img_uid_'.$data->uid.'_'.date('Y', time()) . date('m', time()) . date('d', time());
		

		if($this->redis->exists($cache))
		{
			$uploadImg = $this->redis->lrange($cache,0,-1);
			$savePath = \Config::get('sys.sys_upload_path'). '/' . date('Y', time()) . date('m', time()) . date('d', time());

			foreach ($uploadImg as $key => $value) {
				$value1 = '![]('.$value.')';
				if(!in_array($value1, $imgArr[0]))
				{
					@unlink(dirname(dirname($savePath)).$value);

					// 判断文件夹是否为空
					if( $this->is_empty_dir(dirname($savePath)) )
					{
						@unlink(dirname($savePath));
					}
				}
			}
			$this->redis->del($cache);
		}

		return $data;
	}

	/**
	* 增加草稿
	*
	* @param object $data;
	* @access public
	* @return boolean true|false
	*/
	public function addDraft(\App\Services\Home\Article\ArticleSave $data)
	{
		$resultArr = [];
		// 进行文章表单验证
		if( !$this->articleValidate->add($data) ) 
			return array('error'=>true,'msg'=>$this->articleValidate->getErrorMessage());

		// 对内容进行处理
		$data = $this->dealData($data);

		if (isset($data->id)) unset($data->id);

		$sqlData = $this->draftsModel->addDraft($data->toArray());
		if($sqlData != false) {
			$resultArr = array('error'=>false, 'data'=>$sqlData);
		} else {
			$resultArr = array('error'=>true, 'msg'=>'创建失败');
		}
		return $resultArr;
	}

	/**
	* 删除草稿
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function delDrafts($id)
	{
		$resultArr = [];
		if( !isset($id) ) return array('error'=>true,'msg'=>'没有获取到id');

		if($this->draftsModel->delDrafts($id) != false) {
			$resultArr = array('error'=>false, 'msg'=>'删除成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'删除失败');
		}
		return $resultArr;
	}




	/**
	* 编辑草稿
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function editDraft(\App\Services\Home\Article\ArticleSave $data)
	{	

		$resultArr = [];
		if( !isset($data->id) ) return array('error'=>true,'msg'=>'没有获取到id');

		// 进行文章表单验证
		if( !$this->articleValidate->edit($data)) return array('error'=>true, 'msg'=>$this->articleValidate->getErrorMessage());

		// 对内容图片进行缓存处理
		$data = $this->imgCache($data);

		// 对内容进行处理
		$data = $this->dealData($data);

		$id = intval($data->id);
		unset($data->id);

		if($this->draftsModel->editDraft($data->toArray(), $id) != false) {
			$resultArr = array('error'=>false, 'msg'=>'编辑成功');
		} else {
			$resultArr = array('error'=>true, 'msg'=>'编辑失败');
		}
		return $resultArr;
	}


	/**
	* 获取草稿信息
	*
	* @param intval $id;
	* @access public
	* @return array
	*/
	public function getDraftById($id)
	{	
		if( !isset($id) ) return array('error'=>true,'msg'=>'没有获取到id');

		$draftInfo = $this->draftsModel->getDraftById($id);
		if ($draftInfo) {
			return array('error'=>false,'data'=>$draftInfo);
		} else {
			return array('error'=>true,'msg'=>404);
		}
	}

	/**
	 * 根据用户id获取草稿列表
	 *
	 * @access public
	 * @return array
	 */
	public function getDraftsByUid($data)
	{	
		if( !isset($data['id']) ) return array('error'=>true,'msg'=>'没有获取到id');

		$page = isset($data['page']) ? $data['page'] : 0;

		$draftsInfo = $this->draftsModel->getDraftsByUid($data['id'],$page);
		if ($draftsInfo) {

			$count = $this->draftsModel->getDraftsCountByUid($data['id']);
			if( (intval($page)+1)*20 < $count ) {
				$next = true;
			} else {
				$next = false;
			}

			$draftsData = array();
			foreach ($draftsInfo as $key => $value) {
				unset($value['content']);
				array_push($draftsData,$value);
			}

			return array('error'=>false, 'data'=>$draftsData, 'next'=>$next);
		} else {
			return array('error'=>true,'msg'=>404);
		}
	}

}

?>