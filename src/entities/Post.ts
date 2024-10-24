// src/entities/PostEntity.ts
import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

require('dotenv').config();
@Entity({ tableName: process.env.DATABASE_PREFIX + 'post' }) // Optional: Define table name explicitly
export class PostEntity {
  @PrimaryKey()
  post_id!: number;

  @Property()
  @Index()
  brd_id!: string;

  @Property({ nullable: true })
  @Index()
  cat_id?: string;

  @Property()
  @Index()
  mem_id!: string;

  @Property({ length: 255 })
  post_title!: string;

  @Property({ type: 'text', nullable: true })
  post_content?: string;

  @Property({ nullable: true })
  @Index()
  post_attach?: string;

  @Property({
    type: 'datetime',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  post_register_datetime?: Date;

  @Property({
    type: 'datetime',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  post_update_datetime?: Date;

  @Property()
  post_register_ip!: string;

  @Property({ type: 'int', default: 0 })
  post_view!: number;

  @Property({ type: 'tinyint', default: 0 })
  post_del!: number;

  post_display_date: string;
}
