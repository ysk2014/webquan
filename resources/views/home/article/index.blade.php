

<?php echo widget('Home.Common')->header(); ?>

<?php echo widget('Home.Common')->top(); ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-8">
			<?php echo widget('Home.Common')->articles(); ?>
    	</div>
    	<div class="col-md-4 sidebar">
    	<?php echo widget('Home.Common')->aside(); ?>
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
</div>


<?php echo widget('Home.Common')->footer(); ?>