FROM jboss/wildfly:latest

# Appserver
ENV WILDFLY_USER admin
ENV WILDFLY_PASS admin

# Database
ENV DB_NAME invoices
ENV DS_NAME invoicesDS
ENV DB_USER mysql
ENV DB_PASS mysql
ENV DB_URI 172.17.0.2:3306

ENV MYSQL_VERSION 8.0.23
ENV JBOSS_CLI /opt/jboss/wildfly/bin/jboss-cli.sh
ENV DEPLOYMENT_DIR /opt/jboss/wildfly/standalone/deployments/
ENV MYSQL_DIR /opt/jboss/wildfly/customization/
#ENV JAVA_OPTS

# Deploy the WAR
ADD target/vbs-invoice-system.war ${DEPLOYMENT_DIR}

# ADD Mysql connector for now
#ADD mysql-connector-java-8.0.23.jar ${MYSQL_DIR}

## Setting up WildFly Admin Console
#RUN echo "=> Adding WildFly administrator"
#RUN $JBOSS_HOME/bin/add-user.sh -u $WILDFLY_USER -p $WILDFLY_PASS --silent

## Configure Wildfly server
#RUN echo "=> Starting WildFly server" && \
#      bash -c '$JBOSS_HOME/bin/standalone.sh &' && \
#    echo "=> Waiting for the server to boot" && \
#      bash -c 'until `$JBOSS_CLI -c ":read-attribute(name=server-state)" 2> /dev/null | grep -q running`; do echo `$JBOSS_CLI -c ":read-attribute(name=server-state)" 2> /dev/null`; sleep 1; done' && \
#    echo "=> Downloading MySQL driver" && \
#      curl --location --output /tmp/mysql-connector-java-${MYSQL_VERSION}.jar --url http://search.maven.org/remotecontent?filepath=mysql/mysql-connector-java/${MYSQL_VERSION}/mysql-connector-java-${MYSQL_VERSION}.jar && \
#    echo "=> Adding MySQL module" && \
#      $JBOSS_CLI --connect --command="module add --name=com.mysql --resources=/tmp/mysql-connector-java-${MYSQL_VERSION}.jar --dependencies=javax.api,javax.transaction.api" && \
#    echo "=> Adding MySQL driver" && \
#      $JBOSS_CLI --connect --command="/subsystem=datasources/jdbc-driver=mysql:add(driver-name=mysql,driver-module-name=com.mysql,driver-xa-datasource-class-name=com.mysql.cj.jdbc.MysqlXADataSource)" && \
#    echo "=> BEFORE ADDING DATASOURCE" && \
#      $JBOSS_CLI --connect --command="/subsystem=datasources:read-resource(recursive=true)" && \
#    echo "=> Creating a new datasource" && \
#      $JBOSS_CLI --connect --command="data-source add \
#        --name=${DB_NAME} \
#        --jndi-name=java:/jdbc/datasources/${DS_NAME} \
#        --user-name=${DB_USER} \
#        --password=${DB_PASS} \
#        --driver-name=mysql \
#        --connection-url=jdbc:mysql://${DB_URI}/${DB_NAME} \
#        --use-ccm=true \
#        --max-pool-size=250 \
#        --blocking-timeout-wait-millis=5000 \
#        --enabled=true" && \
#    echo "=> Shutting down WildFly and Cleaning up" && \
#      $JBOSS_CLI --connect --command=":shutdown" && \
#    echo "=> After Adding DATASOURCE" && \
#          $JBOSS_CLI --connect --command="/subsystem=datasources:read-resource(recursive=true)" && \
#      rm -rf $JBOSS_HOME/standalone/configuration/standalone_xml_history/ $JBOSS_HOME/standalone/log/* && \
#      rm -f /tmp/*.jar

# Expose http and admin ports
EXPOSE 8080 9990

RUN echo "=> Restarting WildFly"
# Set the default command to run on boot
# This will boot WildFly in the standalone mode and bind to all interfaces
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "localhost", "-bmanagement", "localhost"]


#    Already downloaded for now and passed in 'customization' folder
#/opt/jboss/wildfly/customization/mysql-connector-java-8.0.23.jar