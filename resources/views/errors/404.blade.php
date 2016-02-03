<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <style type="text/css">
    	body {font-family: "微软雅黑","Open Sans",helvetica,arial,sans-serif;background-color: #1abc9c;}
    	#container {width: 300px; margin: 0 auto; height: 100%;overflow: hidden;}
    	.error-code {
    		margin-top: 100px;
    		font-size: 130px;
    		color:#fff;
			text-shadow: 0 2px 3px #fff, 0px -2px 1px #fff;
			font-weight: bold;
			letter-spacing: -4px;
			text-align: center;
			border-radius: 20px;
			text-align: center;
			vertical-align: middle;
    	}
    	.clear {clear: both; }
    	.error-msg {text-align: center;color: #fff;}
    	.error-msg a{color: #fff;}
    	.error-msg a:hover{color: #fff;}
    </style>
</head>
<body>
	<div id="container">
		<div class="error-code"><?php echo ! empty($errorCode) ? $errorCode : 404; ?></div>
		<div class="clear"></div>
		<div class="error-msg">啊！我们迷路了。快<a href="/">返回首页</a>，快快快！</div>
	</div>
</body>
</html>