
@extends('home.app')

<!-- 侧边栏 -->
@include('home.aside',['userinfo'=>$userinfo,'articles'=>$hotsArt,'tags'=>$tags])


@section('title', $title)


@section('content')
	@include('home.widget.articles',['articleList'=>$articleList])
	<script type="text/javascript">
		$(function() {
			$('#main').on('click','.article-more',function() {
				var page = parseInt($(this).data('page'),10)+1;
				var $this = $(this);
				$this.text('加载中...');
				$.get('/article/'+page,function(data) {
					$this.before(data).remove();
				});
			});
		});
	</script>
@endsection

