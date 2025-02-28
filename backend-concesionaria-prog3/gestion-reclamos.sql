-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: reclamos
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `oficinas`
--

DROP TABLE IF EXISTS `oficinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oficinas` (
  `idOficina` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(256) NOT NULL,
  `idReclamoTipo` int DEFAULT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idOficina`),
  UNIQUE KEY `idOficina` (`idOficina`),
  KEY `oficinas_fk2` (`idReclamoTipo`),
  CONSTRAINT `oficinas_fk2` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamos_tipo` (`idReclamoTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oficinas`
--

LOCK TABLES `oficinas` WRITE;
/*!40000 ALTER TABLE `oficinas` DISABLE KEYS */;
INSERT INTO `oficinas` VALUES (1,'Dpto. de Taller y Servicio Técnico',1,1),(2,'Dpto. de Garantías',2,1),(3,'Dpto. de Repuestos y Partes',3,1),(4,'Dpto. de Facturación',4,1);
/*!40000 ALTER TABLE `oficinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamos`
--

DROP TABLE IF EXISTS `reclamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamos` (
  `idReclamo` int NOT NULL AUTO_INCREMENT,
  `asunto` varchar(256) NOT NULL,
  `descripcion` varchar(256) DEFAULT NULL,
  `fechaCreado` datetime NOT NULL,
  `fechaFinalizado` datetime DEFAULT NULL,
  `fechaCancelado` datetime DEFAULT NULL,
  `idReclamoEstado` int NOT NULL,
  `idReclamoTipo` int NOT NULL,
  `idUsuarioCreador` int NOT NULL,
  `idUsuarioFinalizador` int DEFAULT NULL,
  PRIMARY KEY (`idReclamo`),
  UNIQUE KEY `idReclamo` (`idReclamo`),
  KEY `reclamos_fk6` (`idReclamoEstado`),
  KEY `reclamos_fk7` (`idReclamoTipo`),
  KEY `reclamos_fk8` (`idUsuarioCreador`),
  KEY `reclamos_fk9` (`idUsuarioFinalizador`),
  CONSTRAINT `reclamos_fk6` FOREIGN KEY (`idReclamoEstado`) REFERENCES `reclamos_estado` (`idReclamoEstado`),
  CONSTRAINT `reclamos_fk7` FOREIGN KEY (`idReclamoTipo`) REFERENCES `reclamos_tipo` (`idReclamoTipo`),
  CONSTRAINT `reclamos_fk8` FOREIGN KEY (`idUsuarioCreador`) REFERENCES `usuarios` (`idUsuario`),
  CONSTRAINT `reclamos_fk9` FOREIGN KEY (`idUsuarioFinalizador`) REFERENCES `usuarios` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamos`
--

LOCK TABLES `reclamos` WRITE;
/*!40000 ALTER TABLE `reclamos` DISABLE KEYS */;
INSERT INTO `reclamos` VALUES (5,'ruido en motor',NULL,'2024-08-19 06:00:00',NULL,NULL,1,1,9,NULL),(6,'rotura de  motor ',NULL,'2024-08-19 07:00:00',NULL,NULL,4,1,8,NULL),(7,'no frena',NULL,'2024-08-15 07:15:00',NULL,NULL,1,2,8,NULL),(8,'ruidos extraños',NULL,'2024-08-15 08:00:00',NULL,'2025-02-20 01:40:04',3,3,7,NULL),(9,'cristales rayados',NULL,'2024-08-15 09:30:00',NULL,NULL,1,4,7,NULL),(10,'matafuego vencido',NULL,'2024-08-15 09:00:00',NULL,NULL,1,4,7,NULL),(11,'suspensión lado izq fallada',NULL,'2024-08-15 15:00:00',NULL,NULL,2,3,8,NULL),(12,'ruido en motor',NULL,'2025-02-09 10:56:29',NULL,NULL,1,1,8,NULL),(13,'no frena',NULL,'2025-02-09 10:58:39',NULL,NULL,1,1,8,NULL);
/*!40000 ALTER TABLE `reclamos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamos_estado`
--

DROP TABLE IF EXISTS `reclamos_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamos_estado` (
  `idReclamoEstado` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`idReclamoEstado`),
  UNIQUE KEY `idReclamoEstado` (`idReclamoEstado`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamos_estado`
--

LOCK TABLES `reclamos_estado` WRITE;
/*!40000 ALTER TABLE `reclamos_estado` DISABLE KEYS */;
INSERT INTO `reclamos_estado` VALUES (1,'creado',1),(2,'Atendido',1),(3,'Cancelado',1),(4,'Finalizado',0);
/*!40000 ALTER TABLE `reclamos_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reclamos_tipo`
--

DROP TABLE IF EXISTS `reclamos_tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reclamos_tipo` (
  `idReclamoTipo` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`idReclamoTipo`),
  UNIQUE KEY `idReclamoTipo` (`idReclamoTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamos_tipo`
--

LOCK TABLES `reclamos_tipo` WRITE;
/*!40000 ALTER TABLE `reclamos_tipo` DISABLE KEYS */;
INSERT INTO `reclamos_tipo` VALUES (1,'Falla de motor',1),(2,'Falla de frenos',1),(3,'Falla de suspensión',1),(4,'Aprobación de cobertura',1),(5,'Verificación de términos',1),(6,'Reemplazo de piezas',1),(7,'Reinstalación correcta',1),(8,'Reembolso',1);
/*!40000 ALTER TABLE `reclamos_tipo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(256) NOT NULL,
  `apellido` varchar(256) NOT NULL,
  `correoElectronico` varchar(256) NOT NULL,
  `contrasenia` varchar(256) NOT NULL,
  `idUsuarioTipo` int NOT NULL,
  `imagen` varchar(256) DEFAULT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `idUsuario` (`idUsuario`),
  UNIQUE KEY `correoElectronico` (`correoElectronico`),
  KEY `usuarios_fk5` (`idUsuarioTipo`),
  CONSTRAINT `usuarios_fk5` FOREIGN KEY (`idUsuarioTipo`) REFERENCES `usuarios_tipo` (`idUsuarioTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Daenerys','Targaryen','daetar@correo.com','b2803ace294160fd87aa85f826fa8df0c39e77282e0217af680198cef8d9edc3',1,NULL,1),(2,'Jon','Snow','jonsno@gmail.com','d98e05719dd7fa45547fbc3409eb36881bb8afe963268f7e8f6c2e24e80e58f5',2,'empleada.avif',1),(3,'Tyrion','Lannister','tyrlan@correo.com','9f9e51def43bc759ac35cd56ce8514a2c4dd0fbc9bfbb5bc97ce691f65bf5bb9',2,NULL,1),(4,'Margaery','Tyrell','martyr@correo.com','ad872b4820b164b7a25695ff77d0f6e5df812c6f9944d1d21461f57f099bce57',2,NULL,1),(5,'Samwell','Tarly','samtar@correo.com','a8487f98ab106b0ed2129a5446610b5ccba6b4bf7a937ef5194ce2f2a4c11bde',2,NULL,1),(6,'Jeor','Mormont','jeomor@correo.com','ef0b04a6eba2d3cde7b32f53b2c13b509d198189cb9da2080c7259948cbc63ca',2,NULL,1),(7,'Khal','Drogo','khadro@gmail.com','84507cc9012d1c900abb65663e3b62633cb14073aa6569b60efa2b75cf431b37',3,NULL,1),(8,'Catelyn','Stark','catsta@correo.com','229e7f7177d0e221f889eb8d3e2b422eae42adc403412fb25718b84fe5fff4d7',3,NULL,1),(9,'Yara','Greyjoy','yargre@correo.com','097c61d6a3ee77e4f4a9d2c6b6fb284ee927a0c315f30172f685e4659a4f621b',3,NULL,1),(11,'Cersei','Lannister','cerlan@correo.com','contrasenia123',3,NULL,1),(34,'Amanda','Blanco','amanda.banco.galicia@gmail.com','$2a$10$XDvjNbn5s1mDRXR68PHMOuiYUr4ZiETaP4OVjbiZ0TaKCTzfpMrf.',1,'1799.jpg',1),(82,'Superadministrador','de Pruebas','correodepruebasfullstack@gmail.com','$2b$10$kK8KvTSHQNLbjwyEGUjDdOj7ec2mtbl2mZz6k.SbHKyHfZ4bzoZC.',1,NULL,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_oficinas`
--

DROP TABLE IF EXISTS `usuarios_oficinas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_oficinas` (
  `idUsuarioOficina` int NOT NULL AUTO_INCREMENT,
  `idUsuario` int NOT NULL,
  `idOficina` int NOT NULL,
  `activo` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`idUsuarioOficina`),
  UNIQUE KEY `idUsuarioOficina` (`idUsuarioOficina`),
  KEY `usuarios_oficinas_fk1` (`idUsuario`),
  KEY `usuarios_oficinas_fk2` (`idOficina`),
  CONSTRAINT `usuarios_oficinas_fk1` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`idUsuario`),
  CONSTRAINT `usuarios_oficinas_fk2` FOREIGN KEY (`idOficina`) REFERENCES `oficinas` (`idOficina`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_oficinas`
--

LOCK TABLES `usuarios_oficinas` WRITE;
/*!40000 ALTER TABLE `usuarios_oficinas` DISABLE KEYS */;
INSERT INTO `usuarios_oficinas` VALUES (1,3,1,1),(2,4,2,1),(3,8,3,1),(4,9,4,1),(5,6,2,1),(6,5,2,1),(7,7,3,1),(8,1,3,1),(25,2,4,1),(26,64,4,1),(28,68,3,1),(29,71,2,1),(30,74,3,1),(31,34,4,1),(32,79,3,1),(34,81,3,1);
/*!40000 ALTER TABLE `usuarios_oficinas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios_tipo`
--

DROP TABLE IF EXISTS `usuarios_tipo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios_tipo` (
  `idUsuarioTipo` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(256) NOT NULL,
  `activo` tinyint NOT NULL,
  PRIMARY KEY (`idUsuarioTipo`),
  UNIQUE KEY `idUsuarioTipo` (`idUsuarioTipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios_tipo`
--

LOCK TABLES `usuarios_tipo` WRITE;
/*!40000 ALTER TABLE `usuarios_tipo` DISABLE KEYS */;
INSERT INTO `usuarios_tipo` VALUES (1,'Administrador',1),(2,'Empleado',1),(3,'Cliente',1);
/*!40000 ALTER TABLE `usuarios_tipo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-28 17:39:18
