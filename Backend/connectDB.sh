#!/usr/bin/env bash
docker run -d --name mysql-server -p 3306:3306 -v /var/lib/mysql:/var/lib/mysql -e "MYSQL_ROOT_PASSWORD=dbpass" mysql
