// src/entities/Member.ts
import { Entity, PrimaryKey, Property, Unique, Index } from '@mikro-orm/core';

require('dotenv').config();

@Entity({ tableName: process.env.DATABASE_PREFIX + 'file' })
export class FileEntity {
  @PrimaryKey()
  file_id!: number;

  @Property()
  @Index()
  mem_id!: string;

  @Property({ type: 'datetime', nullable: true })
  file_register_datetime?: Date;
}
