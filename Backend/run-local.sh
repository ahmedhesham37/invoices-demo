#!/usr/bin/env bash

mvn clean package
cp target/vbs-invoice-system.war /home/javaee/development/wildfly-22.0.1.Final/standalone/deployments/invoices/
/home/javaee/development/wildfly-22.0.1.Final/bin/standalone.sh