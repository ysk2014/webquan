<?php namespace App\Services\Home\Search;

use Lang;
use App\Services\Home\Search\Sphinx;
use App\Services\BaseProcess;
use App\Models\Home\Article as ArticleModel;
use App\Models\Home\Cloumn as CloumnModel;

/**
 * 搜索处理
 *
 * @author ysk
 */
class Process extends BaseProcess
{
    /**
     * 专题数据模型
     *
     * @var object
     */
    private $cloumnModel;

    /**
     * 文章模型
     * 
     * @var object
     */
    private $articleModel;

    /**
     * 初始化
     *
     * @access public
     */
    function __construct()
    {
        if( !$this->articleModel) $this->articleModel = new ArticleModel();
        if( !$this->cloumnModel) $this->cloumnModel = new CloumnModel();
    }

    /**
     * 文章搜索
     * 
     * @param  string $keyword
     * @return array        
     */
    public function getArticles($data)
    {
        if (!isset($data['search'])) return array('rc' => 6001, 'msg'=>'没有传关键词');

        $result = $this->articleModel->getArticlesByKeyword($data);
        if ($result) {

            $count = $this->articleModel->getArtsCountByKeywords($data['search']);
            if( (intval($data['page'])+1)*20 < $count ) {
                $next = true;
            } else {
                $next = false;
            }

            $articleData = array();
            foreach ($result as $key => $value) {
                unset($value['content']);
                array_push($articleData,$value);
            }
            foreach ($articleData as $key => $value) {
                if (!empty($value['tags'])) {
                    $articleData[$key]['tags'] = explode(',', $value['tags']);
                }
            }

            return array('rc'=>0,'data'=>$articleData,'next'=>$next);
        } else {
            return array('rc'=>6002,'msg'=>'数据查询失败');
        }
    }

    /**
     * 专题搜索
     * 
     * @param  string $keyword
     * @return array        
     */
    public function getCloumns($keyword)
    {
        if (!isset($keyword)) return array('error' => true, 'msg'=>'没有传关键词');
        $this->articleModel->getCloumnsByKeyword($keyword);
    }

    /**
     * 作者搜索
     * 
     * @param  string $keyword
     * @return array        
     */
    public function getAuthors($keyword)
    {
        if (!isset($keyword)) return array('error' => true, 'msg'=>'没有传关键词');
        $this->articleModel->getAuthorsByKeyword($keyword);
    }
}