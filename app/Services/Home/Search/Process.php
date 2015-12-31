<?php namespace App\Services\Home\Search;

use Lang;
use App\Services\Home\Search\Sphinx;
use App\Services\Home\BaseProcess;
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
    public function getArticles($keyword)
    {
        if (!isset($keyword)) return array('error' => true, 'msg'=>'没有传关键词');
        $this->articleModel->getArticlesByKeyword($keyword);
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