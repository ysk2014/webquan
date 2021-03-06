<?php namespace App\Services\Home\Cloumn;

use Validator, Lang;
use App\Services\BaseValidate;

/**
 * 专题表单验证
 *
 * @author ysk
 */
class Cloumn extends BaseValidate
{
    /**
     * 增加专题的表单验证
     *
     * @access public
     */
    public function add(\App\Services\Home\Cloumn\CloumnSave $data)
    {
        //创建验证规则
        $rules = array(
            'name'           => 'required',
            'description'    => 'required',
            'uid'            => 'required',
        );
        
        //自定义验证消息
        $messages = array(
            'name.required'          => Lang::get('专题名称不能为空'),
            'description.required'   => Lang::get('专题描述不能为空'),
            'uid.required'           => Lang::get('用户不能为空'),
        );
        
        //开始验证
        $validator = Validator::make($data->toArray(), $rules, $messages);
        if($validator->fails())
        {
            $this->errorMsg = $validator->messages()->first();
            return false;
        }
        return true;
    }
    /**
     * 增加专题的表单验证
     *
     * @access public
     */
    public function edit(\App\Services\Home\Cloumn\CloumnSave $data)
    {
        return $this->add($data);
    }
}
