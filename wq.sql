-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-09-25 16:56:22
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `wq`
--

-- --------------------------------------------------------

--
-- 表的结构 `article`
--

CREATE TABLE IF NOT EXISTS `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `uid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `content` text NOT NULL,
  `description` text NOT NULL,
  `logo_dir` text NOT NULL,
  `view` int(11) DEFAULT '0',
  `care` tinyint(1) DEFAULT '0',
  `comment` int(11) DEFAULT '0',
  `is_publish` int(1) DEFAULT '0',
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `uid`, `cid`, `content`, `description`, `logo_dir`, `view`, `care`, `comment`, `is_publish`, `addtime`) VALUES

(1, '测试', 5, 27, '![](/upload_path/20150920/4c46d21a9436192d4016c17fe4a4a191.png)\n![](/upload_path/20150920/71c4a24c3242f9618b3a04fcb1ff7a20.jpg)', '的萨达', '/upload_path/20150920/4c46d21a9436192d4016c17fe4a4a191.png', 109, 0, 5, 0, '1442714041'),
(2, 'Markdown语法教程 (Markdo', 5, 20, '##### Markdown语法教程 (Markdown syntax tutorial)\n\n- [Markdown Syntax](http://daringfireball.net/projects/markdown/syntax/ "Markdown Syntax")\n- [Mastering Markdown](https://guides.github.com/features/mastering-markdown/ "Mastering Markdown")\n- [Markdown Basics](https://help.github.com/articles/markdown-basics/ "Markdown Basics")\n- [GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/ "GitHub Flavored Markdown")\n- [Markdown 语法说明（简体中文）](http://www.markdown.cn/ "Markdown 语法说明（简体中文）")\n- [Markdown 語法說明（繁體中文）](http://markdown.tw/ "Markdown 語法說明（繁體中文）")\n![](/upload_path/20150922/7f9e8167a3a9072387934ac5991366a2.png)\n##### 键盘快捷键 (Keyboard shortcuts)\n\n> If Editor.md code editor is on focus, you can use keyboard shortcuts.\n    \n| Keyboard shortcuts (键盘快捷键)                 |   说明                            | Description                                        |\n| :---------------------------------------------- |:--------------------------------- | :------------------------------------------------- |\n| F9                                              | 切换实时预览                      | Switch watch/unwatch                               |\n| F10                                             | 全屏HTML预览(按 Shift + ESC 退出) | Full preview HTML (Press Shift + ESC exit)         |\n| F11                                             | 切换全屏状态                      | Switch fullscreen (Press ESC exit)                 |\n| Ctrl + 1~6 / Command + 1~6                      | 插入标题1~6                       | Insert heading 1~6                                 |\n| Ctrl + A / Command + A                          | 全选                              | Select all                                         |\n| Ctrl + B / Command + B                          | 插入粗体                          | Insert bold                                        |\n| Ctrl + D / Command + D                          | 插入日期时间                      | Insert datetime                                    |\n| Ctrl + E / Command + E                          | 插入Emoji符号                     | Insert &#58;emoji&#58;                             |\n| Ctrl + F / Command + F                          | 查找/搜索                         | Start searching                                    |\n| Ctrl + G / Command + G                          | 切换到下一个搜索结果项            | Find next search results                           |\n| Ctrl + H / Command + H                          | 插入水平线                        | Insert horizontal rule                             |\n| Ctrl + I / Command + I                          | 插入斜体                          | Insert italic                                      |\n| Ctrl + K / Command + K                          | 插入行内代码                      | Insert inline code                                 |\n| Ctrl + L / Command + L                          | 插入链接                          | Insert link                                        |\n| Ctrl + U / Command + U                          | 插入无序列表                      | Insert unordered list                              |\n| Ctrl + Q                                        | 代码折叠切换                      | Switch code fold                                   |\n| Ctrl + Z / Command + Z                          | 撤销                              | Undo                                               |\n| Ctrl + Y / Command + Y                          | 重做                              | Redo                                               |\n| Ctrl + Shift + A                                | 插入@链接                         | Insert &#64;link                                   |\n| Ctrl + Shift + C                                | 插入行内代码                      | Insert inline code                                 |\n| Ctrl + Shift + E                                | 打开插入Emoji表情对话框           | Open emoji dialog                                  |\n| Ctrl + Shift + F / Command + Option + F         | 替换                              | Replace                                            |\n| Ctrl + Shift + G / Shift + Command + G          | 切换到上一个搜索结果项            | Find previous search results                       |\n| Ctrl + Shift + H                                | 打开HTML实体字符对话框            | Open HTML Entities dialog                          |\n| Ctrl + Shift + I                                | 插入图片                          | Insert image &#33;[]&#40;&#41;                     |\n| Ctrl + Shift + K                                | 插入TeX(KaTeX)公式符号            | Insert TeX(KaTeX) symbol &#36;&#36;TeX&#36;&#36;   |\n| Ctrl + Shift + L                                | 打开插入链接对话框                | Open link dialog                                   |\n| Ctrl + Shift + O                                | 插入有序列表                      | Insert ordered list                                |\n| Ctrl + Shift + P                                | 打开插入PRE对话框                 | Open Preformatted text dialog                      |\n| Ctrl + Shift + Q                                | 插入引用                          | Insert blockquotes                                 |\n| Ctrl + Shift + R / Shift + Command + Option + F | 全部替换                          | Replace all                                        |\n| Ctrl + Shift + S                                | 插入删除线                        | Insert strikethrough                               |\n| Ctrl + Shift + T                                | 打开插入表格对话框                | Open table dialog                                  |\n| Ctrl + Shift + U                                | 将所选文字转成大写                | Selection text convert to uppercase                |\n| Shift + Alt + C                                 | 插入```代码                       | Insert code blocks (```)                           |\n| Shift + Alt + H                                 | 打开使用帮助对话框                | Open help dialog                                   |\n| Shift + Alt + L                                 | 将所选文本转成小写                | Selection text convert to lowercase                |\n| Shift + Alt + P                                 | 插入分页符                        | Insert page break                                  |\n| Alt + L                                         | 将所选文本转成小写                | Selection text convert to lowercase                |\n| Shift + Alt + U                                 | 将所选的每个单词的首字母转成大写  | Selection words first letter convert to Uppercase  |\n| Ctrl + Shift + Alt + C                          | 打开插入代码块对话框层            | Open code blocks dialog                            |\n| Ctrl + Shift + Alt + I                          | 打开插入图片对话框层              | Open image dialog                                  |\n| Ctrl + Shift + Alt + U                          | 将所选文本的第一个首字母转成大写  | Selection text first letter convert to uppercase   |\n| Ctrl + Alt + G                                  | 跳转到指定的行                    | Goto line                                          |\n\n', 'Markdown语法教程 (Markdown syntax tutorial)', '/upload_path/20150922/7f9e8167a3a9072387934ac5991366a2.png', 13, 0, 0, 0, '1442935804'),
(3, '测试', 5, 27, '![](/upload_path/20150923/aed50e3e66c3d90f89814a7edff9f90d.png)', '测试', '/upload_path/20150923/aed50e3e66c3d90f89814a7edff9f90d.png', 73, 0, 8, 0, '1442966510');

-- --------------------------------------------------------

--
-- 表的结构 `cloumn`
--

CREATE TABLE IF NOT EXISTS `cloumn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `count` int(11) DEFAULT '0' COMMENT '文章数',
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=28 ;

--
-- 转存表中的数据 `cloumn`
--

INSERT INTO `cloumn` (`id`, `title`, `count`, `addtime`) VALUES
(20, 'HTML5', 0, '1442646830'),
(21, 'CSS3', 0, '1442646974'),
(22, 'JavaScript', 0, '1442646989'),
(24, 'NodeJs', 0, '1442647024'),
(25, 'PHP', 0, '1442647038'),
(26, 'Python', 0, '1442647052'),
(27, 'Java', 0, '1442647063');

-- --------------------------------------------------------

--
-- 表的结构 `comment`
--

CREATE TABLE IF NOT EXISTS `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `content` text NOT NULL,
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=11 ;

--
-- 转存表中的数据 `comment`
--

INSERT INTO `comment` (`id`, `uid`, `aid`, `content`, `addtime`) VALUES
(1, 5, 3, '的萨达', '1443019987'),
(2, 5, 3, '@殷士凯 测试回复了\n', '1443097504'),
(3, 5, 3, '@殷士凯 负担撒', '1443097618'),
(4, 5, 3, '@殷士凯 的萨达的撒旦哈市', '1443097692'),
(5, 5, 3, '范德萨发范德萨发', '1443097745'),
(6, 5, 3, '@殷士凯 的萨达的撒活动', '1443098960'),
(7, 5, 3, '萨迪撒旦', '1443099021'),
(8, 5, 3, '的撒的大师的撒', '1443099087');

-- --------------------------------------------------------

--
-- 表的结构 `team`
--

CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL COMMENT '昵称',
  `realname` varchar(20) DEFAULT NULL COMMENT '真实姓名',
  `password` varchar(50) NOT NULL,
  `email` varchar(20) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `sex` tinyint(1) NOT NULL DEFAULT '0',
  `city` varchar(50) DEFAULT NULL COMMENT '所在城市',
  `job` varchar(50) NOT NULL COMMENT '职位',
  `company` varchar(50) DEFAULT NULL COMMENT '公司',
  `github` varchar(50) DEFAULT NULL,
  `description` text,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '前后台身份',
  `token` varchar(20) DEFAULT NULL,
  `last_login_ip` varchar(20) DEFAULT NULL COMMENT '最后登陆的ip',
  `last_login_time` varchar(20) DEFAULT NULL COMMENT '最后登陆的时间',
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `realname`, `password`, `email`, `phone`, `sex`, `city`, `job`, `company`, `github`, `description`, `status`, `token`, `last_login_ip`, `last_login_time`, `addtime`) VALUES
(5, '殷士凯', NULL, '96e79218965eb72c92a549dd5a330112', '1181102772@qq.com', NULL, 0, NULL, '11', NULL, NULL, NULL, 0, NULL, '127.0.0.1', '1443104188', '1438010485');

-- --------------------------------------------------------

--
-- 表的结构 `user_care_cloumn`
--

CREATE TABLE IF NOT EXISTS `user_care_cloumn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
