define(['react','jquery'],function(React, $) {
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        eeeeeeee<br>
        <p>fsdafsda</p>
      </div>
    );
  }
});
React.render(
  <CommentBox />,
  document.getElementById('content')
);
})