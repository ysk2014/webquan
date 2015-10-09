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
			if(_this.state.cid > 0) {
				CloumnModel.getCloumnById(_this.state.cid,function(success,data) {
					if(success) {
						if(!data.error) {
							console.log(data);
							_this.setState({
								name: data.data['name'],
								description: data.data['description'],
							});
						} else {
							Tooltip(data.msg);
						}
					}
				});
			}
			return this;
		},
		handleNameChange: function(event) {
			this.setState({
				name: event.target.value
			});
		},
		handleDescChange: function(event) {
			this.setState({
				description: event.target.value
			});
		},
		handleSubmit: function() {
			var _this = this;
			if(_this.state.cid > 0) {
				var dataObj = {name:_this.state.name,description:_this.state.description,uid:_this.state.uid,id:_this.state.cid};
				CloumnModel.editCloumn(dataObj,function(success,data) {
					if(success) {
						if(!data.error) {
							window.location.href='/cloumn/'+_this.state.cid;
						} else {
							Tooltip(data.msg);
						}
					}
				});	
			} else {
				var dataObj = {name:_this.state.name,description:_this.state.description,uid:_this.state.uid};
				CloumnModel.addCloumn(dataObj,function(success,data) {
					if(success) {
						if(!data.error) {
							window.location.href='/cloumn/'+data.data;
						} else {
							Tooltip(data.msg);
						}
					}
				});
			}
			
		}
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				nav: 'cloumn',
				cid: this.props.params.id ? this.props.params.id : 0,
				name: '',
				description: '',
				uid: WQ.cookie.get('id'),
				logo_dir: ''
			}
		},
		componentDidMount: function() {
			this.init();
		},
		render: function() {
			var _this = this;
			return (
				React.createElement("div", null, 
					React.createElement(UserDropMenu, null), 
					React.createElement(LeftNav, {active: this.state.nav}), 

					React.createElement("div", {className: "cloumn-edit"}, 
						React.createElement("form", {action: ""}, 
							React.createElement("h3", null, _this.state.cid>0 ? '编辑' : '新建', "专题"), 
							React.createElement("div", {className: "upload"}, 
								React.createElement("input", {type: "file", style: {display:'none'}}), 
								React.createElement("iframe", {name: "uploadIframe", id: "uploadIframe", style: {display:"none"}}), 
								React.createElement("i", {className: "fa fa-picture-o"}), 
								React.createElement("img", {className: "preview", src: _this.state.logo_dir}), 
								React.createElement("span", {className: ""}, "点击上传专题")
							), 
							React.createElement("div", {className: "input-prepend"}, 
								React.createElement("input", {type: "text", placeholder: "专题命名，使用尽量少的字来描述", value: _this.state.name, onChange: _this.handleNameChange})
							), 
							React.createElement("div", {className: "input-prepend"}, 
								React.createElement("textarea", {name: "description", maxLength: "200", placeholder: "请以200字以内为专题添加描述", value: _this.state.description, onChange: _this.handleDescChange})
							), 
							React.createElement("input", {type: "button", className: "btn-success btn-large", value: "创建专题", onClick: _this.handleSubmit})
						)
					)
				)
			);
		}
	});

});