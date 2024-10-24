// src/entities/PostEntity.ts
import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

require('dotenv').config();
@Entity({ tableName: process.env.DATABASE_PREFIX + 'menu' })
export class MenuEntity {
  @PrimaryKey()
  men_id!: number;

  @Property({ type: 'int' })
  men_parent!: string;

  @Property({ length: 255 })
  men_type!: string;

  @Property({ length: 255 })
  men_code!: string;

  @Property({ length: 255 })
  men_title!: string;

  @Property({ type: 'tinyint', default: 1 })
  men_show!: number;

  @Property({ length: 255, nullable: true })
  men_link?: string;

  @Property({ type: 'tinyint', default: 0 })
  men_link_window_open!: number;

  brd_skin?: string;

  page_content?: string;
}
