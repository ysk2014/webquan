define([
	'react',
	'jquery',
	'WQ',
	'home/common/leftNav',
	'home/common/userDropMenu',
    'editormd',
    'plugins/image-dialog/image-dialog',
    'plugins/code-block-dialog/code-block-dialog',
    'plugins/link-dialog/link-dialog',
    'plugins/help-dialog/help-dialog',
    'plugins/table-dialog/table-dialog',
    'plugins/test-plugin/test-plugin',
    'plugins/reference-link-dialog/reference-link-dialog',
    'plugins/html-entities-dialog/html-entities-dialog',
    'plugins/preformatted-text-dialog/preformatted-text-dialog',
	],function( React, $, WQ, LeftNav, UserDropMenu, editormd) {


	var mixin = {
		init: function() {
			
		},
		showEditor: function(){
	        var testEditor = editormd("article-editormd", {
                width   : "100%",
                height  : 640,
                imageUpload: 'true',
                imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                imageUploadURL : "/upload",
                path    : "/js/lib/editor/lib/",
                toolbarIcons: function() {
                    return [
                        "undo", "redo", "clear", "|", 
                        "bold", "italic", "quote", "uppercase", "lowercase", "|", 
                        "h1", "h2", "h3", "h4", "h5", "h6", "|", 
                        "list-ul", "list-ol", "hr", "|",
                        "link", "reference-link", "image", "code", "preformatted-text", "code-block", "table", "datetime", "|",
                        "watch", "preview", "fullscreen", "help"
                    ];
                },
	        });
		},
	}

	return React.createClass({
		mixins: [mixin],
		getInitialState: function() {
			return {
				name: 'editArticle',
			}
		},
		componentDidMount: function() {
			this.showEditor();
		},
		render: function() {
			return (
				<div>
					<UserDropMenu />
					<LeftNav active={this.state.name} />

					<div className="edit-article">
						<div className="header">发布文章</div>
						<form>
				            <div className="input-prepend">
				            	<input type="text" name="title" placeholder="文章标题" />
				            </div>
				            <div className="input-prepend">
				            	<textarea name="description" maxLength="200" placeholder="请以200字以内简单描述此内容"></textarea>
				            </div>
							<div id="article-editormd">
								<textarea></textarea>
							</div>
							<a className="submit-button" href="" style={{marginBottom: '10px'}}>提交</a>
						</form>
					</div>
				</div>
			);
		}
	});

});