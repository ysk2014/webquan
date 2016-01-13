
<?php echo $header; ?>

<?php echo $top; ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-8">
			<link rel="stylesheet" type="text/css" href="{{ asset('css/simditor.css') }}" />
			<h4>写文章</h4>
			<form id="editArt" method="post" role="form">
				<input type="hidden" name="data[uid]" value="{{ $userinfo['id'] }}">

				<div class="form-group">
					<label for="myTitle" class="sr-only">文章标题</label>
		    		<input type="text" name="data[title]" class="form-control input-lg" id="myTitle" placeholder="文章标题" @if (isset($id) && !$articleInfo['error']) value="{{ $articleInfo['data']['title'] }}" @endif>
				</div>
				<div class="form-group">
					<label for="myDesc" class="sr-only">文章简介</label>
		    		<textarea class="form-control" id="myDesc" placeholder="文章简介,最多140个字" maxLength="140" name="data[description]">@if (isset($id) && !$articleInfo['error']) {{ $articleInfo['data']['description'] }} @endif</textarea>
				</div>
				<div class="form-group tagsinput">
					<label for="myTags" class="sr-only">文章标签</label>
					<input type="hidden" name="data[tags]" id="myTags">
					@if (isset($id) && !$articleInfo['error'])
						@foreach ($articleInfo['data']['tags'] as $tag) 
							@if (!empty($tag))
								<span class="tag"><span>{{ $tags }}</span>&nbsp;&nbsp;<a href="javascript:;" class="tagsinput-remove-link fa fa-close"></a></span>
							@endif
						@endforeach
					@endif
					<div class="tagsinput-add-container">
						<input type="text" name="tag" autocomplete="off" class="" id="myTag" placeholder="文章标签，最多三个">
					</div> 
				</div>
				<div class="form-group">
					<span class="select-box">
						<select class="form-control" id="myCloumn" name="data[cid]">
							@if (!$cloumns['error'])
								@foreach ($cloumns['data'] as $cloumn)
									<option value="{{ $cloumn['id'] }}" style="background: #000" @if (isset($id) && !$articleInfo['error'] && $articleInfo['data']['cid']==$cloumn['id']) selected @endif>{{ $cloumn['name'] }}</option>
								@endforeach
							@endif
						</select>
					</span>
				</div>
				<div class="form-group editor">
					<label for="editor" class="sr-only">文章内容</label>
		    		<textarea class="form-control" id="editor" placeholder="" name="data[content]" autofocus style="display: none;"></textarea>
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
			<script type="text/javascript" src="{{ asset('js/lib/tagsinput.js') }}"></script>
			<script type="text/javascript" src="{{ asset('js/edit-article.js') }}"></script>
			
			@if (isset($id) && !$articleInfo['error'])
				<script type="text/javascript">
				$(function() {
					editArticle.editor.setValue("{{ $articleInfo['data']['content'] }}");
				});
				</script>
			@endif
			
    	</div>
    	<div class="col-md-4 sidebar">
    		<?php echo $aside ?>
    	</div>
    </div>
</div>
	
	
