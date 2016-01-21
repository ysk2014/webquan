
@if (!$articles['error']) 
	@foreach ($articles['data'] as $article)
		<div class="article" data-id="{{ $article['id'] }}">
			<div class="top">
				<a href="{{ '/article/'.$article['id'] }}" class="title">{{ $article['title'] }}</a>
				<div class="desc">
					<a href="{{ '/user/'.$article['uid'] }}" class="author"><img class="img-circle" src="{{ $article['userUrl'] }}"/><span>{{ $article['username'] }}</span></a> •
	            	<span class="time">{{ date('Y.m.d H:i',$article['addtime']) }}</span>
	            	<span class="view">专栏：<a href="/cloumn/{{ $article['cid'] }}">{{ $article['cloumn'] }}</a></span>
	            	<span class="view">浏览：{{ $article['view'] }}</span>
	            	<span class="praise">推荐：{{ $article['praise'] }}</span>
	            	<span class="comment">评论：{{ $article['comment'] }}</span>
	            	@if (!empty($article['tags']))
		            	<span class="tags"><i class="fa fa-tags"></i>
							@foreach ($article['tags'] as $tag)
			            		<a href="">{{ $tag }}</a>
			            	@endforeach
			            </span>
	            	@endif
				</div>
				<hr>
			</div>
			@if (!empty($article['logo_dir']))
				<div class="banner">
					<a href="{{ '/article/'.$article['id'] }}">
						<img src="{{ $article['logo_dir'] }}">
					</a>
				</div>
			@endif
			<div class="content">
				<p>{!! $article['description'] !!}</p>
			</div>
		</div>		
	@endforeach
	@if ($articles['next'])
		<a class="btn btn-primary btn-sm btn-block article-more" style="margin-bottom: 35px;" data-page="{{ $articles['page'] }}">更多</a>
	@endif
@else 
	<div>还没有文章数据</div>
@endif 

