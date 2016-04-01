
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
			<div class="col-md-12">
				<ul class="nav nav-tabs user-nav">
					<li><a class="active" href="javascript:void(0);">已发布</a></li>
					<li><a href="javascript:void(0);">草稿箱</a></li>
				</ul>
			</div>
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

<?php echo widget('Home.Common')->footer(); ?>
