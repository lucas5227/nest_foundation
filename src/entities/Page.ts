// src/entities/PostEntity.ts
import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'page' })
export class PageEntity {
  @PrimaryKey()
  page_id!: number;

  @Property()
  @Index()
  men_id!: number;

  @Property({ length: 255 })
  page_title!: string;

  @Property({ type: 'text', nullable: true })
  page_content?: string;
}
