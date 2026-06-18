# Childcare Facility Application - Backend Setup Guide

This guide provides instructions on setting up, building, packaging, and running a Spring Boot application using Maven.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. Java Development Kit (JDK)


    . JDK 17 or later is required.

    . Download JDK

2. Apache Maven


    . Maven 3.5 or later is required.

    . Download Maven

3. Mongodb and Mongodb campus

    . Mongodb 7.0.11 or latter is required

    . Mongodb campus latest version

i) Create a database and collection using the provided scripts added in file named as 'mongodbsh_scripts.txt' under Mongodb folder.
ii)  Import provided json files along with data under the named MongoDb folder with respective collection named folders as facilities, roles and users.

Note: Database port by default configured with 3308, if your database is running on different port you must have to change in application.properties file under resources folder.



## Steps to Build and Run the Application

1. Build the Application

Use Maven to build the application. This step will compile the code, run tests, and package the application.

``` 
mvn clean install

```

2. Package the Application into a JAR

Maven will package your application into a JAR file. The JAR file will be located in the target directory.

``` 
mvn package

```

3. Run the JAR File
   After packaging, you can run the JAR file using the java -jar command:

``` 
java -jar target/childcare-facilities-system-0.0.1-SNAPSHOT.jar

```

Backend application can be accessible at http://localhost:8080

# HOW_TO_CONFIGURE_FRONT_END_APPLICATION

# Prerequisites

-Front-End of Childcare Facility Application is Develop using React.js with Typescript and Vite is a local development server.

1. Please ensure that the system must have node.js, This app is develop in node v20.11.1 because its requires for the npm (Node package manager).

   To confirm the node version, Please run below given command

``` 

node --version

``` 

After ensurinn the node version, Please follow the below given steps.

2. Open the child-facilities-finder-system in your terminal of any compiler (VS Code) or command prompt. Install all project dependencies.

``` 

npm install


``` 



3. To run develop mode, Run command given below.


```

npm run dev


```

This cammand will serve the project to  http://localhost:5173/ and start the vite serve



4. TO serve your application to your network, Please run below given command

```

npm run dev -- --host


```

This cammand will serve the project to IP-Address  http://IP-Address:5173/ and start the vite serve


These are the shortcut that's helps alot for performing different tasks while react app is running

press r + enter to restart the server
press u + enter to show server url
press o + enter to open in browser
press c + enter to clear console
press q + enter to quit


That's all in development mode



BEST Regards


Enjoy Using Application


Cheers 
