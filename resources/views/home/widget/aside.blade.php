	@if (isset($author))
		<div class="widget">
			<h4 class="title">用户中心</h4>
			<div class="content">
				<a class="btn btn-default" href="#">User</a>
			</div>
		</div>
	@endif
	@if (!$hotsArt['error'])
		<div class="widget">
			<h4 class="title">热门文章</h4>
			<div class="content">
				@foreach ($hotsArt['hotsArticle'] as $article)
					<div class="media" data-id="{{ $article['id'] }}">
						@if (!empty($article['logo_dir']))
						<div class="media-left">
							<a href="{{ '/article/'.$article['id'] }}" style="background-image: url({{ $article['logo_dir'] }})"></a>
						</div>
						@endif
						<div class="media-body">
							<a href="{{ '/article/'.$article['id'] }}" class="media-heading">{{ $article['title'] }}</a>
						</div>
					</div>
				@endforeach
			</div>
		</div>
	@endif
	@if (!$tags['error'])
		<div class="widget">
			<h4 class="title">标签</h4>
			<div class="content tag-cloud">
				@foreach ($tags['data'] as $tag)
					<a class="tag" href="#">{{ $tag['name'] }}</a>
				@endforeach
				@if ($tags['next'])
					<a class="tag" href="#">...</a>
				@endif
			</div>
		</div>
	@endif
