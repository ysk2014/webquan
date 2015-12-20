define(['react', 'jquery', 'WQ','home/model/bugModel','home/common/tooltip'],function(React, $, WQ, BugModel,Tooltip) {

    var model = {
        textarea: {
            width: "100%",
            minHeight: '400px',
            padding: '10px',
            border: '1px solid #d9d9d9',
            marginBottom: '20px'
        },
    };

    return React.createClass({
    	getInitialState: function() {
    		return {
                bugs: [],
                nav: 'bug',
                content: '',
            }
    	},
        handleSubmit: function() {
            var _this = this;
            var params = {
                uid: WQ.cookie.get('id'),
                content: _this.state.content
            };
            if(_this.state.content=='') {
                Tooltip('内容不能为空');
                return false;
            }
            BugModel.addBug(params,function(data) {
                if(!data.error) {
                    Tooltip('感谢你的bug反馈，我们会尽快修改');
                } else {
                    Tooltip(data.msg);
                }
            });
        },
        handleChange: function(event) {
            this.setState({
                content: event.target.value
            });
        },
        handleFocus: function() {
            var uid = WQ.cookie.get('id');
            if(!uid) {
                window.location.href='/login/sign_in';
            }
        },
        render: function() {
        	var _this = this;
        	var nav = _this.state.nav;

        	return (
        		React.createElement("div", {className: "tag-page"}, 
    			    React.createElement("div", {className: "top", style: {borderBottom:'0px'}}, React.createElement("i", {className: "fa fa-question-circle"}), "bug反馈"), 
        			React.createElement("form", null, 
        				React.createElement("textarea", {style: model.textarea, placeholder: "感谢你的bug反馈，我们会尽快修改", onChange: _this.handleChange, value: _this.state.content, onFocus: this.handleFocus}), 
        				React.createElement("a", {className: "btn btn-info btn-large", style: {fontSize:'18px',lineHeight:'40px',height:'40px'}, href: "javascript:void(0)", onClick: _this.handleSubmit}, "提交")
        			)
        		)
        	);
        }
    });
});