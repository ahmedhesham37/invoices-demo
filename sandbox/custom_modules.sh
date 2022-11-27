#!/usr/bin/env bash

echo "=> Executing Customization script"

JBOSS_HOME=/opt/jboss/wildfly
JBOSS_CLI=$JBOSS_HOME/bin/jboss-cli.sh
JBOSS_MODE=${1:-"standalone"}
JBOSS_CONFIG=${2:-"$JBOSS_MODE.xml"}
DB_HOST=localhost
DB_NAME=invoices
DB_USER=root
DB_PASS=dbpass
DATASOURCE_NAME=InvoicesDS

function wait_for_server() {
  until `${JBOSS_CLI} -c ":read-attribute(name=server-state)" 2> /dev/null | grep -q running`; do
    sleep 1
  done
}

echo "=> Starting WildFly server"

echo "JBOSS_HOME  : " ${JBOSS_HOME}
echo "JBOSS_CLI   : " ${JBOSS_CLI}
echo "JBOSS_MODE  : " ${JBOSS_MODE}
echo "JBOSS_CONFIG: " ${JBOSS_CONFIG}

echo ${JBOSS_HOME}/bin/${JBOSS_MODE}.sh -b 0.0.0.0 -c ${JBOSS_CONFIG} &
${JBOSS_HOME}/bin/${JBOSS_MODE}.sh -b 0.0.0.0 -c ${JBOSS_CONFIG} &

echo "=> Waiting for the server to boot"
wait_for_server

echo "=> Executing the commands"
${JBOSS_CLI} -c --file=`dirname "$0"`/commands.cli

# Add MySQL module
module add --name=com.mysql --resources=/opt/jboss/wildfly/customization/mysql-connector-java-5.1.39-bin.jar --dependencies=javax.api,javax.transaction.api

# Add Mysql Datasource
xa-data-source add --name=${DATASOURCE_NAME} --jndi-name=java:/jdbc/datasources/${DATASOURCE_NAME} --user-name=${DB_USER} --password=${DB_PASS} --driver-name=mysql-connector-java-5.1.40.jar_com.mysql.jdbc.Driver_5_1 --xa-datasource-properties=ServerName=${DB_HOST},PortNumber=3306,DatabaseName=${DB_NAME}


# Add MySQL driver
/subsystem=datasources/jdbc-driver=mysql:add(driver-name=mysql,driver-module-name=com.mysql,driver-xa-datasource-class-name=com.mysql.jdbc.jdbc2.optional.MysqlXADataSource)

# Deploy the WAR
#cp /opt/jboss/wildfly/customization/leadservice-1.0.war $JBOSS_HOME/$JBOSS_MODE/deployments/leadservice-1.0.war

echo "=> Shutting down WildFly"
if [ "${JBOSS_MODE}" = "standalone" ]; then
  ${JBOSS_CLI} -c ":shutdown"
else
  ${JBOSS_CLI} -c "/host=*:shutdown"
fi

echo "=> Restarting WildFly"
${JBOSS_HOME}/bin/${JBOSS_MODE}.sh -b 0.0.0.0 -c ${JBOSS_CONFIG}