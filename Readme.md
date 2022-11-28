# Invoices-Systems-Demo

# This Demo is for Intalio Technical Team

The proposed demo is for creating invoices for companies projects supplying multiple services 

The process is to add the services to the process, add the clients and for every new project, an invoice will be created automatically with all the previously supplied data

The project is build on Wildfly 22.0.1 as the Java Enterpise Application Server
The user portal is built with angular using Fuse Template V11
The User Authentication and Authorization is done using Keycloak LDAP
Data is stored in mysql database

The proposed repo consists of 3 main modules
  * **Frontend** under the folder name **portal** which is an angular solution built using Fuse 9 Template
  * **Backend** under the folder name **core** which is a Server-side Java Enterprise application exposing REST APIs endpoints for the external portals (_ Just for your reference_ )
  * **sandbox**is the docker-compose section with all the required build files and modules configuratons 
Sandbox contains the wildfly, keyclaok and mysql images
Attached are the configuration modules for the Wildfly and Keycloak in the build folder

###To run the project: 
#####Firstly build the docker compose file as follows: (Will take some time to pull the required images)
To build and run the environment
```
cd sandbox
docker-compose build && docker-compose up -d
```
Now we can start the User Portal by running the following from the repo directory
```
ng serve --port 4200 --open
```

Note: we don't need to add the Java WAR deployment file, already done and saved in the build folder

To run the demo, kindly follow the next steps:
1- Once the project starts, it will redirect to the keycloak portal 
2- Register a new account
3- Once logged in, the protal will seem very trivial with only 3 pages avaliable (Services, Projects and Invoices) which are all empty for now
4- Add a new(or multiple) service with the required data
5- Add a new project with the supplied services
6- Create an invoice for the project with the milestone payments

####Cheat sheet:
Keycloak Management credintials: user: admin, pass: password
Wildfly Management credentials:  user: admin, pass: admin
mysql credentials:   user: admin, pass: admin


