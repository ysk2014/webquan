define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/common/leftNav',
        'home/common/userDropMenu',
        'home/common/tooltip',
        ],function(React, $, UserModel, LeftNav, UserDropMenu, Tooltip) {


    var mixin = {
        init: function() {
            var _this = this;
            var uid = WQ.cookie.get('id');
            UserModel.getUserInfoById({id:uid},function(success,data) {
                if(success) {
                    if(!data.error) {
                        console.log(data.data);
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
                info: []
            }
        },
        componentDidMount: function() {
            
        },
        render: function() {
            var _this = this;
            return (
                React.createElement("div", null, 
                    React.createElement(LeftNav, null), 
                    React.createElement(UserDropMenu, null), 
                    React.createElement("div", {className: "user-page"}, 
                        React.createElement("div", {className: "user-info"}, 
                            React.createElement("div", {className: "hd"})
                        )
                    )
                )
            );
        }
    });
});