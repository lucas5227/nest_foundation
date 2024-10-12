// src/entities/PostEntity.ts
import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'post' }) // Optional: Define table name explicitly
export class PostEntity {
  @PrimaryKey()
  post_id!: number;

  @Property()
  @Index()
  brd_id!: string;

  @Property({ nullable: true }) // Content can be optional
  @Index()
  cat_id?: string;

  @Property()
  @Index()
  mem_id!: string;

  @Property({ length: 255 }) // Optional: Set a max length for the title
  post_title!: string;

  @Property({ type: 'text', nullable: true }) // Content can be optional and of type text
  post_content?: string;

  @Property({ nullable: true })
  @Index()
  post_attach?: string;

  @Property({
    type: 'datetime',
    nullable: true,
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  post_register_datetime?: Date;

  @Property({ type: 'datetime', nullable: true, onUpdate: () => new Date() })
  post_update_datetime?: Date;

  @Property()
  post_register_ip!: string;

  @Property({ type: 'tinyint', default: 0 })
  post_del!: number;
}
