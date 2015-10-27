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
            BugModel.addBug(params,function(success,data) {
                if(success) {
                    if(!data.error) {
                        Tooltip('感谢你的bug反馈，我们会尽快修改');
                    } else {
                        Tooltip(data.msg);
                    }
                }
            });
        },
        handleChange: function(event) {
            this.setState({
                content: event.target.value
            });
        },
        render: function() {
        	var _this = this;
        	var nav = _this.state.nav;

        	return (
        		<div className="tag-page">
    			    <div className="top" style={{borderBottom:'0px'}}><i className="fa fa-question-circle"></i>bug反馈</div>
        			<form>
        				<textarea style={model.textarea} placeholder="感谢你的bug反馈，我们会尽快修改" onChange={_this.handleChange} value={_this.state.content}></textarea>
        				<a className="btn btn-info btn-large" style={{fontSize:'18px',lineHeight:'40px',height:'40px'}} href="javascript:void(0)" onClick={_this.handleSubmit}>提交</a>
        			</form>
        		</div>
        	);
        }
    });
});