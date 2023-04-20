-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: news-system
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `nid` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` char(255) COLLATE utf8mb4_general_ci NOT NULL,
  `isPublish` int NOT NULL,
  `editTime` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `cover` blob NOT NULL,
  `content` longtext COLLATE utf8mb4_general_ci NOT NULL,
  `category` int NOT NULL,
  `authorID` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `showNews` int NOT NULL,
  `cover_file_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '封面存储文件名',
  PRIMARY KEY (`nid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES ('2edc2544a20347509aa902574b0401f3','王者要倒闭了',1,'2023-04-07-22:20:09',_binary '/newsuploads/df82d231a7bba32181ab50c48e2c4e3b','<p>王者坑钱之旅，天美要倒闭了</p>',0,'7',0,'df82d231a7bba32181ab50c48e2c4e3b'),('3074a87bdc344abeb336eb59caf1fe0d','苹果要发布iPhone18',1,'2023-04-08-17:34:08',_binary '/newsuploads/834503ddb7de7eb431d42b92b5db4db2','<p>库克今日推特发布</p>',0,'7',1,'834503ddb7de7eb431d42b92b5db4db2'),('ed3c371d5d4347b98f12dbb12a2c8b17','美军“泄密文件”爆新料　韩国政府高层疑遭美国监听',1,'2023-04-10 20:23:47',_binary '/newsuploads/8710f1fa4aa3467fd2abe9c695c0ac41','<p style=\"text-align: start;\">据新华社消息，据美国《纽约时报》9日报道，在多家社交媒体近来出现的一批疑似美军秘密文件中，包含韩国政府高层讨论是否向乌克兰提供武器等内容，而这些信息来自美国情报部门对韩方的监听。</p><p style=\"text-align: start;\">　　针对上述报道，韩国总统办公室一名官员9日回应，韩方将就此事与美方沟通。</p><p style=\"text-align: start;\">　　近期，推特等多家社交媒体出现一批疑似美军秘密文件，涉及俄乌冲突中乌克兰方面兵力及武器配置、战场地图、俄乌双方伤亡情况等情报，甚至包括标有“绝密”的情报。各方对文件真假看法不一，美国司法部已宣布展开调查。</p><p style=\"text-align: start;\">　　据《纽约时报》报道，这批文件中包含美方监听到韩国政府高层的内部讨论内容。文件显示，面对美国施压，韩国政府内部讨论是否应向乌克兰提供武器。根据韩国官方立场，韩国只向乌克兰提供防弹衣、防毒面具等非致命性军事援助。</p><p style=\"text-align: start;\">　　报道说，韩国已同意向美国供应炮弹以帮助补充弹药库，强调“最终用户”必须是美国。不过，韩国政府内部担忧美国会将韩国生产的炮弹转交乌克兰。</p><p style=\"text-align: start;\">　　按照《纽约时报》的说法，美方根据“信号情报”获知韩国政府内部讨论细节。信号情报是情报机构专用术语，意味着美国一直在监听韩国这一亚洲主要盟友。</p><p style=\"text-align: start;\">　　韩国总统办公室一名官员9日告诉媒体记者，韩方将就相关报道与美方展开必要沟通。这名官员拒绝回答涉美国监听活动相关问题，也拒绝证实文件中任何细节。</p><p style=\"text-align: start;\">　　被问及韩方是否计划向美方提出抗议或要求解释时，这名官员表示，政府将参照先例和其他国家的情况探讨应对措施。</p><p style=\"text-align: start;\">　　按照这名官员的说法，韩国尚未决定是否对乌克兰提供武器，政府在乌克兰问题上的基本立场不变，即不向乌克兰援助致命武器。</p><p style=\"text-align: start;\">　　俄罗斯去年2月对乌克兰发起特别军事行动后，美国和其他北大西洋公约组织成员国陆续向乌克兰提供大量武器，并就此向韩国施压。北约秘书长延斯·斯托尔滕贝格今年1月访问韩国时，以其他原本不愿向乌克兰提供重型武器的国家已转变立场为由，敦促韩国增加对乌军事援助。</p><p style=\"text-align: start;\">　　据路透社上月报道，韩国政府一名官员透露，韩国去年曾向波兰颁发出口许可，批准后者向乌克兰提供使用韩国所产部件的“螃蟹”自行榴弹炮。这是韩方官员首次证实“韩国官方至少对间接向乌克兰提供武器部件持默许态度”。</p><p style=\"text-align: start;\"><br></p><p style=\"text-align: right;\">责任编辑：刘光博</p>',0,'0c45669f61194367942f7d46b4b77bfa',1,'8710f1fa4aa3467fd2abe9c695c0ac41');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `pid` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `productName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `productBrief` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `editTime` datetime NOT NULL,
  `productDescription` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pcover` blob NOT NULL,
  `pcover_file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '产品图片存储文件名',
  `publishID` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isPublish` int NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('0fa7bb4ffeaf4938888bd361e1280f19','iPhone18','M5芯片','2023-04-08 14:29:07','仅需8999',_binary '/productuploads/a103ce1a365f849126236950c9d44544','a103ce1a365f849126236950c9d44544','7',0),('e74bf15016ad4daa9f77f57d8eec9efd','iPhone18','M5芯片','2023-04-08 14:29:27','只需8999',_binary '/productuploads/a62b68eb5ab338a2c8b9d1035713963f','a62b68eb5ab338a2c8b9d1035713963f','7',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `uid` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` int NOT NULL,
  `introduction` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `avatar` blob,
  `avatar_file_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '图片存储的文件名',
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('0c45669f61194367942f7d46b4b77bfa','lisi','123456',-1,'我是中国人',1,_binary '/avataruploads/b88616e7cf15e8a676ebef8898e134de','b88616e7cf15e8a676ebef8898e134de'),('7','admin','admin',0,'发生的',0,_binary '/avataruploads/91475c2753356b5dd34f22720c74ff3a','91475c2753356b5dd34f22720c74ff3a');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-20 20:08:56
