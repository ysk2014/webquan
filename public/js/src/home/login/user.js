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
                <div className="home-page">
                    <LeftNav />
                        <div className="host-box">
                            <div className="host clearfix">
                                <img src="/upload_path/logo/web5.jpg" />
                                <div className="mes">
                                    <p>殷士凯</p>
                                </div>
                                <div className="nav">
                                    <a href="#">0<br />关注</a>
                                    <a href="#">0<br />粉丝</a>
                                    <a href="#">0<br />文章</a>
                                    <a href="#">0<br />收获喜欢</a>
                                </div>
                            </div>
                        </div>
                </div>
            );
        }
    });
});