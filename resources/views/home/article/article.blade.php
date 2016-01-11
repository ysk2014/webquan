
<?php echo $header; ?>

<?php echo $top; ?>

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-8">
    		<div class="content-wrapper">
    			<h3>{{ $articleInfo['data']['title'] }}</h3>
    			<div class="desc">
					<a href="{{ '/user/'.$articleInfo['data']['uid'] }}" class="author"><img class="img-circle" src="{{ $articleInfo['data']['userUrl'] }}"/><span>{{ $articleInfo['data']['username'] }}</span></a> •
	            	<span class="time">{{ date('Y.m.d H:i',$articleInfo['data']['addtime']) }}</span>
	            	<span class="view">浏览：{{ $articleInfo['data']['view'] }}</span>
	            	<span class="praise">推荐：{{ $articleInfo['data']['praise'] }}</span>
	            	@if (!empty($articleInfo['data']['tags']))
	            	<span class="tags"><i class="fa fa-tags"></i><a href="">{{ $articleInfo['data']['tags'] }}</a></span>
	            	@endif
				</div>
				<div class="content">
					<?php echo $articleInfo['data']['content']; ?>
				</div>
    		</div>
			<div class="comment-wrapper">
				<h4>文章评论(<span> @if (!$comments['error']) {{ $comments['count'] }} @else 0 @endif </span>)</h4>

				<div class="comment-list">
					@if (!$comments['error'])
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
										<a class="reply" data-id="{{ $comment['id'] }}" data-nick="{{ $comment['username'] }}" data-action="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}" href="javascript:;">回复</a>
										@if ($userinfo['id']==$comment['uid'])
											<a data-confirm="确定要删除评论么?" class="delete" data-comment-id="{{ $comment['id'] }}" data-url="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}"  href="javascript:;">删除</a>
										@endif
									</div>
									<div class="child-comment-list hide">
										<div data-state="remaining-child-comments"></div>
									</div>
								</div>
							</div>
						@endforeach

						@if ($comments['next'])
							<p class="load-more"><a href="javascript:;" data-action="{{ '/article/'.$articleInfo['data']['id'].'/comment/page/1' }}" class="">加载更多<i style="margin-left: 5px;" class="fa fa-arrow-down"></i></a></p>
						@endif
					@endif

					@if (isset($userinfo) && $userinfo) 
						<form method="post" data-action="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}">
							<input type="hidden" name="data[uid]" value="{{ $userinfo['id'] }}" />	
							<input type="hidden" name="data[receive_id]" value="{{ $articleInfo['data']['uid'] }}" />
							<div class="comment-text">
								<textarea maxLangth="1000" name="data[content]" placeholder="写下你的评论..."></textarea>
								<a class="btn btn-primary btn-sm submit" >发表</a>
							</div>
						</form>
					@else 
						<a class="btn btn-primary btn-sm login" href="javascript:;" data-toggle="modal" data-target="#myModal">登录后才能评论</a>
					@endif
				</div>
			</div>
    	</div>
    	<div class="col-md-4 sidebar">
    		<?php echo $aside; ?>
    	</div>
    </div>
</div>

<!-- <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/github-gist.min.css"> -->
<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/highlight.min.js"></script> -->
<!-- // <script>hljs.initHighlightingOnLoad();</script> -->
<script type="text/javascript" src="{{ asset('js/comment.js') }}"></script>

<?php echo $footer; ?>