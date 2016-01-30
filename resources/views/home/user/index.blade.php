
<?php echo $header; ?>

<?php echo $top; ?>

<div class="full-page">
	<div class="mask"></div>
	<div class="container user-page">
		<h2>{{ $userInfo['username'] }}</h2>
		<p>{{ $userInfo['description'] }}</p>
	</div>
</div>
<div class="container user-page-list" id="main">
	<div class="row">
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
</div>
<script type="text/javascript" src="{{ asset('js/user.js') }}"></script>
<?php echo $footer; ?>