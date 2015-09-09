
define(['react','jquery'],function(React, $) {

	return React.createClass({
		getInitialState: function() {
			return {
				name: 'leftNav',
			}
		},
		
		render: function() {
			return (
				<div className="left-bar">
					<div className="logo"></div>
					<ul className="left-nav">
						<li className="active">
							<a href="">
								<i className="fa fa-home"></i>
								<span>首页</span>
							</a>
						</li>
						<li className="">
							<a href="">
								<i className="fa fa-home"></i>
								<span>专题</span>
							</a>
						</li>
						<li className="">
							<a href="">
								<i className="fa fa-home"></i>
								<span>问答</span>
							</a>
						</li>
						<li className="">
							<a href="">
								<i className="fa fa-home"></i>
								<span>作品</span>
							</a>
						</li>
					</ul>
				</div>
			);
		}
	});

});