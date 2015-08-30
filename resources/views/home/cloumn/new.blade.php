@extends('home/app')

@section('content')

<div class="container">
	<div class="cloumn-new">
		<form class="new-cloumn">
			<h2>新建专题</h2>
			<div class="set-cloumn">
				<input type="text" class="title" placeholder="专题命名，使用尽量少的字描述" name="cloumn[title]">
				<textarea class="description" cols="30" rows="10" name="cloumn[description]" placeholder="为专题增加适当的描述..."></textarea>				
			</div>
			<!-- <div class="input-prepend cloumn-tag">
				<span class="add-on"><i class="icon-tag"></i>添加标签</span>
			</div>
			<span class="help-block"><i class="icon-info-sign"></i>  每个专题最多添加5个标签</span> -->
			<div class="set-contribute text-left">
				<div class="set-left">
					<span><i class="icon-cloud-upload"></i> 是否允许投稿？</span>
					<label class="radio" data-sta='yes'>
				  		<div class="iradio_minimal" style="position: relative;">
				  			<input type="radio" value="1" checked="checked" name="cloumn[is_contribute]" style="position: absolute; opacity: 0;">
				  			<span class="icon-ok-circle"></span>
				  		</div>允许
					</label>
					<label id='no' class="radio" data-sta='no'>
						<div class="iradio_minimal" style="position: relative;">
							<input type="radio" value="0" name="cloumn[is_contribute]" style="position: absolute; opacity: 0;">
							<span class="icon-circle-blank"></span>
						</div>不允许
					</label>
				</div>
				<div id="audit_contribute" class="audit_contribute">
					<span><i class="icon-cloud-upload"></i> 投稿是否需要审核？</span>
					<a class="radio">
				  		<div class="iradio_minimal checked" style="position: relative;">
				  			<input type="radio" value="1" checked="checked" name="cloumn[is_check]" style="position: absolute; opacity: 0;">
				  			<span class="icon-ok-circle"></span>
				  		</div>需要
					</a>
					<a class="radio" data-toggle="tooltip" data-placement="top" data-title="投稿文章会默认显示在专题最新文章中，编辑可以移除文章">
				  		<div class="iradio_minimal" style="position: relative;">
				  			<input type="radio" value="0" name="cloumn[is_check]" style="position: absolute; opacity: 0;">
				  			<span class="icon-circle-blank"></span>
				  		</div>不需要
					</a>
				</div>
			</div>
			<a class="btn btn-info">创建专题</a>
		</form>
	</div>
</div>

<script>
	requirejs(['project/cloumn'],function(Cloumn){
		var cloumn = new Cloumn();
	});
</script>

@endsection
