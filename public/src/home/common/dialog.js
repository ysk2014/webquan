
define(['react','jquery','home/model/articleModel'],function(React, $, ArticleModel) {

	var Tooltip = function(opt) {
		return new Tooltip.propotype.init(opt);
	};
	var modal = {
		container: {
			position: 'absolute',
			top: '10%',
			left: '50%',
			display: 'block',
			marginLeft: '-219px'
		},
		title: {
			width: '400px',
			color:'#555',
		},
		desc: {
			width: '400px',
			height: '100px',
			marginTop: '10px',
			resize: 'none',
			outline: 'none',
			padding: '8px',
			border: '1px solid #ddd',
			color: '#555',
		}
		
	};
	Tooltip.propotype = {
		init: function(opt) {
			var AlertBox = React.createClass({
				getInitialState: function() {
					return {
						name: opt.name ? opt.name : '',
						description: opt.description ? opt.description : '',
					};
				},
				componentDidMount: function() {
					var _this = this;
					var alertBox = $(_this.getDOMNode());
					
					$('#mask').show();
				},
				handleOk: function() {
					var _this = this;
					var params = _this.state;
					ArticleModel.addTag(params,function(data) {
						if(!data.error) {
							_this.handleClose();
							opt.ok && opt.ok(data.error);
						}
					});
				},
				handleClose: function() {
					React.unmountComponentAtNode($('#mask').get(0));
					$('#mask').hide();
				},
				handleNameChange: function(event) {
					var _this = this;
					_this.setState({
						name: event.target.value
					});
				},
				handleDescChange: function(event) {
					var _this = this;
					_this.setState({
						description: event.target.value
					});
				},
				render: function() {
					var _this = this;
					return (
						<div ref="dialogBox" className="editormd-dialog" style={modal.container}>
							<div className="editormd-dialog-header"><strong class="editormd-dialog-title">添加标签</strong></div>
							<a href="javascript:;" className="fa fa-close editormd-dialog-close" onClick={_this.handleClose}></a>
							<div className="editormd-dialog-container">
								<div className="editormd-form">
									<input type="text" style={modal.title} value={_this.state.name} onChange={_this.handleNameChange} placeholder="标签名称"/><br />
									<textarea style={modal.desc} onChange={_this.handleDescChange} value={_this.state.description} placeholder="请对此标签补充一些描述，以供他人参考"></textarea>
								</div>
								<div className="editormd-dialog-footer">
									<button className="editormd-btn editormd-enter-btn" onClick={_this.handleOk}>确定</button>
									<button className="editormd-btn editormd-cancel-btn" onClick={_this.handleClose}>取消</button>
								</div>
							</div>
						</div>
					);
				}
			});
			React.render(<AlertBox />,$('#mask').get(0));
		},
	};

	return Tooltip;
});