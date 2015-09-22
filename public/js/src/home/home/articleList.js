define([
	'react',
	'jquery',
	'WQ',
	'home/model/articleModel'
	],function(React, $, WQ, ArticleModel) {


	var mixin = {
		init: function() {
			var _this = this;
			ArticleModel.getAllArticle({way:'addtime'},function(success,data) {
				if(success) {
					if(!data.error) {
						_this.setState({
							list: data.data
						});
					} else {
						alert(data.error);
					}
				}
			});
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				list: []
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var list = this.state.list.length>0 ? this.state.list.map(function(d,i) {
				return (
					<article key={d.id}>
						<a className="pic" href={"/article/"+d.id} style={{backgroundImage: 'url('+d.logo_dir+')'}}>
						</a>
						<div className="desc">
							<a className="title" href={"/article/"+d.id}>{d.title}</a>
							<div className="author">
								<a href="javascript:void(0)">
									<img className="avatar" src="/image/user-default.png" />
									<span className="name">{d.username}</span>
								</a>
								<span className="time">&nbsp;•&nbsp;{WQ.timeFormat(d.addtime)}</span>
							</div>
							<div className="description">{d.description}</div>
						</div>
					</article>
				);
			}) : null;
			return (
				<div className="article-list">
					{list}
				</div>
			);
		}
	});

});