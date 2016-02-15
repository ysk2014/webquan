
@if ($articles['rc']==0) 
	@foreach ($articles['data'] as $article)
		<div class="article" data-id="{{ $article['id'] }}">
			<!-- 更新文章 -->
			@if (isset($article['nUpdate']) && $article['update_time']!=$article['nUpdate']) 
				<a class="pull-right update" data-nid="{{ $article['nid'] }}" href="javascript:void(0);">更新</a>
			@endif
			<!-- 删除草稿 -->
			@if (!isset($article['nid'])) 
				<a class="pull-right delDraft" data-nid="{{ $article['id'] }}" href="javascript:void(0);"><i class="fa fa-trash-o" style="font-size: 16px;"></i></a>
			@endif

			<div class="top">
				<a href="@if (isset($article['view'])) {{ '/article/'.$article['id'] }} @else {{ '/note/'.$article['id'].'/edit' }} @endif" target="_blank" class="title">{{ $article['title'] }}</a>
				<div class="desc">
					<a href="{{ '/user/'.$article['uid'] }}" class="author"><img class="img-circle" src="{{ $article['userUrl'] }}"/><span>{{ $article['username'] }}</span></a> •
	            	<span class="time">{{ date('Y.m.d H:i',$article['addtime']) }}</span>
	            	<span class="view">专栏：<a href="/cloumn/{{ $article['cid'] }}">{{ $article['cloumn'] }}</a></span>
	            	@if (isset($article['view'])) 
	            	<span class="view">浏览：{{ $article['view'] }}</span>
	            	<span class="praise">推荐：{{ $article['praise'] }}</span>
	            	<span class="comment">评论：{{ $article['comment'] }}</span>
	            	@endif
	            	@if (!empty($article['tags']))
		            	<span class="tags"><i class="fa fa-tags"></i>
							@foreach ($article['tags'] as $tag)
			            		<a href="{{ '/t/'.$tag }}">{{ $tag }}</a>
			            	@endforeach
			            </span>
	            	@endif
				</div>
				<hr>
			</div>
			@if (!empty($article['logo_dir']))
				<div class="banner">
					<a href="{{ '/article/'.$article['id'] }}" target="_blank">
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
	<div>暂无文章</div>
@endif 

