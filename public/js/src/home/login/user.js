define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/common/leftNav',
        'home/common/tooltip',
        ],function(React, $, UserModel, LeftNav, Tooltip) {


    var mixin = {
        init: function() {
            var _this = this;
            var uid = WQ.cookie.get('id');
            UserModel.getUserInfoById({id:uid},function(success,data) {
                if(success) {
                    if(!data.error) {
                        console.log(data.data);
                        _this.setState({
                            info: data.data,
                        });
                    } else {
                        Tooltip(data.msg);
                    }
                }
            });
        }
    };

    return React.createClass({
        mixins: [mixin],
        getInitialState: function() {
            return {
                info: null
            }
        },
        componentDidMount: function() {
            this.init();
        },
        render: function() {
            var _this = this;
            return (
                <div>
                    <LeftNav />
                    {this.state.info ? 
                        (<div className="user-page">
                            <div className="user-info">
                                <div className="hd">
                                    <span>{_this.state.info.username}</span>
                                    <span>{_this.state.info.description}</span>
                                </div>
                                <div className="main-info">
                                    
                                </div>
                            </div>
                        </div>) : null
                    }
                </div>
            );
        }
    });
});