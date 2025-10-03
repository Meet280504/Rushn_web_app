-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: e_commerce
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banks`
--

DROP TABLE IF EXISTS `banks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banks` (
  `bank_id` int NOT NULL AUTO_INCREMENT,
  `method_id` bigint NOT NULL,
  `name` varchar(150) NOT NULL,
  `method_type` enum('bank_transfer') DEFAULT 'bank_transfer',
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bank_id`),
  UNIQUE KEY `name` (`name`),
  KEY `method_id` (`method_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `banks_ibfk_1` FOREIGN KEY (`method_id`) REFERENCES `payment_methods` (`method_id`) ON DELETE CASCADE,
  CONSTRAINT `banks_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banks`
--

LOCK TABLES `banks` WRITE;
/*!40000 ALTER TABLE `banks` DISABLE KEYS */;
INSERT INTO `banks` VALUES (1,1,'BOB','bank_transfer',1,4,'2025-09-17 13:16:16'),(2,1,'SBI','bank_transfer',1,4,'2025-09-17 13:16:29'),(3,1,'CENTRAL BANK OF INDIA','bank_transfer',1,4,'2025-09-17 13:16:43'),(4,1,'HDFC Bank','bank_transfer',1,4,'2025-09-17 13:16:56'),(5,1,'ICICI','bank_transfer',1,4,'2025-09-17 13:17:02'),(6,1,'AXIS BANK','bank_transfer',1,4,'2025-09-17 13:17:18'),(7,1,'Canara Bank','bank_transfer',1,4,'2025-09-17 13:17:56');
/*!40000 ALTER TABLE `banks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_by` int NOT NULL,
  `updated_by` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  KEY `user_id` (`user_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `categories_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `categories_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'RUNNING','C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-1.png',4,4,NULL,'2025-09-15 07:45:49','2025-09-15 07:45:49'),(2,'CYCLING','C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-2.png',4,4,NULL,'2025-09-15 07:46:20','2025-09-15 07:46:20'),(3,'sports','icon-8.png',4,4,4,'2025-09-15 07:46:29','2025-09-26 08:47:12'),(4,'GYM','C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-4.png',4,4,NULL,'2025-09-15 07:46:37','2025-09-15 07:46:37'),(5,'BASKET','C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-5.png',4,4,NULL,'2025-09-15 07:46:49','2025-09-15 07:46:49'),(6,'FOOTBALL','C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-6.png',4,4,NULL,'2025-09-15 07:46:58','2025-09-15 07:46:58'),(7,'PADEL','C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-7.png',4,4,NULL,'2025-09-15 07:47:11','2025-09-15 07:47:11'),(8,'MORE','C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-8.png',4,4,NULL,'2025-09-15 07:47:19','2025-09-15 07:47:19'),(11,'RUNNING','1759216566322.jpeg',4,4,4,'2025-09-30 07:08:02','2025-09-30 07:16:06');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_debit_card`
--

DROP TABLE IF EXISTS `credit_debit_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit_debit_card` (
  `card_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `method_id` bigint NOT NULL,
  `method_type` enum('card') DEFAULT 'card',
  `card_number` varchar(50) NOT NULL,
  `cardholder_name` varchar(100) NOT NULL,
  `expiry_date` char(50) NOT NULL,
  `security_code` varchar(4) NOT NULL,
  `billing_address` text,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`card_id`),
  UNIQUE KEY `uq_user_card` (`user_id`,`card_number`),
  KEY `method_id` (`method_id`),
  CONSTRAINT `credit_debit_card_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `credit_debit_card_ibfk_2` FOREIGN KEY (`method_id`) REFERENCES `payment_methods` (`method_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_debit_card`
--

LOCK TABLES `credit_debit_card` WRITE;
/*!40000 ALTER TABLE `credit_debit_card` DISABLE KEYS */;
INSERT INTO `credit_debit_card` VALUES (1,2,2,NULL,'4111111111111111','Bhavya Shah','12/2028','123','123 MG Road, Mumbai, India',1,'2025-09-18 12:26:25','2025-09-18 12:26:25'),(2,2,2,NULL,'2222 0055 3366 7596','Vipul K Shah','12/2026','123','123 MG Road, Mumbai, India',1,'2025-09-18 12:27:39','2025-09-18 12:27:39'),(3,2,2,NULL,'2222 0055 5623 7896','Bhavna K Shah','12/2025','123','123 MG Road, Mumbai, India',1,'2025-09-18 12:28:01','2025-09-18 12:28:01'),(5,1,2,NULL,'5050 4696 4582 6352','Rahul Patel','10/2028','123','Katargam, Surat, India',0,'2025-09-18 12:30:57','2025-09-18 12:30:57'),(7,1,2,NULL,'5050 4696 4582 6452','Neha Patel','10/2026','123','Katargam, Surat, Gujarat',0,'2025-09-26 09:33:09','2025-09-26 09:36:50');
/*!40000 ALTER TABLE `credit_debit_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ewallet_providers`
--

DROP TABLE IF EXISTS `ewallet_providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ewallet_providers` (
  `provider_id` int NOT NULL AUTO_INCREMENT,
  `method_id` bigint NOT NULL,
  `name` varchar(100) NOT NULL,
  `method_type` enum('wallet') DEFAULT 'wallet',
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`provider_id`),
  UNIQUE KEY `name` (`name`),
  KEY `method_id` (`method_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `ewallet_providers_ibfk_1` FOREIGN KEY (`method_id`) REFERENCES `payment_methods` (`method_id`) ON DELETE CASCADE,
  CONSTRAINT `ewallet_providers_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ewallet_providers`
--

LOCK TABLES `ewallet_providers` WRITE;
/*!40000 ALTER TABLE `ewallet_providers` DISABLE KEYS */;
INSERT INTO `ewallet_providers` VALUES (1,3,'PayPal','wallet',1,4,'2025-09-17 12:12:44','2025-09-17 12:12:44'),(2,3,'Gopay','wallet',1,4,'2025-09-17 12:14:35','2025-09-17 12:14:35'),(3,3,'OVO','wallet',1,4,'2025-09-17 12:14:42','2025-09-17 12:14:42');
/*!40000 ALTER TABLE `ewallet_providers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flash_sale`
--

DROP TABLE IF EXISTS `flash_sale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flash_sale` (
  `sale_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `sale_title` varchar(255) NOT NULL,
  `created_by` int NOT NULL,
  `updated_by` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sale_id`),
  KEY `user_id` (`user_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `flash_sale_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `flash_sale_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `flash_sale_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flash_sale`
--

LOCK TABLES `flash_sale` WRITE;
/*!40000 ALTER TABLE `flash_sale` DISABLE KEYS */;
INSERT INTO `flash_sale` VALUES (2,4,'TODAY\'S PICK',4,NULL,'2025-09-24 09:07:10','2025-09-24 09:07:10'),(3,4,'LAST CHANCE PICKS',4,NULL,'2025-09-24 09:07:30','2025-09-24 09:07:30'),(4,4,'RECENTLY VIEWED',4,NULL,'2025-09-24 09:07:54','2025-09-24 09:07:54'),(5,4,'SPORTS',4,NULL,'2025-09-24 09:08:00','2025-09-24 09:08:00'),(6,4,'Flash Sale on Groceries',4,NULL,'2025-09-24 09:34:29','2025-09-24 09:34:29'),(7,4,'Weekend Special - Buy 1 Get 1',4,NULL,'2025-09-24 09:35:01','2025-09-24 09:35:01'),(8,4,'Diwali Mega Flash Sale',4,NULL,'2025-09-24 09:35:24','2025-09-24 09:35:24'),(9,4,'New Year Electronics Blast',4,NULL,'2025-09-24 09:35:34','2025-09-24 09:35:34');
/*!40000 ALTER TABLE `flash_sale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flash_sale_items`
--

DROP TABLE IF EXISTS `flash_sale_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flash_sale_items` (
  `sale_item_id` int NOT NULL AUTO_INCREMENT,
  `sale_id` int NOT NULL,
  `shoes_id` int NOT NULL,
  `discount` decimal(5,2) DEFAULT '0.00',
  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` int NOT NULL,
  `updated_by` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sale_item_id`),
  KEY `sale_id` (`sale_id`),
  KEY `shoes_id` (`shoes_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `flash_sale_items_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `flash_sale` (`sale_id`) ON DELETE CASCADE,
  CONSTRAINT `flash_sale_items_ibfk_2` FOREIGN KEY (`shoes_id`) REFERENCES `shoes` (`shoes_id`) ON DELETE CASCADE,
  CONSTRAINT `flash_sale_items_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `flash_sale_items_ibfk_4` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flash_sale_items`
--

LOCK TABLES `flash_sale_items` WRITE;
/*!40000 ALTER TABLE `flash_sale_items` DISABLE KEYS */;
INSERT INTO `flash_sale_items` VALUES (1,2,1,30.00,'2025-09-17 10:00:00','2025-09-17 23:59:59',1,4,NULL,'2025-09-17 09:35:06','2025-09-17 09:35:06'),(2,2,2,30.00,'2025-09-17 10:00:00','2025-09-17 23:59:59',1,4,NULL,'2025-09-17 09:35:56','2025-09-17 09:35:56'),(3,2,4,20.00,'2025-09-17 10:00:00','2025-09-17 23:59:59',1,4,NULL,'2025-09-17 09:36:05','2025-09-17 09:36:05'),(4,3,3,30.00,'2025-09-17 10:00:00','2025-09-17 23:59:59',1,4,NULL,'2025-09-17 09:36:38','2025-09-17 09:36:38'),(5,3,3,10.00,'2025-09-17 10:00:00','2025-09-17 23:59:59',1,4,NULL,'2025-09-17 09:36:42','2025-09-17 09:36:42'),(7,3,3,40.00,'2025-09-17 10:00:00','2025-09-17 23:59:59',1,4,NULL,'2025-09-17 09:45:05','2025-09-17 09:45:05'),(8,3,3,40.00,'2025-09-24 10:00:00','2025-09-24 23:59:59',1,4,NULL,'2025-09-24 13:53:44','2025-09-24 13:53:44'),(9,8,3,40.00,'2025-09-24 10:00:00','2025-09-24 23:59:59',1,4,NULL,'2025-09-24 13:54:02','2025-09-24 13:54:02'),(10,5,3,30.00,'2025-09-25 10:00:00','2025-09-25 23:59:59',1,4,NULL,'2025-09-24 13:54:05','2025-09-24 13:58:56'),(11,6,3,40.00,'2025-09-24 10:00:00','2025-09-24 23:59:59',1,4,NULL,'2025-09-24 13:54:08','2025-09-24 13:54:08'),(13,5,3,40.00,'2025-09-24 10:00:00','2025-09-24 23:59:59',1,4,NULL,'2025-09-26 09:27:40','2025-09-26 09:27:40');
/*!40000 ALTER TABLE `flash_sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `new_arrivals`
--

DROP TABLE IF EXISTS `new_arrivals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `new_arrivals` (
  `arrival_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_name` varchar(50) NOT NULL,
  `product_category` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_by` int NOT NULL,
  `updated_by` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`arrival_id`),
  KEY `user_id` (`user_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `new_arrivals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `new_arrivals_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `new_arrivals_ibfk_3` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `new_arrivals`
--

LOCK TABLES `new_arrivals` WRITE;
/*!40000 ALTER TABLE `new_arrivals` DISABLE KEYS */;
INSERT INTO `new_arrivals` VALUES (1,4,'Sepatu Superstar','Manshoes','../assets/S2.png',4,NULL,'2025-09-15 12:44:56','2025-09-15 12:44:56'),(2,4,'Sneakers UltraBoost','Running shoes','../assets/S2.png',4,NULL,'2025-09-15 12:48:18','2025-09-15 12:48:18'),(3,4,'Kicks Air Max','Lifestyle shoes','../assets/S2.png',4,NULL,'2025-09-15 12:48:55','2025-09-15 12:48:55'),(5,4,'Boots Timberland','Outdoor shoes','../assets/S2.png',4,NULL,'2025-09-15 12:59:49','2025-09-15 12:59:49'),(7,4,'Campus Shoes','RUnning Shoes','../assets/S6.png',4,4,'2025-09-26 08:57:32','2025-09-26 08:59:58');
/*!40000 ALTER TABLE `new_arrivals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `shoes_id` int NOT NULL,
  `voucher_id` bigint DEFAULT NULL,
  `shoe_name` varchar(255) NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `total_amount` decimal(10,2) DEFAULT '0.00',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `shoes_id` (`shoes_id`),
  KEY `fk_voucher` (`voucher_id`),
  CONSTRAINT `fk_voucher` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`voucher_id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`shoes_id`) REFERENCES `shoes` (`shoes_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,1,NULL,'Air Max 90','card','shipped',2450.00,'2025-09-19 12:39:19','2025-09-26 11:20:11'),(3,2,3,NULL,'NIKE AIR MAX 270','bank transfer','Pending',4000.00,'2025-09-19 12:41:04','2025-09-19 12:41:04'),(4,1,3,NULL,'NIKE AIR MAX 270','bank transfer','Pending',4000.00,'2025-09-19 12:42:03','2025-09-19 12:42:03'),(5,1,1,NULL,'AIR MAX 90','bank transfer','Pending',2200.00,'2025-09-19 12:42:20','2025-09-19 12:42:20'),(7,1,6,NULL,'RS-X3','wallet','Pending',450.00,'2025-09-19 12:43:01','2025-09-19 12:43:01'),(8,1,3,NULL,'PUMA','AIR MAX 270','Pending',4000.00,'2025-09-22 09:48:24','2025-09-22 09:48:24'),(9,1,3,NULL,'PUMA','bank transfer','Pending',4000.00,'2025-09-22 11:48:53','2025-09-22 11:48:53'),(10,1,3,NULL,'PUMA','bank_transfer','Pending',4000.00,'2025-09-22 11:49:35','2025-09-22 11:49:35'),(11,1,3,2,'ADIDAS ULTRABOOST','bank_transfer','Pending',1300.00,'2025-09-22 13:01:09','2025-09-22 13:01:09');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `method_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon_url` varchar(255) DEFAULT NULL,
  `method_type` enum('bank_transfer','card','wallet') NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`method_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `payment_methods_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'Virtual Account','Pay via bank transfer or VA number','.../assets/bank Icon.png','bank_transfer',1,4,'2025-09-16 11:41:10','2025-09-16 11:41:10'),(2,'Creadit / Debit Card','Use Visa, Mastercard, etc.','.../assets/Card Icon.png','card',1,4,'2025-09-16 11:42:32','2025-09-16 11:42:32'),(3,'Digital Wallet','Pay with digital wallets','.../assets/Wallet Icon.png','wallet',1,4,'2025-09-16 11:43:32','2025-09-16 11:43:32');
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `order_id` int NOT NULL,
  `method_id` bigint NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `status` enum('pending','completed','failed','cancelled') DEFAULT 'pending',
  `transaction_ref` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `method_id` (`method_id`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`method_id`) REFERENCES `payment_methods` (`method_id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `payments_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,4,1,1,2450.00,'completed','TXN123456789','2025-09-23 09:16:34','2025-09-23 09:16:34'),(2,4,3,3,4000.00,'completed','TXN1234567589','2025-09-23 09:17:19','2025-09-23 09:17:19'),(3,4,4,3,4000.00,'pending','TXN123485843','2025-09-23 09:17:37','2025-09-23 09:17:37'),(4,4,5,2,2200.00,'failed','TXN958562341','2025-09-23 09:18:25','2025-09-23 09:18:25'),(5,4,7,2,450.00,'completed','TXN958765214','2025-09-23 09:18:49','2025-09-23 09:18:49'),(7,4,11,3,1300.00,'completed','TXN562384197','2025-09-26 11:22:11','2025-09-26 11:23:44');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `shoes_id` int NOT NULL,
  `review_text` text NOT NULL,
  `rating` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `shoes_id` (`shoes_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`shoes_id`) REFERENCES `shoes` (`shoes_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,2,1,'Super comfortable shoes',5,'2025-09-25 13:17:52','2025-09-25 13:17:52'),(2,2,3,'Better Shoes!',5,'2025-09-25 13:18:35','2025-09-25 13:18:35'),(3,2,5,'Average!!',3,'2025-09-25 13:19:30','2025-09-25 13:19:30'),(4,1,2,'Best Shoes!!',5,'2025-09-25 13:20:35','2025-09-25 13:20:35'),(5,1,3,'Best Shoes!!',5,'2025-09-25 13:20:48','2025-09-25 13:20:48'),(6,1,4,'Good Product',4,'2025-09-25 13:21:16','2025-09-25 13:21:16'),(7,1,5,'Good Product',4,'2025-09-25 13:21:21','2025-09-25 13:21:21'),(8,3,5,'Better Product',4,'2025-09-25 13:22:27','2025-09-25 13:22:27'),(10,3,6,'After 1 month of use, still holding up very well!',4,'2025-09-26 11:24:18','2025-09-26 11:27:01');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_address`
--

DROP TABLE IF EXISTS `shipping_address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `address_label` varchar(100) DEFAULT NULL,
  `recipient_name` varchar(150) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `full_address` text NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `shipping_address_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_address`
--

LOCK TABLES `shipping_address` WRITE;
/*!40000 ALTER TABLE `shipping_address` DISABLE KEYS */;
INSERT INTO `shipping_address` VALUES (1,1,'Home','Neha Patel','+44 1234567890','123 Street, London, E12 3AB, UK',1,'2025-09-19 09:31:03','2025-09-19 09:31:03'),(3,1,'Office','Neha Patel','+44 5689213450','London, E12 3AB, UK',0,'2025-09-19 09:34:53','2025-09-19 09:34:53'),(4,2,'Home','Bhavya Shah','+91 7771089068','Prahladnagar, satellite, Ahmedabad',1,'2025-09-19 11:17:08','2025-09-19 11:17:08'),(5,2,'Office','Bhavya Shah','+91 7771089068','Sola, Ahmedabad',0,'2025-09-19 11:42:34','2025-09-19 11:42:34'),(6,2,'Home','Neha Patel','+91 8485991466','Maninagar, Ahmedabad',0,'2025-09-26 11:14:33','2025-09-26 11:16:22');
/*!40000 ALTER TABLE `shipping_address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoes`
--

DROP TABLE IF EXISTS `shoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoes` (
  `shoes_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `user_id` int NOT NULL,
  `brand_name` varchar(50) NOT NULL,
  `brand_logo` varchar(255) DEFAULT NULL,
  `shoe_name` varchar(100) NOT NULL,
  `shoe_description` varchar(255) DEFAULT NULL,
  `original_price` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) DEFAULT '0.00',
  `image_url` varchar(255) DEFAULT NULL,
  `created_by` int NOT NULL,
  `updated_by` int DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`shoes_id`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  KEY `created_by` (`created_by`),
  KEY `updated_by` (`updated_by`),
  CONSTRAINT `shoes_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE,
  CONSTRAINT `shoes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `shoes_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `shoes_ibfk_4` FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoes`
--

LOCK TABLES `shoes` WRITE;
/*!40000 ALTER TABLE `shoes` DISABLE KEYS */;
INSERT INTO `shoes` VALUES (1,1,4,'NIKE','/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-8.png','AIR MAX 90','The Air Max 90 LV8 takes your favourite silhouette to the next level with stacked Nike Air units.',2700.00,1500.00,10.00,'C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/S1.png',4,4,'2025-09-15 08:29:59','2025-09-15 08:29:59'),(2,8,4,'ADIDAS','/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-8.png','Sepatu Superstar','The Air Max 90 LV8 takes your favourite silhouette to the next level with stacked Nike Air units.',6000.00,4000.00,30.00,'C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/S2.png',4,4,'2025-09-15 08:32:12','2025-09-15 08:32:12'),(3,1,4,'PUMA','/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-8.png','NIKE AIR MAX 270','The Air Max 90 LV8 takes your favourite silhouette to the next level with stacked Nike Air units.',5000.00,4000.00,20.00,'C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/S3.png',4,4,'2025-09-15 08:32:52','2025-09-15 08:32:52'),(4,2,4,'ADIDAS','/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-8.png','ADIDAS ULTRABOOST','The Air Max 90 LV8 takes your favourite silhouette to the next level with stacked Nike Air units.',2000.00,1800.00,10.00,'C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/S4.png',4,4,'2025-09-15 08:33:41','2025-09-15 08:33:41'),(5,2,4,'ASIAN','/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-8.png','CHUCK TAYLOR ALL STAR','The Air Max 90 LV8 takes your favourite silhouette to the next level with stacked Nike Air units.',2000.00,1800.00,10.00,'C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/S5.png',4,4,'2025-09-15 08:34:17','2025-09-15 08:34:17'),(6,4,4,'NIKE','/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-4.png','RS-X3','The Air Max 90 LV8 takes your favourite silhouette to the next level with stacked Nike Air units.',1800.00,450.00,25.00,'C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/S6.png',4,4,'2025-09-15 08:35:27','2025-09-15 08:35:27'),(8,6,4,'NIKE','/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/logo-4.png','RS','The Air Max 90 LV8 takes your favourite silhouette to the next level with stacked Nike Air units.',3000.00,450.00,25.00,'C:/Users/urvi/Desktop/ecommerce/ecommerce/ecommerce/Assets/S6.png',4,4,'2025-09-26 08:49:48','2025-09-26 08:52:23');
/*!40000 ALTER TABLE `shoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoes_colors`
--

DROP TABLE IF EXISTS `shoes_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoes_colors` (
  `color_id` int NOT NULL AUTO_INCREMENT,
  `shoes_id` int NOT NULL,
  `color_name` varchar(50) NOT NULL,
  `color_code` varchar(20) DEFAULT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`color_id`),
  KEY `shoes_id` (`shoes_id`),
  CONSTRAINT `shoes_colors_ibfk_1` FOREIGN KEY (`shoes_id`) REFERENCES `shoes` (`shoes_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoes_colors`
--

LOCK TABLES `shoes_colors` WRITE;
/*!40000 ALTER TABLE `shoes_colors` DISABLE KEYS */;
INSERT INTO `shoes_colors` VALUES (1,1,'Warm Grey','#8B7B7B','../assets/S1P1.png','2025-09-15 12:08:49','2025-09-15 12:08:49'),(2,1,'Lavender/Light Purple','#AB92B5','../assets/S1P2.png','2025-09-15 12:09:48','2025-09-15 12:09:48'),(3,1,'Slate Grey/Blue Grey','#5A646C','../assets/S1P3.png','2025-09-15 12:10:21','2025-09-15 12:10:21'),(4,1,'Light Grey/Silver','#C9C6C0','../assets/S1P4.png','2025-09-15 12:10:49','2025-09-15 12:10:49'),(6,1,'Beige/Sand','#BDAA87','../assets/S1P5.png','2025-09-15 12:16:25','2025-09-15 12:16:25');
/*!40000 ALTER TABLE `shoes_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoes_image`
--

DROP TABLE IF EXISTS `shoes_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shoes_image` (
  `shoes_image_id` int NOT NULL AUTO_INCREMENT,
  `shoes_id` int NOT NULL,
  `extra_image` varchar(255) DEFAULT NULL,
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`shoes_image_id`),
  KEY `shoes_id` (`shoes_id`),
  CONSTRAINT `shoes_image_ibfk_1` FOREIGN KEY (`shoes_id`) REFERENCES `shoes` (`shoes_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoes_image`
--

LOCK TABLES `shoes_image` WRITE;
/*!40000 ALTER TABLE `shoes_image` DISABLE KEYS */;
INSERT INTO `shoes_image` VALUES (1,1,'../assets/Product_image_1',4,'2025-09-22 13:54:51','2025-09-22 13:54:51'),(2,1,'../assets/Product_image_2',4,'2025-09-22 13:55:06','2025-09-22 13:55:06'),(3,1,'../assets/Product_image_3',4,'2025-09-22 13:55:09','2025-09-22 13:55:09'),(4,1,'../assets/mix_match_image',4,'2025-09-22 13:55:27','2025-09-22 13:55:27'),(5,2,'../assets/S2.png',4,'2025-09-22 13:55:53','2025-09-22 13:55:53'),(7,2,'../assets/S3.png',4,'2025-09-26 11:20:34','2025-09-26 11:20:34');
/*!40000 ALTER TABLE `shoes_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ewallets`
--

DROP TABLE IF EXISTS `user_ewallets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ewallets` (
  `user_ewallet_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `provider_id` int NOT NULL,
  `method_id` bigint NOT NULL,
  `method_type` enum('wallet') DEFAULT 'wallet',
  `email` varchar(150) NOT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_ewallet_id`),
  KEY `provider_id` (`provider_id`),
  KEY `method_id` (`method_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_ewallets_ibfk_1` FOREIGN KEY (`provider_id`) REFERENCES `ewallet_providers` (`provider_id`) ON DELETE CASCADE,
  CONSTRAINT `user_ewallets_ibfk_2` FOREIGN KEY (`method_id`) REFERENCES `payment_methods` (`method_id`) ON DELETE CASCADE,
  CONSTRAINT `user_ewallets_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ewallets`
--

LOCK TABLES `user_ewallets` WRITE;
/*!40000 ALTER TABLE `user_ewallets` DISABLE KEYS */;
INSERT INTO `user_ewallets` VALUES (1,1,3,3,'wallet','user.ovo12345@gmail.com',0,'2025-09-17 12:33:21','2025-09-17 12:34:40'),(2,1,2,3,'wallet','user.gopay12345@gmail.com',0,'2025-09-17 12:34:40','2025-09-17 12:34:52'),(3,1,2,3,'wallet','user.paypal123@gmail.com',0,'2025-09-17 12:34:52','2025-09-17 12:34:59'),(4,1,1,3,'wallet','user.paypal123@gmail.com',0,'2025-09-17 12:34:59','2025-09-17 12:35:20'),(5,1,3,3,'wallet','user.ovo@example.com',1,'2025-09-17 12:35:20','2025-09-26 11:36:44'),(7,2,2,3,'wallet','user.gopay@gmail.com',1,'2025-09-17 12:40:40','2025-09-17 12:40:40'),(8,1,2,3,'wallet','user.gopay@gmail.com',0,'2025-09-26 11:34:45','2025-09-26 11:36:44');
/*!40000 ALTER TABLE `user_ewallets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_virtual_accounts`
--

DROP TABLE IF EXISTS `user_virtual_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_virtual_accounts` (
  `virtual_account_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `bank_id` int NOT NULL,
  `method_id` bigint NOT NULL,
  `method_type` enum('bank_transfer') DEFAULT 'bank_transfer',
  `account_number` varchar(50) NOT NULL,
  `account_label` varchar(100) DEFAULT NULL,
  `is_default` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`virtual_account_id`),
  UNIQUE KEY `uq_user_account` (`user_id`,`bank_id`,`account_number`),
  KEY `bank_id` (`bank_id`),
  KEY `method_id` (`method_id`),
  CONSTRAINT `user_virtual_accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_virtual_accounts_ibfk_2` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`bank_id`) ON DELETE CASCADE,
  CONSTRAINT `user_virtual_accounts_ibfk_3` FOREIGN KEY (`method_id`) REFERENCES `payment_methods` (`method_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_virtual_accounts`
--

LOCK TABLES `user_virtual_accounts` WRITE;
/*!40000 ALTER TABLE `user_virtual_accounts` DISABLE KEYS */;
INSERT INTO `user_virtual_accounts` VALUES (1,1,1,1,'bank_transfer','20901052635123','Savings Account',1,'2025-09-17 13:45:08','2025-09-17 13:45:08'),(2,1,2,1,'bank_transfer','209075896324563','Current Account',0,'2025-09-17 13:45:52','2025-09-26 11:29:48'),(3,1,6,1,'bank_transfer','209075963245867','Savings Account',1,'2025-09-17 13:46:19','2025-09-17 13:46:19'),(5,2,3,1,'bank_transfer','20901051200365','Savings Account',1,'2025-09-17 13:48:03','2025-09-17 13:48:03'),(6,2,4,1,'bank_transfer','20901051549835','Savings Account',1,'2025-09-17 13:48:24','2025-09-17 13:48:24'),(7,2,5,1,'bank_transfer','20901051879355','Savings Account',1,'2025-09-17 13:48:33','2025-09-17 13:48:33'),(8,2,6,1,'bank_transfer','209010304050607','Savings Account',1,'2025-09-17 13:48:45','2025-09-17 13:48:45'),(9,1,6,1,'bank_transfer','209010304050152','Savings Account',1,'2025-09-26 11:30:09','2025-09-26 11:30:09');
/*!40000 ALTER TABLE `user_virtual_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `dateOfBirth` date DEFAULT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin','viewer','editor') DEFAULT 'user',
  `isActive` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Neha','Patel','2008-12-28','Female','np12345@gmail.com','1238569460','$2b$10$5pmDkuA/ojHpxRUfprke3Ol32MhLw7kMLWo45pGm3I7efbrw8mtam','user',1,'2025-09-15 07:25:03','2025-09-15 07:25:03'),(2,'Bhavya','Shah','2003-11-12','Male','bh1112@gmail.com','1238569460','$2b$10$Bh317xBYuWm/0Ls0yxvT1uA8ZQ9ntzaRH9CjBpAr5y505kPF6CbmO','user',1,'2025-09-15 07:28:26','2025-09-15 07:28:26'),(3,'Main','Admin','2003-11-12','Male','main.admin@example.com','1238569460','$2b$10$IFjQlCcUiAbpy9hfB8vEXOJ60A2Ocuzj2voxIMLvbWsqp46lkXqC2','user',1,'2025-09-15 07:29:38','2025-09-15 07:29:38'),(4,'Meet','Shah','2003-11-12','Male','meetshah2854@gmail.com','1238569460','$2b$10$asMtR2q8edl0GcL5mTMVYuJZlAJLQ2WqFAVVXQg0gg8wQHdMO1Voi','admin',1,'2025-09-15 07:30:36','2025-09-15 07:30:36'),(5,'Meet','Chikani','2003-11-12','Male','abcd1234@gmail.com','1238569460','$2b$10$WYl02KHEQXaDg.5cJWdhBeVesZwycsxqKjXo08w11c1L8zkEdODGe','admin',1,'2025-09-17 07:34:43','2025-09-17 07:34:43'),(6,'Meet','Chikani','2003-01-12','Male','meet1234@gmail.com','1238569460','$2b$10$YLCiibY9MJiMSsQxp.cXf.dANI.W.wG64j3C.ELccps1sW7Q1PC1O','admin',1,'2025-09-26 05:43:37','2025-09-26 05:43:37'),(7,'Smit','Shah','2005-09-25','Male','smitshah2509@gmail.com','9635218745','$2b$10$7ynhzxVA9sNu8eNVMErSD.xm6dJ5V2RjgLRzGaMPfJ829tvz0STvi','admin',1,'2025-09-26 13:15:41','2025-09-26 13:15:41'),(8,'Jenish ','Radadiya','2003-04-28','Male','jenish2804@gmail.com','1234567890','$2b$10$CGesY0shLRfVRd4qBtgP0e0Nh4wVXOK4lq8Jv1CXDmjiFdjpOXdGW','user',1,'2025-09-26 13:26:48','2025-09-26 13:26:48');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vouchers`
--

DROP TABLE IF EXISTS `vouchers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vouchers` (
  `voucher_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `code` varchar(100) DEFAULT NULL,
  `description` text,
  `discount_type` enum('percentage','fixed','free_shipping','bogo') NOT NULL,
  `discount_value` decimal(10,2) DEFAULT NULL,
  `min_purchase` decimal(10,2) DEFAULT NULL,
  `applicable_items` json DEFAULT NULL,
  `first_purchase_only` tinyint(1) DEFAULT '0',
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_by` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`voucher_id`),
  UNIQUE KEY `code` (`code`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `vouchers_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vouchers`
--

LOCK TABLES `vouchers` WRITE;
/*!40000 ALTER TABLE `vouchers` DISABLE KEYS */;
INSERT INTO `vouchers` VALUES (1,'Summer Sale 20% Off','SUMMER20','Get 20% off on all products during summer sale.','percentage',20.00,100.00,'[\"Running\", \"Cycling\"]',0,'2025-09-15','2025-09-30',1,1,'2025-09-16 08:30:12','2025-09-16 08:30:12'),(2,'Flat ₹500 Off','FLAT500','Get a flat discount of ₹500 on orders above ₹2000.','fixed',500.00,2000.00,NULL,0,'2025-09-20','2025-10-05',1,2,'2025-09-16 08:30:59','2025-09-16 08:30:59'),(3,'Free Shipping Offer','FREESHIP','Enjoy free shipping on all orders above ₹500.','free_shipping',0.00,500.00,NULL,0,'2025-09-16','2025-12-31',1,3,'2025-09-16 08:31:08','2025-09-16 08:31:08'),(4,'Buy One Get One Free','BOGO2025','Buy one item and get another free. Applicable on select categories.','bogo',0.00,NULL,'[\"shoes\", \"tshirts\"]',1,'2025-09-18','2025-09-25',1,1,'2025-09-16 08:31:16','2025-09-16 08:31:16'),(8,'Buy One Get One Free','BOGO092025','Buy one item and get another free. Applicable on select categories.','bogo',0.00,NULL,'[\"shoes\"]',1,'2025-09-25','2025-09-27',1,1,'2025-09-25 09:58:53','2025-09-25 09:58:53'),(9,'Flat 20% Off','FLAT20SEP','Get 20% off on all clothing items.','percentage',20.00,500.00,'[\"clothing\"]',0,'2025-09-26','2025-10-05',1,2,'2025-09-25 09:59:53','2025-09-25 09:59:53'),(10,'₹500 Off Electronics','ELEC500','Save ₹500 on electronics purchases over ₹5000.','fixed',500.00,5000.00,'[\"electronics\"]',0,'2025-09-28','2025-10-10',1,3,'2025-09-25 10:00:32','2025-09-25 10:00:32'),(12,'Free Shipping Weekend','FREESHIP092025','Enjoy free shipping on all orders this weekend.','free_shipping',0.00,NULL,'[\"all\"]',0,'2025-09-27','2025-09-29',1,4,'2025-09-25 10:01:13','2025-09-25 10:01:13'),(13,'First Order ₹200 Off','WELCOME200','Flat ₹200 off on your first purchase.','fixed',200.00,1000.00,'[\"all\"]',1,'2025-09-25','2025-12-31',1,1,'2025-09-25 10:01:27','2025-09-25 10:01:27'),(14,'Buy 2 Get 1 Free - Books','BOOKS321','Buy any 2 books and get 1 free.','bogo',0.00,NULL,'[\"books\"]',0,'2025-09-30','2025-10-15',1,5,'2025-09-25 10:01:48','2025-09-25 10:01:48'),(17,'Weekend Flash Sale - 30% Off','WEEKEND30','Flat 30% off on all fashion items this weekend only.','percentage',30.00,NULL,'[\"fashion\"]',0,'2025-09-27','2025-09-28',1,2,'2025-09-25 10:02:43','2025-09-25 10:02:43'),(19,'Buy One Get One Free','BOGO102025','Buy one item and get another free. Applicable on select categories.','bogo',0.00,NULL,'[\"shoes\"]',1,'2025-09-25','2025-09-28',1,2,'2025-09-26 09:00:46','2025-09-26 09:06:18');
/*!40000 ALTER TABLE `vouchers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'e_commerce'
--

--
-- Dumping routines for database 'e_commerce'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-30 15:07:29
