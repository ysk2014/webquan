

<?php echo widget('Home.Common')->header($articleInfo['data']['title'].' | Web圈'); ?>

<?php echo widget('Home.Common')->top(); ?>

<link rel="stylesheet" type="text/css" href="{{ asset('css/simditor.css') }}" />

<div class="container" id="main">
	<div class="row">
    	<div class="col-md-8">
    		<div class="content-wrapper simditor">
    			<h3>{{ $articleInfo['data']['title'] }}</h3>
    			<div class="desc">
					<a href="{{ '/user/'.$articleInfo['data']['uid'] }}" class="author"><img class="img-circle" src="{{ $articleInfo['data']['userUrl'] }}"/><span>{{ $articleInfo['data']['username'] }}</span></a> •
	            	<span class="time">{{ date('Y.m.d H:i',$articleInfo['data']['addtime']) }}</span>
	            	<span class="view">浏览：{{ $articleInfo['data']['view'] }}</span>
	            	@if (!empty($articleInfo['data']['tags'][0]))
	            	<span class="tags">
	            		<i class="fa fa-tags"></i>
	            		@foreach ($articleInfo['data']['tags'] as $tag)
	            			@if (!empty($tag))
	            			<a href="{{'/t/'.$tag}}">{{ $tag }}</a>
	            			@endif
	            		@endforeach
	            	</span>
	            	@endif
				</div>
				<div class="content simditor-body">
					{!! $articleInfo['data']['content'] !!}
				</div>
				<div class="single-share" data-aid="{{ $articleInfo['data']['id'] }}">
					<ul class="clearfix">
						<li><a href="javascript:void(0);" class="store @if (!empty($articleInfo['data']['store_id'])) active @endif" @if (!empty($articleInfo['data']['store_id'])) data-sid="{{ $articleInfo['data']['store_id'] }}" @endif><i class="fa fa-star" style="position: relative;top: 1px;margin-left: 1px;"></i><span>{{ $articleInfo['data']['store'] }}</span></a></li>
						<li><a href="javascript:void(0);" class="praise @if (!empty($articleInfo['data']['praise_id'])) active @endif" @if (!empty($articleInfo['data']['praise_id'])) data-pid="{{ $articleInfo['data']['praise_id'] }}" @endif><i class="fa fa-thumbs-up" style="position: relative;top: 1px;margin-left: 2px;"></i><span>{{ $articleInfo['data']['praise'] }}</span></a></li>

						@if ($userinfo['id']==$articleInfo['data']['uid']) 
							<li style="margin-right: 18px;"><a href="{{ '/note/'.$articleInfo['data']['nid'].'/edit' }}"><i class="fa fa-edit" style="position: relative;top: 2px;margin-left: 2px;"></i></a></li>
							<li><a href="javascript:void(0);" class="del" data-nid="{{ $articleInfo['data']['nid'] }}"><i class="fa fa-trash-o" style="position: relative;top: 1px;margin-left: 1px;"></i></a></li>
						@endif
					</ul>
				</div>
    		</div>
			<div class="comment-wrapper">
				<h4>文章评论(<span> @if ($comments['rc']==0) {{ $comments['count'] }} @else 0 @endif </span>)</h4>

				<div class="comment-list">
					@if ($comments['rc']==0)
						@foreach ($comments['data'] as $comment)
							<div class="comment-item clearfix" id="comment-{{ $comment['id'] }}" data-id="{{ $comment['id'] }}">
								<div class="content">
									<div class="meta-top">
										<a class="avatar img-circle" href="{{ '/user/'.$comment['uid'] }}"><img src="{{ $comment['userUrl'] }}"></a>
										<p><a href="{{ '/user/'.$comment['uid'] }}" class="author-name">{{ $comment['username'] }}</a></p>
										<span class="reply-time">{{ date('Y.m.d H:i',$comment['addtime']) }}</span>
									</div>
									<p>{{ $comment['content'] }}</p>
									<div class="comment-footer clearfix text-right">
										<a class="reply" data-id="{{ $comment['id'] }}" data-nick="{{ $comment['username'] }}" data-pid="{{ $comment['id'] }}" data-fid="{{ $comment['id'] }}" data-action="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}" href="javascript:;">回复</a>
										@if ($userinfo['id']==$comment['uid'])
											<a data-confirm="确定要删除评论么?" class="delete" data-comment-id="{{ $comment['id'] }}" data-url="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}"  href="javascript:;">删除</a>
										@endif
									</div>
									<div class="child-comment-list @if (isset($comment['children']) && count($comment['children'])>0) show @else hide @endif">
										@if (isset($comment['children']) && count($comment['children'])>0)
											@foreach ($comment['children'] as $childComment)
												<div class="child-comment" id="comment-{{ $childComment['id'] }}" data-id="{{ $childComment['id'] }}">
													<p><a href="{{ '/user/'.$childComment['uid'] }}">{{ $childComment['username'] }}</a>: <?php echo $childComment['content']; ?></p>
													<div class="child-comment-footer text-right clearfix">
														<span class="reply-time pull-left">{{ date('Y.m.d H:i',$childComment['addtime']) }}</span>
														<a data-id="{{ $childComment['id'] }}" data-nick="{{ $childComment['username'] }}" class="reply" data-pid="{{ $childComment['id'] }}" data-fid="{{ $childComment['fid'] }}" data-action="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}" href="javascript:void(null)">回复</a>
														@if ($userinfo['id']==$childComment['uid'])
															<a data-confirm="确定要删除评论么?" class="delete" data-comment-id="{{ $childComment['id'] }}" data-url="{{ '/article/'.$articleInfo['data']['id'].'/comment' }}"  href="javascript:;">删除</a>
														@endif
													</div>
												</div>
											@endforeach
										@endif
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
							<div class="comment-text">
								<textarea maxLangth="1000" name="data[content]" placeholder="写下你的评论..."></textarea>
								<a class="btn btn-primary btn-sm submit" >发表</a>
							</div>
						</form>
					@else 
						<a class="btn btn-primary btn-sm login" href="#myLogin" data-toggle="modal" data-target="#myLogin">登录后才能评论</a>
					@endif
				</div>
			</div>
    	</div>
    	<div class="col-md-4 sidebar">
    		<?php echo widget('Home.Common')->artAside($author,$cloumn); ?>
    	</div>
    </div>
</div>

<!-- <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/github-gist.min.css"> -->
<!-- <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/highlight.min.js"></script> -->
<!-- // <script>hljs.initHighlightingOnLoad();</script> -->
<script type="text/javascript" src="{{ asset('js/article.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/comment.js') }}"></script>

<?php echo widget('Home.Common')->footer(); ?>