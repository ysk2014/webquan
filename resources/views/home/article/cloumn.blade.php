@extends('home/app')

@section('content')

<div class="container">
	<div class="wrapper">
		@include('home/navbar')

		<div class="column">
			<div class="col-title">本子名：前端乱炖官方</div>
			<div class="col-user"><span>所有者：前端乱炖</span><span>浏览量：1123</span></div>
			<div class="col-desc">官方发言，活动通知，总结等。</div>
		</div>
		<div class="module member">
			<div class="hd">成员</div>
			<div class="bd"></div>
		</div>
	</div>
	<div class="content">
		<div class="article-list">
			<article>
				<div class="title">
					<a href="">关于专栏刚上线的新功能【评注】</a>
				</div>
				<div class="attribute">
					<div class="author">
						<div class="user">
							<a href=""><img src="{{ asset('/image/userlogo.jpg') }}"></a>
						</div>
					</div>
					<div class="tag">
						<span class="tag-title"><a href="">土豆丝</a></span>
						<span class="tag-title">浏览量：<a>29472</a></span>
						<span class="tag-title">评论：<a>232</a></span>
						<span class="tag-title"><a>3天前</a></span>	
						<a href="">h5</a>
					</div>
					<div class="other"></div>
				</div>
			</article>
			<article>
				<div class="title">
					<a href="">关于专栏刚上线的新功能【评注】</a>
				</div>
				<div class="attribute">
					<div class="author">
						<div class="user">
							<a href=""><img src="{{ asset('/image/userlogo.jpg') }}"></a>
						</div>
					</div>
					<div class="tag">
						<span class="tag-title"><a href="">土豆丝</a></span>
						<span class="tag-title">浏览量：<a>29472</a></span>
						<span class="tag-title">评论：<a>232</a></span>
						<span class="tag-title"><a>3天前</a></span>	
						<a href="">h5</a>
					</div>
					<div class="other"></div>
				</div>
			</article>
			<article>
				<div class="title">
					<a href="">关于专栏刚上线的新功能【评注】</a>
				</div>
				<div class="attribute">
					<div class="author">
						<div class="user">
							<a href=""><img src="{{ asset('/image/userlogo.jpg') }}"></a>
						</div>
					</div>
					<div class="tag">
						<span class="tag-title"><a href="">土豆丝</a></span>
						<span class="tag-title">浏览量：<a>29472</a></span>
						<span class="tag-title">评论：<a>232</a></span>
						<span class="tag-title"><a>3天前</a></span>	
						<a href="">h5</a>
					</div>
					<div class="other"></div>
				</div>
			</article>
			<article>
				<div class="title">
					<a href="">关于专栏刚上线的新功能【评注】</a>
				</div>
				<div class="attribute">
					<div class="author">
						<div class="user">
							<a href=""><img src="{{ asset('/image/userlogo.jpg') }}"></a>
						</div>
					</div>
					<div class="tag">
						<span class="tag-title"><a href="">土豆丝</a></span>
						<span class="tag-title">浏览量：<a>29472</a></span>
						<span class="tag-title">评论：<a>232</a></span>
						<span class="tag-title"><a>3天前</a></span>	
						<a href="">h5</a>
					</div>
					<div class="other"></div>
				</div>
			</article>
		</div>
		<div class="pagination">
			<ul>
				<li class="disabled"><a>Prev</a></li>
				<li class="active"><a href="">1</a></li>
				<li><a href="">2</a></li>
				<li class="disabled"><a>Next</a></li>
			</ul>
			<div class="total label">共 16 </div>
		</div>
	</div>
</div>
@endsection
