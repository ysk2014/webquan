define([
	'react',
	'jquery',
	'home/common/leftNav',
	'home/article/articleList',
	],function(React, $, LeftNav, ArticleList) {


	var mixin = {
		init: function() {
			
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'home',
			}
		},
		componentDidMount: function() {
			
		},
		render: function() {
			return (
				<div>
					<LeftNav active={this.state.name} />
					<ArticleList />
				</div>
			);
		}
	});

});