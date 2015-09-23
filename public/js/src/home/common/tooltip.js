define(['react','jquery'],function(React, $) {
  return{
      alert:function(){
          $("body").append("<div id='alertMask''></div>");
          var AlertBox = React.createClass({
              componentDidMount: function(){
                  var width = parseInt($(".alert-box").css("width"));
                  if(width <= 70){
                      $(".alert-box").css({"width":"70"});
                  }
                var mLeft = width/2;
                var pad = parseInt($(".alert-box").css("padding-left"));
                $(".alert-box").css({"margin-left":-mLeft-pad});
                var i = 0;
                var timer = setInterval(
                function(){
                    i++;
                    if(i >= 1){
                        clearInterval(timer);
                        $(".alert-box").remove();
                        $("#alertMask").remove();
                    }
                },1000);
              },
            render: function(){
                return (
                    <div className="alert-box">
                        <p>范德萨官三代饭店</p>
                    </div>
                );
            }
          });
      React.render(
          <AlertBox />,
          document.getElementById("alertMask")
      )
      }
  }
})