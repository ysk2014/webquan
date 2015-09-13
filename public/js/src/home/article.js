requirejs.config({
    baseUrl: '/js/lib',
    paths: {
        jquery          : "jquery-1.11.3.min",
        jqueryextend    : "jquery.extend", 
        WQ              : "WQ",
        react           : "react-with-addons.min",
        reactRouter     : 'react-router.min',
        prettify        : 'editor/lib/prettify.min',
        codemirror      : 'editor/lib/codemirror/codemirror.min',
        marked          : 'editor/lib/marked.min',
        editormd        : 'editor/editormd',
        home            : "../build/home"
    },

    shim: {
        editormd: {
            deps:[ 'jquery','codemirror','marked','prettify'],
            exports:'editormd'
        }
    },

    waitSeconds: 30
});

requirejs([
        'react', 
        'jquery',
        'WQ',
        'codemirror',
        'marked',
        'prettify',
        'editormd'
    ],function(React, $, WQ, Codemirror, marked, prettify, editormd){
        console.log(editormd);
        // WQ.loadScript('/js/lib/editor/editormd',function() {
            // console.log(Codemirror);
            var testEditor = editormd("test-editormd", {
                    width   : "99.5%",
                    height  : 640,
                    // syncScrolling : "single",
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
                    imageUpload: 'true',
                    imageFormats   : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
                    imageUploadURL : "/js/lib/editor/php/upload.php",
                    path    : "/js/lib/editor/lib/"
                });

        // });

                
});