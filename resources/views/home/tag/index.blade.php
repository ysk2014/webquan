
<?php echo widget('Home.Common')->header(); ?>

<?php echo widget('Home.Common')->top(); ?>

<div class="full-page">
	<div class="mask"></div>
	<div class="container tag-page">
		<h2><i class="fa fa-tags"></i>{{ $tag['name'] }}</h2>
		<p class="t-desc">{{ $tag['description'] }}</p>
	</div>
</div>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-12">
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

<?php echo widget('Home.Common')->footer(); ?>