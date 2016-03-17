
@if ($cloumns['rc']==0) 

	<table class="table table-hover cloumn-manager">
		<tr style="font-size: 16px;">
			<th>名称</th>
			<th>文章数</th>
			<th>浏览量</th>
			<th>操作</th>
		</tr>
		@foreach ($cloumns['data'] as $cloumn)
			<tr>
				<td align="center" style="font-weight: 600;"><a href="{{'/cloumn/'.$cloumn['id']}}">{{$cloumn["name"]}}</a></td>
				<td align="center">{{$cloumn['count']}}</td>
				<td align="center">{{$cloumn['view']}}</td>
				<td align="center"><a class="btn btn-primary btn-xs" href="{{'/cloumn/'.$cloumn['id'].'/edit'}}">编辑</a>&nbsp;&nbsp;<a data-id="{{$cloumn['id']}}" class="btn btn-danger btn-xs btn-del" href="javasript:void(0)">删除</a></td>
			</tr>
		@endforeach
	</table>
@else 
	<div>你还没有创建自己的专栏，赶紧去<a href="/cloumn/add">创建</a>吧</div>
@endif