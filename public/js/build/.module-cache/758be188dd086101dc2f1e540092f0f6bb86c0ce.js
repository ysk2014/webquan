define(['react', 
        'jquery', 
        'home/model/userModel',
        'home/common/leftNav',
        'home/common/userDropMenu',
        'home/common/tooltip',
        ],function(React, $, UserModel, LeftNav, UserDropMenu, Tooltip) {


    var mixin = {
 
    };

    return React.createClass({
        mixins: [mixin],
        getInitialState: function() {
            return {
                nav: this.props.params.way,
                username: '',
                password: '',
                email: '',
                job: '',
            }
        },

        render: function() {
            var _this = this;
            return (
                React.createElement("div", null, 
                    React.createElement(LeftNav, null), 
                    React.createElement(UserDropMenu, null), 
                    React.createElement("div", {className: "userPage"})
                )
            );
        }
    });
});