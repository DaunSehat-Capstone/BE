-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: daun_sehat
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `guidance_article`
--

DROP TABLE IF EXISTS `guidance_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guidance_article` (
  `guidance_id` int NOT NULL AUTO_INCREMENT,
  `title_guidance` varchar(255) NOT NULL,
  `body_guidance` text NOT NULL,
  `category_guidance` varchar(255) DEFAULT NULL,
  `image_guidance` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`guidance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guidance_article`
--

LOCK TABLES `guidance_article` WRITE;
/*!40000 ALTER TABLE `guidance_article` DISABLE KEYS */;
INSERT INTO `guidance_article` VALUES (1,'How to Start a Blog','This article guides you through the basics of starting a blog...','Blogging','blog_image_1.jpg','2024-11-10 03:30:00'),(2,'Fitness Tips for Beginners','Learn the fundamentals of fitness and how to start your journey...','Health & Fitness','fitness_image_1.jpg','2024-11-12 07:45:00'),(3,'Top 10 Travel Destinations','Explore the most popular travel destinations for 2024...','Travel','travel_image_1.jpg','2024-11-13 01:15:00'),(4,'Investing 101','An introduction to investing, covering the basics...','Finance','investing_image_1.jpg','2024-11-14 02:00:00'),(5,'Healthy Eating Guide','This guide provides tips on maintaining a balanced diet...','Health & Wellness','eating_image_1.jpg','2024-11-14 04:20:00'),(6,'How to Start a Blog','This article guides you through the basics of starting a blog...','Blogging','blog_image_1.jpg','2024-11-10 03:30:00'),(7,'Fitness Tips for Beginners','Learn the fundamentals of fitness and how to start your journey...','Health & Fitness','fitness_image_1.jpg','2024-11-12 07:45:00'),(8,'Top 10 Travel Destinations','Explore the most popular travel destinations for 2024...','Travel','travel_image_1.jpg','2024-11-13 01:15:00'),(9,'Investing 101','An introduction to investing, covering the basics...','Finance','investing_image_1.jpg','2024-11-14 02:00:00'),(10,'Healthy Eating Guide','This guide provides tips on maintaining a balanced diet...','Health & Wellness','eating_image_1.jpg','2024-11-14 04:20:00');
/*!40000 ALTER TABLE `guidance_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_article`
--

DROP TABLE IF EXISTS `user_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_article` (
  `article_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title_article` varchar(255) NOT NULL,
  `body_article` text NOT NULL,
  `image_article` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_article_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_article`
--

LOCK TABLES `user_article` WRITE;
/*!40000 ALTER TABLE `user_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image_url` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=327 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (35,'johndoe@gmail.com','$2b$10$mMeMPJUrGc3k8DBlbciw3.KFLYdKr6GtF6XZQl.ghkWrkTPdJQSOC','Johnnyyabb',NULL),(45,'aulcantik@gmail.com','$2b$10$5IuApSGPbCXK.c9CdkJM6uV6q5eLAWJITaYJKViq.BnzYrElys6j.','Aku Cantik',NULL),(165,'admin@admin.com','$2b$10$AVlQ7DJsergQJlPtqx9P.OZq1kQcr13TsgtXN3eoewyo00iLpSGa.','admin',NULL),(166,'aulganteng@gmail.com','$2b$10$pYTrLuYduZzzmdw01a6YN.CbwiFK2Ur1gN5WAcnUKz2c0Ow6Mkcvi','Aul',NULL),(168,'bgt@gmail.com','$2b$10$wK0du.FqsrWruEfbT.lKy.mTHgGT6bvv6xp13ZRD/HMXg8CIrm4Jy','Aul',NULL),(169,'agshacantik@gmail.com','$2b$10$bDuMIpxMEDcDxkg9nnMuDeolaQtpekWhdFBRKyIwVXD9yCNqi5.S6','Aku Cantik',NULL),(170,'agshaganteng@gmail.com','$2b$10$EDuWRMjFm6Yi7jB1.JSuAeHHPzX0Pt2acUKgtaIGm0mMFP09F.42a','Agsha',NULL);
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

-- Dump completed on 2024-11-26 14:19:43
