// src/entities/ConfigEntity.ts
import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';
import * as process from 'node:process';
require('dotenv').config();

@Entity({ tableName: process.env.DATABASE_PREFIX + 'config' })
export class ConfigEntity {
  @PrimaryKey()
  conf_id!: number;

  @Property()
  @Index()
  conf_key!: string;

  @Property({ nullable: true })
  conf_val?: string;
}
