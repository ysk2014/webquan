
<?php echo $header; ?>

<?php echo $top; ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-12">
			<form id="editCloumn" method="post" role="form">
				<h1>创建专栏</h1>
				<p class="desc">你的文章都会放在你自己的专栏里，希望你能够热心地与大家切磋共享</p>
				<div class="form-group">
					<label class="sr-only">专栏标题</label>
		    		<input type="text" name="data[name]" class="form-control input-lg" placeholder="专栏标题">
		    		<small class="help-block"></small>
				</div>
				<div class="form-group">
					<label class="sr-only">专栏简介</label>
		    		<textarea class="form-control" placeholder="专栏简介,最多200个字" maxLength="200" name="data[description]"></textarea>
		    		<small class="help-block"></small>
				</div>
				<div class="form-group clear-fix">
				    <div class="pull-right" style="width: 100%;">
				      	<button class="btn btn-primary btn-block btn-lg" style="width: 100%;">创建</button>
				    </div>
				</div>
			</form>
    	</div>
    </div>
</div>

<script type="text/javascript" src="{{ asset('js/editCloumn.js') }}"></script>

<?php echo $footer; ?>