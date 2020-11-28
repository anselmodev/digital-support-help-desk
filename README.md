<h1 align="center">Projeto Uninove Segundo Semestre ( 2020 )</h1>

### Especificações de interface
* Reutilização do projeto de interface do <b>Primeiro Semestre</b>: [Digital Support](https://github.com/anselmodev/digital-support)
* Linguagens: HTML5, CSS, JAVASCRIPT, BOOTSTRAP e JQUERY.
* Requisições efetuadas por AJAX.
<br>

### Especificações do Servidor e Liguagem principal
* Linguagem JAVA.
* JRE 11.0.9
* Servidor Tomcat 9.0.39
* Banco de dados MYSQL 5.7.30 ou superior.
* Módulos/Libs: "mysql-connector-java-8.0.21" e " json-simple-1.1.1"
* URL LOCAL: http://localhost:8080/digital_support
<br> 
### Software para desenvolvimento
* [Intellij IDEA](https://www.jetbrains.com/pt-br/idea/download)
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
* [POSTMAN - Para Teste de Rotas ](https://www.postman.com/downloads/)
<br> 
### Ambiente para banco de dados Mysql
* [WAMPSERVER para Windows](https://www.wampserver.com/en/)
* [MAMP para Mac](https://www.mamp.info/en/downloads/)
* [XAMP para Linux](https://www.apachefriends.org/pt_br/download.html)

<br>
### Login do sistema com o Administrador MASTER
* E-mail: admin@admin.com
* Senha: aalmaster2717

<br><br> 
## Configuração do Banco de Dados MYSQL
* Nome da Tabela: "digitalsupport"
* Usuário: root (pode variar conforme o ambiente instalado na máquina)
* Senha: root (pode variar conforme o ambiente instalado na máquina)

#### Criação das tabelas no banco de dados
* Schema do Banco (executar o SQL abaixo): 
```mysql
# ************************************************************
# Sequel Pro SQL dump
# Versão 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.30)
# Base de Dados: digitalsupport
# Tempo de Geração: 2020-11-28 20:10:30 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump da tabela reports
# ------------------------------------------------------------

DROP TABLE IF EXISTS `reports`;

CREATE TABLE `reports` (
  `reportID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ticketID` int(11) unsigned NOT NULL,
  `description` longtext CHARACTER SET utf8 COLLATE utf8_bin,
  `interactionDate` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`reportID`),
  KEY `ticket_id` (`ticketID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `reports` WRITE;
/*!40000 ALTER TABLE `reports` DISABLE KEYS */;

INSERT INTO `reports` (`reportID`, `ticketID`, `description`, `interactionDate`)
VALUES
	(1,4,X'546573746520646520646573637269C3A7C3A36F20646F207469636B65742E2E2E2E','2020-11-24 19:33:13'),
	(61,26,X'4170656E617320756D6120646573637269C3A7C3A36F20646F2070726F626C656D6121','2020-11-28 16:37:27');

/*!40000 ALTER TABLE `reports` ENABLE KEYS */;
UNLOCK TABLES;


# Dump da tabela tickets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tickets`;

CREATE TABLE `tickets` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ticketNumber` int(20) unsigned NOT NULL,
  `customerName` varchar(255) DEFAULT NULL,
  `status` int(2) DEFAULT NULL,
  `subjectSupport` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;

INSERT INTO `tickets` (`id`, `ticketNumber`, `customerName`, `status`, `subjectSupport`, `createdAt`, `updatedAt`)
VALUES
	(4,2020234567,'Fulano de Tal',2,'Teste de Assunto','2020-11-24 12:38:04','2020-11-28 16:37:40'),
	(26,2020579750,'Menoscreuza',1,'Outro teste de suporte','2020-11-28 16:37:27','2020-11-28 16:37:27');

/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;


# Dump da tabela users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `userNumber` int(5) DEFAULT NULL,
  `fullName` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `removable` tinyint(1) DEFAULT '1',
  `typeAccess` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `userNumber`, `fullName`, `email`, `password`, `removable`, `typeAccess`, `status`, `createdAt`, `UpdatedAt`)
VALUES
	(1,23456,'Administrador Master','admin@admin.com','a8bc8e2d43651e3f27ac729ce9f039247c5d2f8e',0,1,1,'2020-11-21 22:00:43','2020-11-28 16:08:39'),
	(15,718134,'João Ferraz','joao@joao.com','c05b170380bd5213171106f8e1dc5de182e19aa4',1,0,1,'2020-11-28 16:39:02','2020-11-28 16:39:02');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

```

## Autores e Colaboradores

[<img src="https://avatars2.githubusercontent.com/u/14978874?v=3&s=115"><br><sub>@anselmodev</sub>](https://github.com/anselmodev) <br> <br>
[<img src="https://avatars2.githubusercontent.com/u/57109565?v=3&s=115"><br><sub>@RaulFerreira-90
</sub>](https://github.com/RaulFerreira-90) <br><br>
[<img src="https://avatars2.githubusercontent.com/u/55028968?v=3&s=115"><br><sub>@elicarlos-stack
</sub>](https://github.com/elicarlos-stack) <br><br>
[<img src="https://avatars2.githubusercontent.com/u/47343429?v=3&s=115"><br><sub>@Leviticos
</sub>](https://github.com/Leviticos) <br><br>
[@felipefeplus </sub>](https://github.com/felipefeplus) <br><br>
[@Ana-Cirilo </sub>](https://github.com/Ana-Cirilo) <br><br>
