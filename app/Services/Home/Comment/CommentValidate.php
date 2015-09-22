<?php namespace App\Services\Home\Comment;

use Validator, Lang;
use App\Services\BaseValidate;

/**
 * 功能表单验证
 *
 * @author jiang <mylampblog@163.com>
 */
class Comment extends BaseValidate
{
    /**
     * 增加评论的表单验证
     *
     * @access public
     */
    public function add($data)
    {
        //创建验证规则
        $rules = array(
            'aid'    => 'required',
            'uid'   => 'required',
            'content'     => 'required',
        );
        
        //自定义验证消息
        $messages = array(
            'aid.required'   => Lang::get('文章id不能为空'),
            'uid.required'  => Lang::get('用户id不能为空'),
            'content.required' => Lang::get('评论内容不能为空')
        );
        
        //开始验证
        $validator = Validator::make($data, $rules, $messages);
        if($validator->fails())
        {
            $this->errorMsg = $validator->messages()->first();
            return false;
        }
        return true;
    }
    
}
