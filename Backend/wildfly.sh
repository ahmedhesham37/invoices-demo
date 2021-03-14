#!/usr/bin/env bash

mvn clean package
cp -R target/vbs-invoice-system.war /home/javaee/development/Invoice-Project/wildfly-22.0.1.Final/standalone/deployments/invoices/

#Run the wildfly
/home/javaee/development/Invoice-Project/wildfly-22.0.1.Final/bin/standalone.sh

