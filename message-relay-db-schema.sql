-- MariaDB dump 10.19  Distrib 10.5.9-MariaDB, for osx10.15 (x86_64)
--
-- Host: new2020.caqcjwkli3ai.us-east-1.rds.amazonaws.com    Database: mbdb
-- ------------------------------------------------------
-- Server version	5.7.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `detectDel`
--

DROP TABLE IF EXISTS `detectDel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detectDel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s3bucket` varchar(200) DEFAULT NULL,
  `s3key` varchar(1000) DEFAULT NULL,
  `deleted` datetime DEFAULT NULL,
  `sourceip` varchar(20) DEFAULT NULL,
  `principalid` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=172597 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `detectUpdt`
--

DROP TABLE IF EXISTS `detectUpdt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detectUpdt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s3bucket` varchar(200) DEFAULT NULL,
  `s3key` varchar(1000) DEFAULT NULL,
  `changed` datetime DEFAULT NULL,
  `sourceip` varchar(20) DEFAULT NULL,
  `principalid` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=675711 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `failed_messages`
--

DROP TABLE IF EXISTS `failed_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ut` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `msgid` varchar(60) NOT NULL,
  `data` longtext,
  `type` varchar(10) DEFAULT NULL,
  `version` varchar(3) DEFAULT NULL,
  `sourceip` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `msgididx` (`msgid`),
  KEY `mbtypeidx` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `mb_msg_queue`
--

DROP TABLE IF EXISTS `mb_msg_queue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mb_msg_queue` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ut` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `msgid` varchar(60) NOT NULL,
  `type` varchar(10) DEFAULT NULL,
  `version` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `utindex` (`ut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ut` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `msgid` varchar(60) NOT NULL,
  `data` longtext,
  `type` varchar(10) DEFAULT NULL,
  `version` varchar(3) DEFAULT NULL,
  `sourceip` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `msgididx` (`msgid`),
  KEY `mbtypeidx` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=3635902 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `partners`
--

DROP TABLE IF EXISTS `partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partners` (
  `id` varchar(36) NOT NULL,
  `type` varchar(20) NOT NULL,
  `version` varchar(10) NOT NULL,
  `destination` json NOT NULL,
  `sync` varchar(10) DEFAULT NULL,
  `syncdel` varchar(10) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `s3access`
--

DROP TABLE IF EXISTS `s3access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `s3access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `s3bucket` varchar(200) DEFAULT NULL,
  `s3key` varchar(500) DEFAULT NULL,
  `accessed` datetime DEFAULT NULL,
  `userName` varchar(150) DEFAULT NULL,
  `userIdentity` varchar(200) DEFAULT NULL,
  `sourceip` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=193614119 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-13 10:41:36
