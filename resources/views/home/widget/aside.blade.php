	@if (!empty($userinfo))
		<div class="widget">
			<div class="content">
				<a class="btn-add" href="/note/add"><i class="fa fa-pencil"></i><br>写文章</a>
				<a class="btn-add" href="/cloumn/add"><i class="fa fa-plus"></i><br>添加专栏</a>
			</div>
		</div>
	@endif

	@if (isset($author))
		<div class="widget">
			<h4 class="title">本文作者</h4>
			<div class="content">
				<a href="{{ '/user/'.$author['uid'] }}"><span class="avatar" style="background-image: url({{ $author['avatar'] }})"></span></a>
				<div class="w-desc">
					<a href="{{ '/user/'.$author['uid'] }}" target="_blank"><span class="name">{{ $author['nick'] }}</span></a>
					<p class="brief">{{ empty($author['description']) ? '这个同学很懒，什么都没有留下' :  $author['description'] }}</p>
				</div>
			</div>
		</div>
	@endif

	@if (isset($cloumn))
		<div class="widget">
			<h4 class="title">本文隶属专栏</h4>
			<div class="content">
				<div class="w-desc">
					<a href="{{ '/cloumn/'.$cloumn['cid'] }}"><span class="name">{{ $cloumn['name'] }}</span></a>
					<p class="brief" style="width: 100%;">{{ $cloumn['description'] }}</p>
				</div>
			</div>
		</div>
	@endif

	@if ($hotsArt['rc']==0)
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
	@if ($tags['rc']==0)
		<div class="widget">
			<h4 class="title">标签</h4>
			<div class="content tag-cloud">
				@foreach ($tags['data'] as $tag)
					@if (!empty($tag['name']))<a class="tag" href="{{ '/t/'.$tag['name'] }}">{{ $tag['name'] }}</a>@endif
				@endforeach
				@if ($tags['next'])
					<a class="tag" href="#">...</a>
				@endif
			</div>
		</div>
	@endif

		


