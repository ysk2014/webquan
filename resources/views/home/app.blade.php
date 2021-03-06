<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta property="qc:admins" content="15413750205567165526367" />
	<meta property="wb:webmaster" content="8cde258978bf6c9f" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="keywords" content="Web圈, 前端, 前端开发, web前端, web前端开发, 前端开发工程师, 前端开发攻城师,设计, 开发, 前端资源, CSS, JavaScript, Ajax, jQuery, html,html5,css3,浏览器兼容, 前端开发工具, jQuery API, CSS整形和优化工具 , JS压缩工具 , JS格式化工具 , nodejs , node , boostrap , sublime">
	<meta name="description" content="Web圈,个人博客平台">
	<title>@yield('title')</title>
	<link href="{{ asset('image/web.ico') }}" rel="shortcut icon">
	<link href="{{ asset('css/font-awesome.min.css') }}" rel="stylesheet">
	<link href="{{ asset('css/web-ui-light.css') }}" rel="stylesheet">
	<link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
	
    <div class="container" id="main">
    	@yield('content')
    </div>
    
</body>
</html>
