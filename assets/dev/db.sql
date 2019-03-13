-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Restaurant`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Restaurant` (
  `restaurant_id` INT NOT NULL,
  `name` VARCHAR(200) NULL,
  `location` VARCHAR(200) NULL,
  PRIMARY KEY (`restaurant_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Dish`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Dish` (
  `dish_id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `price` INT NULL,
  `restaurant_id` INT NULL,
  PRIMARY KEY (`dish_id`),
  INDEX `fk_dish_restaurant_idx` (`restaurant_id` ASC) VISIBLE,
  CONSTRAINT `fk_dish_restaurant`
    FOREIGN KEY (`restaurant_id`)
    REFERENCES `mydb`.`Restaurant` (`restaurant_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `mydb`.`Restaurant`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Restaurant` (`restaurant_id`, `name`, `location`) VALUES (1, 'Picapidras Sushi', 'Mi Casa');

COMMIT;


-- -----------------------------------------------------
-- Data for table `mydb`.`Dish`
-- -----------------------------------------------------
START TRANSACTION;
USE `mydb`;
INSERT INTO `mydb`.`Dish` (`dish_id`, `name`, `price`, `restaurant_id`) VALUES (1, 'SichiPiedras', 200, 1);

COMMIT;

