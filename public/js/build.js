({
// appDir: '../',   //项目根目录
// dir: '../build',  //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）

    baseUrl: 'lib',   //相对于appDir，代表要查找js文件的起始文件夹，下文所有文件路径的定义都是基于这个baseUrl的


    fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/,    //过滤，匹配到的文件将不会被输出到输出目录去

    optimizeCss: 'standard',

    removeCombined: true,   //如果为true，将从输出目录中删除已合并的文件

    paths: {
        jquery          : "jquery-1.11.3.min",
        jqueryextend    : "jquery.extend", 
        WQ              : "wq",
        react           : "react-with-addons.min",
        reactRouter     : 'react-router.min',
        home            : "../build/home",
        editormd        : 'editor/editormd',
        prettify        : 'editor/lib/prettify.min',
        codemirror      : 'editor/lib/codemirror/codemirror.min',
        marked          : 'editor/lib/marked.min',
        
        plugins         : 'editor/plugins',
        editorlib       : 'editor/lib',
        editormd        : 'editor/editormd',
        
    },
    
    name: "../build/home/app",

    out: "build/home/app-build.js"

}) 
