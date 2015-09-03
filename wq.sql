-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-09-03 11:53:19
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
  `view` int(11) NOT NULL,
  `attr` varchar(50) NOT NULL,
  `comments` int(11) NOT NULL,
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `cloumn`
--

CREATE TABLE IF NOT EXISTS `cloumn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `uid` int(11) NOT NULL,
  `view` varchar(50) DEFAULT NULL COMMENT '浏览量',
  `count` varchar(50) DEFAULT NULL COMMENT '文章数',
  `care` varchar(50) DEFAULT NULL COMMENT '关注数',
  `is_contribute` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否接受投稿',
  `is_check` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否需要审核',
  `last_time` varchar(20) DEFAULT NULL COMMENT '最新文章的添加时间',
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `cloumn`
--

INSERT INTO `cloumn` (`id`, `title`, `description`, `uid`, `view`, `count`, `care`, `is_contribute`, `is_check`, `last_time`, `addtime`) VALUES
(15, 'dsdasd', 'dsadsad', 0, NULL, NULL, NULL, 1, 1, NULL, '1438521113');

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
  `name` varchar(20) NOT NULL COMMENT '昵称',
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

INSERT INTO `user` (`id`, `name`, `realname`, `password`, `email`, `phone`, `sex`, `city`, `job`, `company`, `github`, `description`, `status`, `token`, `last_login_ip`, `last_login_time`, `addtime`) VALUES
(5, '殷士凯', NULL, '698d51a19d8a121ce581499d7b701668', '1181102772@qq.com', NULL, 0, NULL, '11', NULL, NULL, NULL, 0, NULL, '127.0.0.1', '1439389876', '1438010485');

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
