// src/mikro-orm.config.ts
import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
require('dotenv').config();

const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  debug: true,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
};

export default config;
