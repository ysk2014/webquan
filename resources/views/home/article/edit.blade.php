
@extends('home.app')

@section('title', $title)


@section('content')
	<link rel="stylesheet" type="text/css" href="{{ asset('css/simditor.css') }}" />
	<h4>写文章</h4>
	<form id="editArt" method="post" role="form">
		<div class="form-group">
			<label for="myTitle" class="sr-only">文章标题</label>
    		<input type="text" class="form-control input-lg" id="myTitle" placeholder="文章标题">
		</div>
		<div class="form-group">
			<label for="myDesc" class="sr-only">文章简介</label>
    		<textarea class="form-control" id="myDesc" placeholder="文章简介,最多140个字" maxLength="140"></textarea>
		</div>
		<div class="form-group">
			<span class="select-box">
				<select class="form-control" id="myCloumn">
					<option value="1" style="background: #000">webquan</option>
				</select>
			</span>
		</div>
		<div class="form-group editor">
			<label for="editor" class="sr-only">文章内容</label>
    		<textarea class="form-control" id="editor" placeholder="" autofocus style="display: none;"></textarea>
		</div>
		<div class="form-group clear-fix">
		    <div class="pull-right">
		    	<a class="btn btn-default" href="">保存草稿</a>
		      	<button class="btn btn-primary">发布文章</button>
		    </div>
		</div>
	</form>

	<script type="text/javascript" src="{{ asset('js/lib/module.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/lib/hotkeys.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/lib/uploader.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/lib/simditor.min.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/lib/simditor-extension.js') }}"></script>
	<script type="text/javascript" src="{{ asset('js/edit-article.js') }}"></script>
@endsection