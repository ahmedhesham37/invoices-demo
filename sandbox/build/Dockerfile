FROM azul/zulu-openjdk-alpine:8

ENV APP_NAME INVOICESYNCSYSTEM
ENV APP_HOME /opt/applications
ENV SERVER_HOME /opt/server/wildfly
ENV DEPLOYMENT_DIR /opt/server/wildfly/standalone/deployments/

ADD wildfly ${SERVER_HOME}

# Deploy the WAR
RUN echo "=> Deploying war file"
COPY ./deployments/vbs-invoice-system.war ${DEPLOYMENT_DIR}

# Expose http and admin ports
RUN echo "=> Ports exposed are 8080, 9990"
EXPOSE 8080 9990

RUN echo "=> Starting WildFly"
# Set the default command to run on boot
# This will boot WildFly in the standalone mode and bind to all interfaces
CMD ["/opt/server/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
