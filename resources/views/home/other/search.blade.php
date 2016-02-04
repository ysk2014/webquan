
<?php echo $header; ?>

<?php echo $top; ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-8">
			<?php echo $articles; ?>
    	</div>
    	<div class="col-md-4 sidebar">
    		<div class="widget">
				<h4 class="title">搜索</h4>
				<div class="content">
					<form class="form-horizontal search-form" action="/search" method="get">
						<div class="input-group">
							<span class="input-group-btn">
					        	<button type="button" class="btn btn-primary"><span class="text">文章</span> <span class="caret"></span></button>
					        	<ul class="dropdown-menu">
						          	<li><a data-type="0" href="javascript:void(0);">文章</a></li>
						          	<li><a data-type="1" href="javascript:void(0);">专题</a></li>
						        </ul>
					      	</span>
							<input class="form-control" type="text" name="search" placeholder="搜索">
							<input type="hidden" name="type" value="0" />
						</div>
					</form>
				</div>
			</div>
    	</div>
    </div>
</div>
<script type="text/javascript">
	$(function() {
		$('.sidebar .search-form').on('click','button',function() {
			var $btn = $(this);
			$(this).siblings('ul').show().on('click','a',function() {
				var selected = $(this).html();
				var type = $(this).data('type');
				$btn.find('span.text').html(selected);
				$btn.parent().siblings('input[type="hidden"]').val(type);
				$btn.siblings('ul').hide();
			});
		});
	});
</script>
<?php echo $footer; ?>