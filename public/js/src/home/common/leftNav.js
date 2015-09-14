
define(['react','jquery'],function(React, $) {

	return React.createClass({
		getInitialState: function() {
			return {
				active: this.props.active,
			}
		},
		
		render: function() {
			return (
				<div className="left-bar">
					<div className="logo">
						<a href="/">logo</a>
					</div>
					<ul className="left-nav">
						<li className={this.state.active == 'home' ? "active" : null}>
							<a href="/">
								<i className="fa fa-home"></i>
								<span>首页</span>
							</a>
						</li>
						<li className={this.state.active == 'cloumn' ? "active" : null}>
							<a href="/cloumn">
								<i className="fa fa-th"></i>
								<span>专题</span>
							</a>
						</li>
						<li className={this.state.active == 'talk' ? "active" : null}>
							<a href="/">
								<i className="fa fa-bell-o"></i>
								<span>问答</span>
							</a>
						</li>
						<li className={this.state.active == 'editArticle' ? "active" : null}>
							<a href="/article/edit">
								<i className="fa fa-pencil"></i>
								<span>写文章</span>
							</a>
						</li>
					</ul>
				</div>
			);
		}
	});

});