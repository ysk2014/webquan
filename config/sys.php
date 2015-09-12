<?php

return [

    //登录处理用哪个处理器来处理
    'login_process' => 'default',

    //图片的域名，必须以http://开头
    // 'sys_images_domain' => 'http://img.webquan.com',

    //后台访问域名，不用http://开头
    'sys_admin_domain' => 'http://admin.webquan.com:81',

    //博客访问域名
    'sys_domain' => 'http://webquan.com:81',

    //上传的路径，包括ueditor的上传路径也在这里定义了，因为修改了ueditor，重新加载了这个文件。
    'sys_upload_path' => __DIR__ . '/../../upload_path',

];