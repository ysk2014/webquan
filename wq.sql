-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-09-20 12:50:07
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
  `title` varchar(20) NOT NULL,
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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- 转存表中的数据 `article`
--

INSERT INTO `article` (`id`, `title`, `uid`, `cid`, `content`, `description`, `logo_dir`, `view`, `care`, `comment`, `is_publish`, `addtime`) VALUES
(1, '测试', 5, 27, '![](/upload_path/20150920/4c46d21a9436192d4016c17fe4a4a191.png)', '的萨达', '/upload_path/20150920/4c46d21a9436192d4016c17fe4a4a191.png', 83, 0, 0, 0, '1442714041');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

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
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `realname`, `password`, `email`, `phone`, `sex`, `city`, `job`, `company`, `github`, `description`, `status`, `token`, `last_login_ip`, `last_login_time`, `addtime`) VALUES
(5, '殷士凯', NULL, '96e79218965eb72c92a549dd5a330112', '1181102772@qq.com', NULL, 0, NULL, '11', NULL, NULL, NULL, 0, NULL, '127.0.0.1', '1442728589', '1438010485');

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
