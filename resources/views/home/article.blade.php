<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Web圈</title>

	<link href="{{ asset('js/lib/editor/css/editormd.css') }}" rel="stylesheet">
	<link href="{{ asset('css/wq.css') }}" rel="stylesheet">

</head>
<body>
        <div class="edit-article">
        	<h3>发布文章</h3>
            <div class="input-prepend">
            	<input type="text" name="title" placeholder="文章标题" />
            </div>
            <div class="input-prepend">
            	<select name="cid">
            		<option value="1">html</option>
            		<option value="2">css</option>
            		<option value="3">js</option>
            		<option value="4">php</option>
            	</select>
            </div>
            <div class="input-prepend">
            	<textarea name="description" maxLength="200" placeholder="请以200字以内简单描述此内容"></textarea>
            </div>

            <div id="test-editormd">
               <textarea style="display:none;"></textarea>
            </div>

            <div class="input-prepend"><a class="submit-button" href="">发布文章</a></div>
        </div>
        <script src="{{ asset('js/lib/jquery-1.11.3.min.js') }}"></script>
        <!-- // <script src="{{ asset('js/lib/editor/lib/marked.min.js') }}"></script> -->
        <!-- // <script src="{{ asset('js/lib/editor/lib/prettify.min.js') }}"></script> -->
        <script src="{{ asset('js/lib/editor/editormd.min.js') }}"></script>
        <script type="text/javascript">
			var testEditor;

            $(function() {
                testEditor = editormd("test-editormd", {
                    width   : "99.5%",
                    height  : 640,
                    // syncScrolling : "single",
                    toolbarIcons: function() {
                    	return [
                    		"undo", "redo", "clear", "|", 
				            "bold", "italic", "quote", "uppercase", "lowercase", "|", 
				            "h1", "h2", "h3", "h4", "h5", "h6", "|", 
				            "list-ul", "list-ol", "hr", "|",
				            "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "|",
				            "watch", "preview", "fullscreen", "help"
                    	];
                    },
                    imageUpload: 'true',
                    imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    imageUploadURL : "{{ asset('js/lib/editor/php/upload.php') }}",
                    path    : "{{ asset('js/lib/editor/lib') }}/"
                });
                // editormd.markdownToHTML('test-editormd');
            });
        </script>
</body>
</html>
