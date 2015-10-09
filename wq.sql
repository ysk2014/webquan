-- MySQL dump 10.13  Distrib 5.6.22, for osx10.8 (x86_64)
--
-- Host: localhost    Database: wq
-- ------------------------------------------------------
-- Server version	5.6.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `uid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `content` text NOT NULL,
  `description` text NOT NULL,
  `logo_dir` text,
  `view` int(11) DEFAULT '0',
  `tags` varchar(50) DEFAULT NULL,
  `comment` int(11) DEFAULT '0',
  `is_publish` int(1) DEFAULT '0',
  `addtime` varchar(20) NOT NULL,
  `praise` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,'测试添加了标签和专题的文章发布',5,3,'测试添加了标签和专题的文章发布\n![](/upload_path/20151004/3c4b0ed7098155099f1d9930ce079dbf.jpg)','测试添加了标签和专题的文章发布','/upload_path/20151004/3c4b0ed7098155099f1d9930ce079dbf.jpg',115,'php',0,0,'1443957910',0);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cloumn`
--

DROP TABLE IF EXISTS `cloumn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cloumn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `count` int(11) DEFAULT '0' COMMENT '文章数',
  `addtime` varchar(20) NOT NULL,
  `uid` int(11) NOT NULL,
  `description` text NOT NULL,
  `view` int(11) DEFAULT '0',
  `care` int(11) DEFAULT '0',
  `update_time` varchar(20) DEFAULT NULL,
  `logo_dir` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cloumn`
--

LOCK TABLES `cloumn` WRITE;
/*!40000 ALTER TABLE `cloumn` DISABLE KEYS */;
INSERT INTO `cloumn` VALUES (1,'测试',0,'1443605747',5,'测试200字',2,0,NULL,''),(2,'测试1',0,'1443614781',5,'测试20202',3,0,NULL,''),(3,'测试2',0,'1443621422',5,'测试2点撒地撒的撒谎对撒地',10,6,NULL,''),(4,'测试3',0,'1443621595',5,'测试3动画i哦啊山东',9,0,NULL,''),(5,'测试logo',0,'1443799942',5,'测试上传专题logo',8,0,NULL,'/upload_path/cloumn-logo/7f724af111f023700b5a3968a21b40b0.jpg');
/*!40000 ALTER TABLE `cloumn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `aid` int(11) NOT NULL,
  `content` text NOT NULL,
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,5,3,'的萨达','1443019987'),(2,5,3,'@殷士凯 测试回复了\n','1443097504'),(3,5,3,'@殷士凯 负担撒','1443097618'),(4,5,3,'@殷士凯 的萨达的撒旦哈市','1443097692'),(5,5,3,'范德萨发范德萨发','1443097745'),(6,5,3,'@殷士凯 的萨达的撒活动','1443098960'),(7,5,3,'萨迪撒旦','1443099021'),(8,5,3,'的撒的大师的撒','1443099087');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `description` text COLLATE utf8_unicode_ci NOT NULL,
  `addtime` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'php','PHP，是英文超文本预处理语言 Hypertext Preprocessor 的缩写。PHP 是一种 HTML 内嵌式的语言，是一种在服务器端执行的嵌入 HTML 文档的脚本语言，语言的风格有类似于C语言，被广泛的运用。','1443954531'),(2,'javascipt','JavaScript 是一门弱类型的动态脚本语言，支持多种编程范式，包括面向对象和函数式编程，被广泛用于 web 开发。','1443955109');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
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
  `logo_dir` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,'殷士凯',NULL,'96e79218965eb72c92a549dd5a330112','1181102772@qq.com',NULL,0,'','UI设计师',NULL,NULL,'',0,NULL,'127.0.0.1','1444191325','1438010485','/upload_path/logo/web5.jpg'),(6,'jie',NULL,'96e79218965eb72c92a549dd5a330112','1181102772@qq.com',NULL,0,NULL,'111',NULL,NULL,NULL,0,NULL,'127.0.0.1','1443866193','1443846251',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_care_cloumn`
--

DROP TABLE IF EXISTS `user_care_cloumn`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_care_cloumn` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `addtime` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_care_cloumn`
--

LOCK TABLES `user_care_cloumn` WRITE;
/*!40000 ALTER TABLE `user_care_cloumn` DISABLE KEYS */;
INSERT INTO `user_care_cloumn` VALUES (19,5,3,'1443846009'),(20,6,3,'1443846261');
/*!40000 ALTER TABLE `user_care_cloumn` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_praise_article`
--

DROP TABLE IF EXISTS `user_praise_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_praise_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `aid` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `addtime` char(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_praise_article`
--

LOCK TABLES `user_praise_article` WRITE;
/*!40000 ALTER TABLE `user_praise_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_praise_article` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-07 20:07:49
