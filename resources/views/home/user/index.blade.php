
<?php echo widget('Home.Common')->header(); ?>

<?php echo widget('Home.Common')->top(); ?>

<div class="full-page" style="background: url('{{ asset('upload_path/banner/2.jpg') }}') center no-repeat;background-size: cover;">
	<div class="mask"></div>
	<div class="container user-page">
		<h2>{{ $userInfo['username'] }}</h2>
		<p>{{ $userInfo['description'] }}</p>
	</div>
</div>
<div class="container user-page-list" id="main">
	<div class="row">
		<div class="col-md-8">
			@if ($isAuthor) 
			<div class="col-md-12">
				<ul class="nav nav-tabs user-nav">
					<li><a class="active" href="javascript:void(0);">已发布</a></li>
					<li><a href="javascript:void(0);">草稿箱</a></li>
				</ul>
			</div>
			@endif
	    	<div class="col-md-12 user-page-content">
	    		<?php echo $articles ?>
	    	</div>
		</div>
		<div class="col-md-4 sidebar">
			<?php echo widget('Home.Common')->aside(); ?>
		</div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/user.js') }}"></script>
<script type="text/javascript">
	$(function() {
		$('#main').on('click','.article-more',function() {
			var page = parseInt($(this).data('page'),10)+1;
			var $this = $(this);
			$this.text('加载中...');

			var tab = $('#main').find('.nav-tabs.user-nav a.active').html();

			if (tab=='已发布') {
				var uid = "{{ $userInfo['id'] }}";
				$.post('/articles/user/pub', {page: page, uid: uid}, function(data) {
					$this.before(data).remove();
				});
			} else {
				$.post('/articles/user/draft', {page: page}, function(data) {
					$this.before(data).remove();
				});
			}
		});
	});
</script>
<?php echo widget('Home.Common')->footer(); ?>
