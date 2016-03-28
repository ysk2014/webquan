
<?php echo widget('Home.Common')->header(); ?>

<?php echo widget('Home.Common')->top(); ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-8">
    		@if ($news['rc']==0)
				<ul>
					@foreach ($news['data'] as $new)
						<li><?php echo $new['content']; ?></li>
					@endforeach
				</ul>
			@else
				没有消息
			@endif
    	</div>

    	<div class="col-md-4 sidebar">
    		<?php echo widget('Home.Common')->aside(); ?>
    	</div>
    </div>
</div>

<?php echo widget('Home.Common')->footer(); ?>