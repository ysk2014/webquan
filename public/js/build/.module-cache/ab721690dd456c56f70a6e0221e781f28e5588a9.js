define([
	'react',
	'jquery',
	'WQ',
	'home/model/cloumnModel',
	'home/common/leftNav',
	'home/common/userDropMenu',
	'home/common/tooltip',
	],function( React, $, WQ, CloumnModel, LeftNav, UserDropMenu, Tooltip) {


	var mixin = {
		init: function() {
			var _this = this;
			var aid = _this.state.aid;
			
			return this;
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'cloumn',
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			var title    = _this.state.info ? _this.state.info.title      : null;
			var username = _this.state.info ? _this.state.info.username   : null;
			var time     = _this.state.info ? _this.state.info.addtime    : null;
			var cloumn   = _this.state.info ? _this.state.info.cloumnName : null;
			var view     = _this.state.info ? _this.state.info.view       : null;
			var comment  = _this.state.info ? _this.state.info.comment    : null;

			var commentList = this.state.commentList.length>0 ? this.state.commentList.map(function(d,i) {
				return (
					React.createElement("div", {key: d.id, className: "comment-item  clearfix", "data-id": d.id}, 
						React.createElement("a", {className: "user avatar"}, 
							React.createElement("img", {src: "/image/user-default.png"})
						), 
						React.createElement("div", {className: "comment-right"}, 
							React.createElement("div", {className: "con"}, 
								React.createElement("span", {className: "author"}, 
									React.createElement("a", {href: "javascript:void(0)"}, d.username), 
									React.createElement("div", {className: "hd-time"}, WQ.timeFormat(d.addtime))
								), 
								React.createElement("div", {className: "html"}, d.content)
							), 
							React.createElement("div", {className: "replay"}, 
								React.createElement("a", {"data-nick": d.username, onClick: _this.handleReplay}, "回复")
							)
						)
					)
				);
			}) : null;
			return (
				React.createElement("div", null, 
					React.createElement(UserDropMenu, null), 
					React.createElement(LeftNav, {active: this.state.name}), 

					React.createElement("div", {className: "header"}, 
						React.createElement("div", {className: "btn-list"}, 
							React.createElement("a", {className: "btn", href: "/article/edit/"+this.state.aid}, 
								React.createElement("i", {className: "fa fa-pencil-square-o"})
							), 
							React.createElement("a", {className: "btn"}, 
								React.createElement("i", {className: "fa fa-bookmark-o"})
							), 
							React.createElement("a", {className: "btn"}, 
								React.createElement("i", {className: "fa fa-share-square-o"})
							)
						)
					), 

					React.createElement("div", {className: "article-page", style: _this.state.info ? {display:'block'} : {display: 'none'}}, 
						React.createElement("h3", {className: "title"}, title), 
						React.createElement("div", null, 
							React.createElement("span", {className: "author"}, 
								React.createElement("a", {href: "javascript:void(0)"}, 
									React.createElement("img", {className: "avatar", src: "/image/user-default.png"}), 
									React.createElement("span", {className: "name"}, username)
								)
							), 
							React.createElement("span", {className: "tag time"}, " • ", WQ.timeFormat(time)), 
							React.createElement("span", {className: "tag cloumn"}, " 发布在: ", cloumn), 
							React.createElement("span", {className: "tag view"}, " 阅读: ", view), 
							React.createElement("span", {className: "tag comment"}, " 评论: ", comment)
						), 
						
						React.createElement("div", {id: "editormd-view"}, 
							React.createElement("textarea", null)
						), 

						React.createElement("div", {className: "comment-box"}, 
							React.createElement("div", {className: "hd"}, "评论"), 
							React.createElement("div", {className: "bd"}, 
								React.createElement("div", {className: "publish"}, 
									React.createElement("textarea", {id: "comment-text", placeholder: "参与讨论", value: this.state.commentContent, onChange: this.handleChangeCommnet}), 
									React.createElement("div", {className: "comment-submit", onClick: this.submitComment}, "发表评论")
								), 
								React.createElement("div", {className: "comment-list"}, 
									commentList, 
									React.createElement("a", {className: "more", style: _this.state.next ? {display:'block'} : {display:'none'}, onClick: _this.hamdleMore}, "更多评论")
								)
							)
						)
					)
				)
			);
		}
	});

});