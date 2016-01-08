
@extends('home.app')

<!-- 侧边栏 -->
@include('home.aside',['articles'=>$hotsArt])


@section('title', $title)


@section('content')
	<div class="row">
    	<div class="col-md-8">
    		<div class="content-wrapper">
    			<h3>{{ $articleInfo['data']['title'] }}</h3>
    			<div class="desc">
					<a href="{{ '/user/'.$articleInfo['data']['uid'] }}" class="author"><img class="img-circle" src="{{ $articleInfo['data']['userUrl'] }}"/><span>{{ $articleInfo['data']['username'] }}</span></a> •
	            	<span class="time">{{ $articleInfo['data']['addtime'] }}</span>
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
    		
    	</div>
    	<div class="col-md-4 sidebar">@yield('aside')</div>
    </div>
@endsection

<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/styles/github-gist.min.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.1.0/highlight.min.js"></script>
<script>hljs.initHighlightingOnLoad();</script>