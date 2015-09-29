<?php namespace App\Services\Home\Upload;

use App\Services\BaseProcess;

/**
 * 上传处理
 *
 * @author ysk
 */
class Process extends BaseProcess
{
    /**
     * 用于上传的加密密钥
     * 
     * @var string
     */
    private $uploadToken = 'ysk';

    /**
     * 文件上传表单的名字
     * 
     * @var string
     */
    private $fileFormName = 'file';

    /**
     * 上传的文件对象
     * 
     * @var object
     */
    private $file;

    /**
     * 上传需要的参数
     * 
     * @var array
     */
    private $params;

    /**
     * 所要保存的文件名
     * 
     * @var string
     */
    private $saveFileName;

    /**
     * 配置文件中所定的文件保存的路径
     * 
     * @var string
     */
    private $configSavePath;

    /**
     * 允许上传的文件格式
     * 
     * @var array
     */
    private $formats = array(                
        'gif', 'jpg', 'jpeg', 'png'
    );

    /**
     *  错误信息
     * 
     * @var array
     */
    private $errors = array(                
        'empty'      => '上传文件不能为空',
        'format'     =>'上传的文件格式不符合规定',
        'maxsize'    => '上传的文件太大',
        'not_exist'  => '保存文件不存在',
        'same_file'  => '已经有相同的文件存在',
        'must_image'  => '上传文件必须为图片',
        'failed'  => '上传失败'
    );

    /**
     * 设置上传需要的参数
     */
    public function setParam($params)
    {
        $this->params = $params;
        
        if(isset($this->params['fileName'])) {
            $this->fileName = $this->params['fileName'];
        }
        return $this;
    }

    /**
     * 文件上传的对象
     */
    public function setFile($file)
    {
        $this->file = $file;
        return $this;
    }

    /**
     * 设置上传需要的文件格式
     */
    public function setFormats()
    {
        if($this->params['formats']) {
            $this->formats = $this->params['formats'];
        }
        return $this->formats;
    }


    /**
     * 设置保存的路径
     *
     * @access private
     */
    private function setSavePath()
    {
        if(isset($this->params['path'])) {
            $savePath = \Config::get('sys.sys_upload_path'). '/' . $this->params['path'];
        } else {
            $savePath = \Config::get('sys.sys_upload_path'). '/' . date('Y', time()) . date('m', time()) . date('d', time());
        }
        
        if( ! is_dir($savePath))
        {
            //如果保存路径不存在，那么建立它
            dir_create($savePath);
        }
        return $savePath;
    }

    /**
     * 所要保存的文件名
     * 
     * @return string
     */
    private function getSaveFileName()
    {
        if( ! $this->saveFileName) $this->saveFileName = md5(uniqid('pre', TRUE).mt_rand(1000000,9999999));
        return $this->saveFileName;
    }

    /**
     * 配置文件中的图片所保存的路径
     * 
     * @return string
     */
    private function getConfigSavePath()
    {
        if( ! $this->configSavePath) $this->configSavePath = \Config::get('sys.sys_upload_path'). '/' ;
        return $this->configSavePath;
    }


    /**
     * 错误提示函数
     *
     * @access  public
     * @return  void
     */

    private function message($message, $success = 0)
    {
        $array = array(
            'success' => $success
        );

        if ($success == 1)
        {
            $array['url']    = $message;
        }
        else
        {
            $array['msg'] = $message; 
        }
        
        return $array;
    }


    /**
     * 开始处理裁剪
     *
     * @param  string $realFile 所要处理的图片的位置
     * @param  string $savePath 所要保存的位置
     * @return string           处理后的图片
     */
    private function cutImage($realFile, $savePath)
    {
        if( ! isImage($this->file->getClientOriginalExtension())) 
        {
            $msg = $this->message($this->errors['must_image']);
            return $msg;
        }
        $imagine = new \Imagine\Gd\Imagine();
        $mode = \Imagine\Image\ImageInterface::THUMBNAIL_INSET;
        $result = [];
        foreach($this->params['thumbSetting'] as $key => $value)
        {
            if(isset($value['width'], $value['height']) and is_numeric($value['width']) and is_numeric($value['height']))
            {
                $size = new \Imagine\Image\Box($value['width'], $value['height']);
                $saveName = $savePath.$this->getSaveFileName().'_'.$value['width'].'_'.$value['height'].'_thumb.'.$this->file->getClientOriginalExtension();
                $imagine->open($realFile)->thumbnail($size, $mode)->save($saveName);
                $result[] = str_replace('/', '', str_replace($this->getConfigSavePath(), '', $saveName));
            }
        }
        return $result;
    }

    /**
     * 开始处理上传
     *
     * @return false|string
     */
    public function upload()
    {
        //是否上传出错
        if ( ! $this->file->isValid() or $this->file->getError() != UPLOAD_ERR_OK) 
        {
            $msg = $this->message($this->errors['failed']);
            return $msg;
        }
        //保存的路径
        $savePath = $this->setSavePath();
        //保存的文件名
        $saveFileName = $this->getSaveFileName().'.'.$this->file->getClientOriginalExtension();
        //保存
        $this->file->move($savePath, $saveFileName);
        //文件是否存在
        $realFile = $savePath.'/'.$saveFileName;

        if( ! file_exists($realFile)) 
        {
            $msg = $this->message($this->errors['not_exist']);
            return $msg;
        }


        //返回文件
        $realFileUrl[] = str_replace(dirname($this->getConfigSavePath()), '', $realFile);
        $thumbRealFileUrl = [];

        //是否要裁剪
        if(isset($this->params['thumbSetting']) and ! empty($this->params['thumbSetting']))
        {
            $thumbRealFileUrl = $this->cutImage($realFile, $savePath);
        }

        $returnFileUrl = implode('|', array_merge($realFileUrl, $thumbRealFileUrl));


        return $this->message($returnFileUrl,1);
    }


    /**
     * 图片下载
     *
     * @param  string $url 远程文件地址
     * @param  string $filename 保存后的文件名（为空时则为随机生成的文件名，否则为原文件名）
     * @param  int $type 远程获取文件的方式
     * @return json 返回文件的保存路径
     */
    public function downloadImage($url, $fileName='' ,$type=1)
    {
        if ($url == '')
        {
            return $this->message('图片地址不能为空');
        }
     
        // 获取文件原文件名
        $defaultFileName = basename($url);
     
        // 获取文件类型
        $suffix = substr(strrchr($url, '.'), 1);
        $suffix = preg_replace('/!heading/','',$suffix);

        $formats = implode(',', $this->formats);
        if(!in_array($suffix, $this->formats))
        {
            return $this->message('图片上传仅支持'.$formats.'格式');
        } 
     
        // 设置保存后的文件名
        $fileName = $fileName == '' ? time() . rand(0, 9) . '.' . $suffix : $defaultFileName;
     
        // 获取远程文件资源
        if ($type)
        {
            $ch = curl_init();
            $timeout = 30;
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
            $file = curl_exec($ch);
            curl_close($ch);
        }
        else
        {
            ob_start();
            readfile($url);
            $file = ob_get_contents();
            ob_end_clean();
        }
     
        // 设置文件保存路径
        $savePath = $this->setSavePath();
     
        $fileName = $savePath . '/' . $fileName;
        // 保存文件
        $res = fopen($fileName, 'a');
        fwrite($res, $file);
        fclose($res);

         $realFileUrl = str_replace(dirname($this->getConfigSavePath()), '', $fileName);

        return $this->message($realFileUrl,1);
    }

}