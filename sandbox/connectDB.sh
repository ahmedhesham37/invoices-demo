#!/usr/bin/env bash
#sudo systemctl restart docker
#docker container rm mysql-server
#docker run -d --name mysql-server -p 3306:3306 -v /var/lib/mysql:/var/lib/mysql -e "MYSQL_ROOT_PASSWORD=dbpass" mysql
docker start mysql-server
