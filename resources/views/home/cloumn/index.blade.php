
<?php echo $header; ?>

<?php echo $top; ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-12">
			<div class="cloumn-page">
				<h3>{{ $cloumn['name'] }}</h3>
				
				<div class="desc">
					<a href="{{ '/user/'.$cloumn['uid'] }}" class="author"><img class="img-circle" src="{{ $cloumn['userUrl'] }}"/><span>{{ $cloumn['username'] }}</span></a> •
	            	<span class="time">{{ date('Y.m.d H:i',$cloumn['addtime']) }}</span>
	            	<span class="view">文章：{{ $cloumn['count'] }}篇</span>
	            	<span class="care">关注：{{ $cloumn['care'] }}</span>
				</div>

				<p class="c-desc">{{ $cloumn['description'] }}</p>
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