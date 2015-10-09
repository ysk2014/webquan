
define(['react','jquery'],function(React, $) {

	return React.createClass({
		getInitialState: function() {
			return {
				active: this.props.active,
			}
		},
		
		render: function() {
			return (
				React.createElement("div", {className: "left-bar"}, 
					React.createElement("div", {className: "logo"}, 
						React.createElement("a", {href: "/"}, React.createElement("img", {src: "/image/logo1.png"}))
					), 
					React.createElement("ul", {className: "left-nav"}, 
						React.createElement("li", {className: this.state.active == 'home' ? "active" : null}, 
							React.createElement("a", {href: "/"}, 
								React.createElement("i", {className: "fa fa-home"}), 
								React.createElement("span", null, "首页")
							)
						), 
						React.createElement("li", {className: this.state.active == 'cloumn' ? "active" : null}, 
							React.createElement("a", {href: "/"}, 
								React.createElement("i", {className: "fa fa-bell-o"}), 
								React.createElement("span", null, "问答")
							)
						), 
						React.createElement("li", {className: this.state.active == 'talk' ? "active" : null}, 
							React.createElement("a", {href: "/"}, 
								React.createElement("i", {className: "fa fa-bell-o"}), 
								React.createElement("span", null, "问答")
							)
						), 
						React.createElement("li", {className: this.state.active == 'editArticle' ? "active" : null}, 
							React.createElement("a", {href: "/article/add"}, 
								React.createElement("i", {className: "fa fa-pencil"}), 
								React.createElement("span", null, "写文章")
							)
						)
					)
				)
			);
		}
	});

});