
<?php echo $header; ?>

<?php echo $top; ?>

<div class="full-page">
	<div class="mask"></div>
	<div class="container user-page">
		<h2>{{ $userInfo['username'] }}</h2>
		<p>{{ $userInfo['description'] }}</p>
	</div>
</div>
<div class="container" id="main">
	<div class="row">
    	<div class="col-md-12">
    		<?php echo $articles; ?>
    	</div>
    </div>
</div>

<?php echo $footer; ?>
