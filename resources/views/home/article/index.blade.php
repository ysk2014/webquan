
@extends('home.app')

<!-- 侧边栏 -->
@include('home.aside',['author'=>'','articles'=>$hotsArt,'tags'=>$tags])


@section('title', $title)

@section('userinfo', $userinfo)


@section('content')
	<div class="row">
    	<div class="col-md-8">
    		@include('home.widget.articles',['articleList'=>$articleList])
    	</div>
    	<div class="col-md-4 sidebar">@yield('aside')</div>
    </div>
	<script type="text/javascript">
		$(function() {
			$('#main').on('click','.article-more',function() {
				var page = parseInt($(this).data('page'),10)+1;
				var $this = $(this);
				$this.text('加载中...');
				$.get('/articles/'+page,function(data) {
					$this.before(data).remove();
				});
			});
		});
	</script>
@endsection

