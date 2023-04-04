CREATE DATABASE seeyoucu_backend;
USE seeyoucu_backend;

CREATE TABLE user (
  id integer PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  tags JSON NOT NULL
);

INSERT INTO user (name, password, email, tags)
VALUES 
('Leila','Leila123!','6338194021@student.chula.ac.th', '["Acting", "Anime"]');

SELECT * FROM user
