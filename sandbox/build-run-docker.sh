#!/bin/bash
set -eu

#docker container rm invoices

mvn clean package

docker build --tag=wildfly-app .
docker run -it -p 8080:8080 -p 9990:9990 --name=invoices wildfly-app