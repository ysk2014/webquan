

<?php echo widget('Home.Common')->header(); ?>

<?php echo widget('Home.Common')->top(); ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-12">
			<form id="editCloumn" method="post" role="form">
				<h1>@if (isset($cloumn)) 编辑专栏 @else 创建专栏 @endif</h1>
				<p class="desc">你的文章都会放在你自己的专栏里，希望你能够热心地与大家切磋共享</p>
				@if (isset($cloumn)) <input type="hidden" name="data[id]" value="{{$cloumn['id']}}" /> @endif
				<div class="form-group">
					<label class="sr-only">专栏标题</label>
		    		<input type="text" name="data[name]" class="form-control input-lg" @if (isset($cloumn)) value="{{$cloumn['name']}}" @endif placeholder="专栏标题">
		    		<small class="help-block"></small>
				</div>
				<div class="form-group">
					<label class="sr-only">专栏简介</label>
		    		<textarea class="form-control" placeholder="专栏简介,最多200个字" maxLength="200" name="data[description]">@if (isset($cloumn)) {{$cloumn['description']}} @endif</textarea>
		    		<small class="help-block"></small>
				</div>
				<div class="form-group clear-fix">
				    <div class="pull-right" style="width: 100%;">
				      	<a class="btn btn-primary btn-block btn-lg btn-submit" style="width: 100%;">@if (isset($cloumn)) 编辑 @else 创建 @endif</a>
				    </div>
				</div>
			</form>
    	</div>
    </div>
</div>

<script type="text/javascript" src="{{ asset('js/editCloumn.js') }}"></script>

<?php echo widget('Home.Common')->footer(); ?>