
@extends('home.app')

<!-- 侧边栏 -->
@include('home.aside',['user'=>'2','articles'=>$articleList])


@section('title', $title)


@section('content')
	@foreach ($articleList['data'] as $article)
		<div class="article" id="{{ $article['id'] }}">
			<div class="top">
				<a href="" class="title">{{ $article['title'] }}</a>
				<div class="desc">
					<a href="" class="author"><img class="img-circle" src="{{ $article['userUrl'] }}"/><span>{{ $article['username'] }}</span></a> •
	            	<span class="time">{{ $article['addtime'] }}</span>
	            	<span class="view">浏览：{{ $article['view'] }}</span>
	            	<span class="praise">推荐：{{ $article['praise'] }}</span>
	            	@if (!empty($article['tags']))
	            	<span class="tags"><i class="fa fa-tags"></i><a href="">{{ $article['tags'] }}</a></span>
	            	@endif
				</div>
				<hr>
			</div>
			@if (!empty($article['logo_dir']))
				<div class="banner">
					<a href="">
						<img src="{{ $article['logo_dir'] }}">
					</a>
				</div>
			@endif
			<div class="content">
				<p>{{ $article['description'] }}</p>
			</div>
		</div>		
	@endforeach
@endsection

