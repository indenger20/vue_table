CREATE TABLE if not exists records (
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`created_at` date,
    `title` varchar(100) NOT NULL,
    `comment` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
