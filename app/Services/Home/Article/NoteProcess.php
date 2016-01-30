<?php
namespace App\Services\Home\Article;

use App\Models\Home\Notes as NoteModel;
use App\Models\Home\Article as ArticleModel;
use App\Services\Home\Article\ArticleValidate;
use App\Models\Home\Cloumn as CloumnModel;
use App\Services\BaseProcess;
use App\Services\SC;
use Lang, Cache, Redis;


/**
* 文集处理
*
* @author ysk
*/
class NoteProcess extends BaseProcess
{
    /**
     * 文集模型
     * 
     * @var object
     */
    private $noteModel;

    /**
     * 文章模型
     * 
     * @var object
     */
    private $articleModel;

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
     * redis缓存链接
     * 
     * @var object
     */
    private $redis;

    /**
     * 初始化
     *
     * @access public
     */
	function __construct()
	{
		if( ! $this->articleModel) $this->articleModel = new ArticleModel();
        if( ! $this->noteModel) $this->noteModel = new NoteModel();
        if( ! $this->articleValidate) $this->articleValidate = new ArticleValidate();
        if( !$this->cloumnModel) $this->cloumnModel = new CloumnModel();
        if( !$this->redis) $this->redis = Redis::connection();
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

		$status = preg_match_all('/src=\"\/upload_path\/.+[png|gif|jpg|jpeg]{1}\"/',$content,$imgArr);

		$cache = 'article_img_uid_'.$data->uid.'_'.date('Y', time()) . date('m', time()) . date('d', time());

		if($status) {
			foreach ($imgArr[0] as $key => $value) {
				$value = str_ireplace('src=\"','',$value);
				$value = str_ireplace('\"','',$value);
				$this->redis->lpush($cache,$value);
			}
		}

		return $data;
	}


	/**
	* 删除上传的没有用到的图片，并把第一张图片作为文章的logo，处理文章简介
	*
	* @param object $data;
	* @access private
	* @return object $data
	*/
	private function dealData(\App\Services\Home\Article\ArticleSave $data)
	{
		// 如果文章简介为，则提取文章内容中的文字
		if (empty($data->description)) {
			$resultDesc = preg_match_all('/<p>(.*?)<\/p>/',$data->content,$descArr);

			if ($resultDesc) {
				foreach ($descArr[1] as $key => $value) {
					if (!strstr($value,'<img')) {
						$data->setDescription($value);
					}
				}
			}
		}

		// 匹配文章内容中所有的图片
		$status = preg_match_all('/src=\"\/upload_path\/.+[png|gif|jpg|jpeg]{1}\"/',$data->content,$imgArr);

		// 把第一张图片设置为文章的logo
		if(!$status) return $data;
		
		if(count($imgArr[0])) {
			$logo_dir = $imgArr[0][0];
			$logo_dir = preg_replace('/src=\"/', '', $logo_dir);
			$logo_dir = preg_replace('/\"/', '', $logo_dir);

			$data->setLogoDir($logo_dir);
		}

		$cache = 'article_img_uid_'.$data->uid.'_'.date('Y', time()) . date('m', time()) . date('d', time());
		

		if($this->redis->exists($cache))
		{
			$uploadImg = $this->redis->lrange($cache,0,-1);
			$savePath = \Config::get('sys.sys_upload_path'). '/' . date('Y', time()) . date('m', time()) . date('d', time());

			foreach ($uploadImg as $key => $value) {
				$value1 = 'src="'.$value.'"';
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
	* 增加文集
	*
	* @param object $data;
	* @access public
	* @return boolean true|false
	*/
	public function addNote(\App\Services\Home\Article\ArticleSave $data,$way)
	{
		$resultArr = [];
		// 进行文章表单验证
		if( !$this->articleValidate->add($data) ) 
			return array('rc'=>2006,'msg'=>$this->articleValidate->getErrorMessage());

		// 对内容进行处理
		$data = $this->dealData($data);

		$data->setUpdateTime(time());

		
		$nid = $this->noteModel->addNote($data->toArray());
		if($nid != false) {
			// 保存文章并发布
			if ($way==1) {
				$data->setNid($nid);

				$aid = $this->articleModel->addArticle($data->toArray());
				if ($aid != false) {
					//更新专题的文章数
					$this->cloumnModel->incrementData('count',$data->cid);
					$resultArr = array('rc'=>0, 'nid'=>$nid, 'aid'=>$aid);
				} else {
					$resultArr = array('rc'=>2007, 'msg'=>'创建失败');
				}
			} else {
				$resultArr = array('rc'=>0, 'nid'=>$nid, 'msg'=>'保存成功');
			}
			
		} else {
			$resultArr = array('rc'=>2007, 'msg'=>'创建失败');
		}
		
		return $resultArr;
	}

	/**
	* 删除文集
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function delNotes(array $id)
	{
		$resultArr = [];
		if( !isset($id) ) return array('rc'=>2006,'msg'=>'没有获取到id');

		if($this->noteModel->delNotes($id) != false) {
			//删除草稿缓存
			foreach ($id as $key => $value) {
				if ($this->redis->hlen('note_'.$value)>0) {
					$this->redis->del('note_'.$value);
				}
			}
			$resultArr = array('rc'=>0, 'msg'=>'删除成功');
		} else {
			$resultArr = array('rc'=>2008, 'msg'=>'删除失败');
		}
		return $resultArr;
	}


	/**
	* 编辑文集
	*
	* @param array $ids;
	* @access public
	* @return boolean true|false
	*/
	public function editNote(\App\Services\Home\Article\ArticleSave $data,$way)
	{	

		$resultArr = [];
		if( !isset($data->id) ) return array('rc'=>2006,'msg'=>'没有获取到id');

		// 进行文章表单验证
		if( !$this->articleValidate->edit($data)) return array('rc'=>2006, 'msg'=>$this->articleValidate->getErrorMessage());

		// 对内容图片进行缓存处理
		$data = $this->imgCache($data);

		// 对内容进行处理
		$data = $this->dealData($data);

		$data->setUpdateTime(time());

		$id = intval($data->id);
		unset($data->id);
		
		if($this->noteModel->editNote($data->toArray(), $id) != false) {
			//删除缓存
			if ($this->redis->hlen('note_'.$id) > 0) {
				$this->redis->del('note_'.$id);
			}
			// 发布
			if ($way==1) {
				$aid = $this->articleModel->getIdByNid($id);

				if ($aid != false) {

					$data->setNid($id);

					if($this->articleModel->editArticle($data->toArray(), $aid) != false) {
						// 删除redis缓存
						if ($this->redis->hlen('article_'.$aid)>0) {
							$this->redis->del('article_'.$aid);
						}

						$resultArr = array('rc'=>0, 'msg'=>'编辑成功', 'aid'=>$aid);
					} else {
						$resultArr = array('rc'=>2009, 'msg'=>'编辑失败');
					}
				} else {
					$data->setNid($id);
					$data->setAddTime($data->update_time);
					$aid = $this->articleModel->addArticle($data->toArray());
					if ($aid != false) {
						//更新专题的文章数
						$this->cloumnModel->incrementData('count',$data->cid);
						$resultArr = array('rc'=>0, 'msg'=>'编辑成功', 'aid'=>$aid);
					} else {
						$resultArr = array('rc'=>2007, 'msg'=>'保存失败');
					}
				}
			} else {
				$resultArr = array('rc'=>0, 'msg'=>'保存成功');
			}
			
		} else {
			$resultArr = array('rc'=>2009, 'msg'=>'编辑失败');
		}

		return $resultArr;
	}


	/**
	* 获取文集信息
	*
	* @param intval $id;
	* @access public
	* @return array
	*/
	public function getNoteById($id)
	{	
		if ( !isset($id) ) return array('error'=>2006,'msg'=>'没有获取到id');

		if ($this->redis->hlen('note_'.$id)>0) {

			$noteInfo = $this->redis->hgetall('note_'.$id);

		} else {
			$noteInfo = $this->noteModel->getNoteById($id);

			if($noteInfo) {
				//进行redis缓存
				$this->redis->hmset('note_'.$id,$noteInfo->toArray());
			} else {
				return array('rc'=>2001,'msg'=>'获取文章失败');
			}
		}
		
		
		$noteInfo['tags'] = explode(',', $noteInfo['tags']);
		
		return array('rc'=>0,'data'=>$noteInfo);
	}

	/**
	 * 根据用户id获取文集列表
	 *
	 * @access public
	 * @return array
	 */
	public function getNotesByUid($data)
	{	
		if( !isset($data['id']) ) return array('rc'=>2006,'msg'=>'没有获取到用户id');

		$page = isset($data['page']) ? $data['page'] : 0;

		$nids = $this->articleModel->getNidsByUid($data['id']);

		$notesInfo = $this->noteModel->getNotesByUid($data['id'],$nids,$page);
		if ($notesInfo) {

			$count = $this->noteModel->getNotesCountByUid($data['id']);
			if( (intval($page)+1)*20 < $count ) {
				$next = true;
			} else {
				$next = false;
			}

			$notesData = array();
			foreach ($notesInfo as $key => $value) {
				unset($value['content']);
				array_push($notesData,$value);
			}

			foreach ($notesData as $key => $value) {
				if (!empty($value['tags'])) {
					$notesData[$key]['tags'] = explode(',', $value['tags']);
				}
			}

			return array('rc'=>0, 'data'=>$notesData, 'next'=>$next);
		} else {
			return array('rc'=>405,'msg'=>404);
		}
	}

}

?>