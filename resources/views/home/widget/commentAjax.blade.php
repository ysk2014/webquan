@if ($fid==0)
	<div class="comment-item clearfix" id="comment-{{ $comment['id'] }}" data-status="new">
		<div class="content">
			<div class="meta-top">
				<a class="avatar img-circle" href="{{ '/user/'.$comment['uid'] }}"><img src="{{ $comment['userUrl'] }}"></a>
				<p><a href="{{ '/user/'.$comment['uid'] }}" class="author-name">{{ $comment['username'] }}</a></p>
				<span class="reply-time">{{ date('Y.m.d H:i',$comment['addtime']) }}</span>
			</div>
			<p>{{ $comment['content'] }}</p>
			<div class="comment-footer clearfix text-right">
				<a class="reply" data-id="{{ $comment['id'] }}" data-nick="{{ $comment['username'] }}" href="javascript:;">回复</a>
				<a data-confirm="确定要删除评论么?" class="delete"  data-comment-id="{{ $comment['id'] }}" data-method="delete" data-url="{{ '/article/'.$aid.'/comment' }}"  href="javascript:;">删除</a>
			</div>
			<div class="child-comment-list hide"></div>
		</div>
	</div>
@else 
	<div class="child-comment" id="comment-{{ $comment['id'] }}" data-id="{{ $comment['id'] }}">
		<p><a href="{{ '/user/'.$comment['uid'] }}">{{ $comment['username'] }}</a>: <?php echo $comment['content']; ?></p>
		<div class="child-comment-footer text-right clearfix">
			<span class="reply-time pull-left">{{ date('Y.m.d H:i',$comment['addtime']) }}</span>
			<a data-id="{{ $comment['id'] }}" data-nick="{{ $comment['username'] }}" class="reply" data-pid="{{ $comment['id'] }}" data-fid="{{ $comment['fid'] }}" data-action="{{ '/article/'.$aid.'/comment' }}" href="javascript:void(null)">回复</a>
			<a data-confirm="确定要删除评论么?" class="delete" data-comment-id="{{ $comment['id'] }}" data-url="{{ '/article/'.$aid.'/comment' }}"  href="javascript:;">删除</a>
		</div>
	</div>
@endif