// src/entities/PostEntity.ts
import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'menu' })
export class MenuEntity {
  @PrimaryKey()
  men_id!: number;

  @Property({ type: 'int' })
  men_parent!: string;

  @Property({ length: 255 })
  men_title!: string;

  @Property({ type: 'tinyint', default: 1 })
  men_show!: number;

  @Property({ length: 255, nullable: true })
  men_link?: string;
}
