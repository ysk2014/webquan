
<?php echo $header; ?>

<?php echo $top; ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-12">
			<div class="tag-page">
				<h3><i class="fa fa-tags"></i>{{ $tag['name'] }}</h3>
				<p class="t-desc">{{ $tag['description'] }}</p>
			</div>
			<?php echo $articles;?>
    	</div>
    </div>
</div>
<script type="text/javascript">
	$(function() {
		$('#main').on('click','.article-more',function() {
			var page = parseInt($(this).data('page'),10)+1;
			var $this = $(this);
			$this.text('加载中...');
			$.get('/articles/'+page,function(data) {
				$this.before(data).remove();
			});
		});
	});
</script>
<?php echo $footer; ?>