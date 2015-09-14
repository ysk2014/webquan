<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Web圈</title>
     
	<link href="{{ asset('js/lib/editor/css/editormd.css') }}" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('js/lib/editor/lib/codemirror/codemirror.min.css') }}" />
	<link href="{{ asset('css/wq.css') }}" rel="stylesheet">
    // <script data-main="{{ asset('js/build/home/article.js') }}" src="{{ asset('js/lib/require.js') }}"></script>
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
               <textarea style="display:none;">
[TOC]

#### Disabled options

- TeX (Based on KaTeX);
- Emoji;
- Task lists;
- HTML tags decode;
- Flowchart and Sequence Diagram;

#### Editor.md directory

    editor.md/
            lib/
            css/
            scss/
            tests/
            fonts/
            images/
            plugins/
            examples/
            languages/     
            editormd.js
            ...

```html
<!-- English -->
<script src="../dist/js/languages/en.js"></script>

<!-- 繁體中文 -->
<script src="../dist/js/languages/zh-tw.js"></script>
```

               </textarea>
            </div>

            <div class="input-prepend"><a class="submit-button" href="">发布文章</a></div>
        </div>

</body>
</html>
