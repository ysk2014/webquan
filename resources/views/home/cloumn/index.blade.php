

<?php echo widget('Home.Common')->header(); ?>

<?php echo widget('Home.Common')->top(); ?>

<div class="full-page" style="background: url('https://source.unsplash.com/category/buildings/daily') center no-repeat;background-size: cover;">
	<div class="mask"></div>
	<div class="container cloumn-page">
		<h2>{{ $cloumn['name'] }}</h2>
		<div class="desc">
			<a href="{{ '/user/'.$cloumn['uid'] }}" class="author"><img class="img-circle" src="{{ $cloumn['userUrl'] }}"/><span>{{ $cloumn['username'] }}</span></a> •
        	<span class="time">{{ date('Y.m.d H:i',$cloumn['addtime']) }}</span>
        	<span class="view">文章：{{ $cloumn['count'] }}篇</span>
        	<span class="care">关注：{{ $cloumn['care'] }}</span>
		</div>
		<p>{{ $cloumn['description'] }}</p>
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