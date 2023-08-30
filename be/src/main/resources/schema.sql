DROP TABLE IF EXISTS category;

CREATE TABLE category (
                          id BIGINT(11) NOT NULL AUTO_INCREMENT,
                          name VARCHAR(45) NOT NULL,
                          iconName VARCHAR(45) NOT NULL,
                          PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;