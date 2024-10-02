®®# nest_foundation

- **Project Name**: Nest Foundation
- **Author**: Lucas Kim
- **Contact**: [klucas5227@gmail.com](mailto:klucas5227@gmail.com)
- **Summary**: `nest_foundation` is a project that utilizes Nest.js, PostgreSQL, and MinIO in a Dockerized environment. It provides a streamlined setup for building full-stack applications with a microservices architecture and cloud-native infrastructure.

## Project Structure

The project consists of the following directories and files:

```bash
nest_foundation/
├── src/                        # Source code for the Nest.js application
├── .env                        # Environment variables for the application
├── .yarn/                      # Yarn Berry configuration directory
├── .yarnrc.yml                 # Yarn configuration file
├── docker-compose.yml          # Docker Compose configuration file
├── Dockerfile                  # Dockerfile for building the Nest.js application
├── README.md                   # Project documentation (this file)
├── package.json                # Node.js dependencies and scripts
├── yarn.lock                   # Yarn dependency lockfile
└── tsconfig.json               # TypeScript configuration
```


## Docker Compose Services and Ports

This project utilizes Docker Compose to manage and run the following services:

### PostgreSQL
- **Description**: A relational database service used by the Nest.js application.
- **Image**: `postgres:15`
- **Container Name**: `postgres`
- **Ports**: `5432` (mapped to `localhost:5432`)
- **Environment Variables**:
    - `POSTGRES_USER`: `foundation`
    - `POSTGRES_PASSWORD`: `foundation_5227
    - `POSTGRES_DB`: `nest_foundation`

### MinIO
- **Description**: An object storage service used for managing files and media.
- **Image**: `minio/minio`
- **Container Name**: `minio`
- **Ports**:
    - `9000` (mapped to `localhost:9000`) - MinIO API port
    - `9001` (mapped to `localhost:9001`) - MinIO Console port
- **Environment Variables**:
    - `MINIO_ROOT_USER`: `minio`
    - `MINIO_ROOT_PASSWORD`: `minio_5227`

### Nest-App
- **Description**: The main Nest.js application that connects to PostgreSQL and MinIO.
- **Build Context**: Uses the Dockerfile in the root directory to build the Nest.js application.
- **Container Name**: `nest-app`
- **Ports**: `3000` (mapped to `localhost:3000`)
- **Environment Variables**:
    - `DATABASE_HOST`: `foundation`
    - `DATABASE_PORT`: `5432`
    - `DATABASE_USER`: `nest_user`
    - `DATABASE_PASSWORD`: `foundation_5227`
    - `DATABASE_NAME`: `nest_foundation`
    - `MINIO_ENDPOINT`: `http://minio:9000`
    - `MINIO_ACCESS_KEY`: `minio`
    - `MINIO_SECRET_KEY`: `minio_5227`

## How to Run the Project

To run the project, follow these steps:

1. **Clone the repository:**

   ```bash
   $ git clone https://github.com/lucas5227/nest_foundation.git
   $ cd nest_foundation
   ```
1. **Create a Docker network and start the services:**

   ```bash
   $ docker network create my_network
   $ docker-compose up -d
   ```
   


---
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
