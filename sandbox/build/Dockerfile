FROM jboss/wildfly:22.0.1.Final

ENV APP_NAME INVOICESYNCSYSTEM
ENV SERVER_HOME /opt/jboss/wildfly/
ENV DEPLOYMENT_DIR /opt/jboss/wildfly/standalone/deployments/

ADD wildfly-configurations/modules /opt/jboss/wildfly/modules/
ADD wildfly-configurations/standalone/configuration/standalone.xml /opt/jboss/wildfly/standalone/configuration/
ADD wildfly-configurations/keycloak-oidc-wildfly-adapter-12.0.4 /opt/jboss/wildfly/keycloak-oidc-wildfly-adapter-12.0.4

# Deploy the WAR
RUN echo "=> Deploying war file"
ADD ./deployments/vbs-invoice-system.war ${DEPLOYMENT_DIR}

# Expose http and admin ports
RUN echo "=> Ports exposed are 8080, 9990"
EXPOSE 8080 9990


RUN echo "=> Creating admin user"
# Set the default command to run on boot
# This will add admin user to wildfly 
RUN /opt/jboss/wildfly/bin/add-user.sh admin admin --silent

RUN echo "=> Starting WildFly"
# Set the default command to run on boot
# This will boot WildFly in the standalone mode and bind to all interfaces
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
