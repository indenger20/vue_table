CREATE TABLE if not exists records (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`created_at` date,
  `title` varchar(100) NOT NULL,
  `comment` varchar(1024) DEFAULT NULL,
  `user_id` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE if not exists users (
  id int(16) AUTO_INCREMENT PRIMARY KEY,
  username varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  email varchar(64) NOT NULL,
  `group` varchar(64) NOT NULL,
  createdAt date
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
