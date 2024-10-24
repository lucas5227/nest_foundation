// src/entities/PostEntity.ts
import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';
require('dotenv').config();

@Entity({ tableName: process.env.DATABASE_PREFIX+'board' })
export class BoardEntity {
  @PrimaryKey()
  brd_id!: number;

  @Property()
  @Index()
  men_id!: number;

  @Property({ length: 255 })
  brd_title!: string;

  @Property({ length: 255 })
  brd_skin!: string;

  @Property({ type: 'text', nullable: true })
  brd_content?: string;
}
