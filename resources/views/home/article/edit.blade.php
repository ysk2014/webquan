
<?php echo $header; ?>

<?php echo $top; ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-12">
			<link rel="stylesheet" type="text/css" href="{{ asset('css/simditor.css') }}" />
			<h4>写文章</h4>
			<form id="editArt" method="post" role="form">

				<input type="hidden" name="data[id]" value="0">
				<input type="hidden" name="data[uid]" value="{{ $userinfo['id'] }}">
				<input type="hidden" name="data[way]" value="1">

				<div class="form-group">
					<label for="myTitle" class="sr-only">文章标题</label>
		    		<input type="text" name="data[title]" class="form-control input-lg" id="myTitle" placeholder="文章标题" @if (isset($id) && !$noteInfo['error']) value="{{ $noteInfo['data']['title'] }}" @endif>
				</div>
				<div class="form-group">
					<label for="myDesc" class="sr-only">文章简介</label>
		    		<textarea class="form-control" id="myDesc" placeholder="文章简介,最多140个字" maxLength="140" name="data[description]">@if (isset($id) && !$noteInfo['error']) {{ $noteInfo['data']['description'] }} @endif</textarea>
				</div>
				<div class="form-group tagsinput" style="position: relative;">
					<label for="myTags" class="sr-only">文章标签</label>
					@if (isset($id) && !$noteInfo['error'])
						<input type="hidden" name="data[tags]" id="myTags" value="{{ implode(',',$noteInfo['data']['tags']) }}">
						@foreach ($noteInfo['data']['tags'] as $tag) 
							@if (!empty($tag))
								<span class="tag"><span>{{ $tag }}</span>&nbsp;&nbsp;<a href="javascript:;" class="tagsinput-remove-link fa fa-close"></a></span>
							@endif
						@endforeach
					@else 
						<input type="hidden" name="data[tags]" id="myTags">
					@endif
					<div class="tagsinput-add-container" >
						<input type="text" name="tag" autocomplete="off" class="" id="myTag" placeholder="文章标签，最多三个">
					</div> 
				</div>
				<div class="form-group">
					<span class="select-box">
						<select class="form-control" id="myCloumn" name="data[cid]">
							@if (!$cloumns['error'])
								@foreach ($cloumns['data'] as $cloumn)
									<option value="{{ $cloumn['id'] }}" style="background: #000" @if (isset($id) && !$noteInfo['error'] && $noteInfo['data']['cid']==$cloumn['id']) selected @endif>{{ $cloumn['name'] }}</option>
								@endforeach
							@endif
						</select>
					</span>
				</div>
				<div class="form-group editor">
					<label for="editor" class="sr-only">文章内容</label>
		    		<textarea class="form-control" id="editor" placeholder="" name="data[content]" autofocus style="display: none;">@if (isset($id) && !$noteInfo['error']) {{ $noteInfo['data']['content'] }} @endif</textarea>
				</div>
				<div class="form-group clear-fix">
				    <div class="pull-right">
				    	<a class="btn btn-default save-draft" href="javascript:void(0);" @if (isset($id) && !$noteInfo['error']) data-action={{ "/note/".$id."/edit" }} @else data-action="/note/add" @endif>保存</a>
				      	<button class="btn btn-primary">@if (isset($id) && !$noteInfo['error']) 更新文章 @else 发布文章 @endif</button>
				    </div>
				</div>
			</form>
			
			<!-- 创建标签模板 -->
			<div class="modal fade" id="createTag" tabindex="-1" role="dialog">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
					  	<div class="modal-header">
					    	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					    	<h4 class="modal-title" id="myModalLabel">创建标签</h4>
					  	</div>
					  	<div class="modal-body">
					    	<div class="form-group">
							    <input type="text" class="form-control" placeholder="标签名">
							</div>
							<div class="form-group">
								<textarea class="form-control" cols="4" placeholder="描述" style="resize: none;"></textarea>
							</div>
					  	</div>
					  	<div class="modal-footer">
						    <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">取消</button>
						    <button type="button" class="btn btn-primary btn-sm">创建</button>
					  	</div>
					</div>
				</div>
			</div>

			<script type="text/javascript" src="{{ asset('js/lib/module.min.js') }}"></script>
			<script type="text/javascript" src="{{ asset('js/lib/hotkeys.min.js') }}"></script>
			<script type="text/javascript" src="{{ asset('js/lib/uploader.min.js') }}"></script>
			<script type="text/javascript" src="{{ asset('js/lib/simditor.min.js') }}"></script>
			<script type="text/javascript" src="{{ asset('js/lib/simditor-extension.js') }}"></script>
			<script type="text/javascript" src="{{ asset('js/lib/tagsinput.js') }}"></script>
			<script type="text/javascript" src="{{ asset('js/editArticle.js') }}"></script>
			
    	</div>

    </div>
</div>
	
<?php echo $footer; ?>
