

@if (empty($title))
	<li class="login"><a href="javascript:;" data-toggle="modal" data-target="#myModal">登录/注册</a></li>
@else 
	<li class="dropdown">
		<a href="javascript:;"><img class="img-circle" src="{{ asset('image/user-default.png') }}"><b class="caret"></b></a>
		<ul class="dropdown-menu">
			<li><a href="#">Action</a></li>
			<li><a href="#">Another action</a></li>
			<li><a href="#">Something else here</a></li>
			<li><a href="#">Separated link</a></li>
		</ul>
	</li>
	<script type="text/javascript">
	$(function() {
		$('.dropdown > a').on('click',function() {
			if ($(this).parent().hasClass('open')) {
				$(this).parent().removeClass('open');
			} else {
				$(this).parent().addClass('open');
			}
		});
	});
	</script>
@endif