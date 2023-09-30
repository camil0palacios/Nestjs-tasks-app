# Nestjs tasks application

## Description

A task application with microservices architecture that includes a gateway API to control http traffic and an admin microservice with TCP communication for task and user control.

## Installation

First of all make sure to install every dependency with

```bash
$ npm install
```

## Docker

Before run the project make sure to install docker in your desktop, visit https://www.docker.com
When you are sure that you have docker

```bash
$ docker compose up -d
```

This will create a container for the tasks app and creates the database service
Note: configure the `docker-compose.yml` with the corresponding credentials of your database and make sure that this credentials are the same in the file `.env` (please create the file)

```
MYSQL_HOST="your_host"
MYSQL_PORT="your_port"
MYSQL_USERNAME="your_username"
MYSQL_PASSWORD="your_password"
MYSQL_DATABASE="your_database"
MYSQL_SSL="false"

JWT_SECRET="your_secret"
```

## Run the application

- Run gateway microservice `$ nest start gateway`
- Run admin microservice `$ nest start admin`

## Swagger

This applicaction is documented with swagger, so you can go to `http://localhost:{port}/doc` and use the application
