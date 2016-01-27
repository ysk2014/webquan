
@if ($comments['rc']==0)
	@foreach ($comments['data'] as $comment)
		<div class="comment-item clearfix" id="comment-{{ $comment['id'] }}">
			<div class="content">
				<div class="meta-top">
					<a class="avatar img-circle" href="{{ '/user/'.$comment['uid'] }}"><img src="{{ $comment['userUrl'] }}"></a>
					<p><a href="{{ '/user/'.$comment['uid'] }}" class="author-name">{{ $comment['username'] }}</a></p>
					<span class="reply-time">{{ date('Y.m.d H:i',$comment['addtime']) }}</span>
				</div>
				<p>{{ $comment['content'] }}</p>
				<div class="comment-footer clearfix text-right">
					<a class="reply" data-id="{{ $comment['id'] }}" data-nick="{{ $comment['username'] }}" data-pid="{{ $comment['id'] }}" data-fid="{{ $comment['id'] }}" data-action="{{ '/article/'.$aid.'/comment' }}" href="javascript:;">回复</a>
					@if ($userinfo['id']==$comment['uid'])
						<a data-confirm="确定要删除评论么?" class="delete" data-comment-id="{{ $comment['id'] }}" data-method="delete" data-url="{{ '/article/'.$aid.'/comment' }}" href="javascript:;">删除</a>
					@endif
				</div>
				<div class="child-comment-list hide">
					@if (isset($comment['children']) && count($comment['children'])>0)
						@foreach ($comment['children'] as $childComment)
							<div class="child-comment" id="comment-{{ $childComment['id'] }}" data-id="{{ $childComment['id'] }}">
								<p><a href="{{ '/user/'.$childComment['uid'] }}">{{ $childComment['username'] }}</a>: {{ $childComment['content'] }}</p>
								<div class="child-comment-footer text-right clearfix">
									<span class="reply-time pull-left">{{ date('Y.m.d H:i',$childComment['addtime']) }}</span>
									<a data-id="{{ $childComment['id'] }}" data-nick="{{ $childComment['username'] }}" class="reply" data-pid="{{ $childComment['id'] }}" data-fid="{{ $childComment['fid'] }}" data-action="{{ '/article/'.$aid.'/comment' }}" href="javascript:void(null)">回复</a>
									@if ($userinfo['id']==$childComment['uid'])
										<a data-confirm="确定要删除评论么?" class="delete" data-comment-id="{{ $childComment['id'] }}" data-url="{{ '/article/'.$aid.'/comment' }}"  href="javascript:;">删除</a>
									@endif
								</div>
							</div>
						@endforeach
					@endif
				</div>
			</div>
		</div>
	@endforeach
	@if ($comments['next'])
		<p class="load-more"><a href="javascript:;" data-action="{{ '/article/'.$aid.'/comment/page/'.($page+1) }}" >加载更多<i style="margin-left: 5px;" class="fa fa-arrow-down"></i></a></p>
	@endif
@endif