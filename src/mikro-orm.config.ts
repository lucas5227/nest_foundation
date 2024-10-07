import { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
require('dotenv').config();

const config: Options<PostgreSqlDriver> = {
  driver: PostgreSqlDriver,
  clientUrl: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`,
  dbName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  debug: true,
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
};
export default config;
