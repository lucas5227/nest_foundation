// src/entities/ConfigEntity.ts
import { Entity, PrimaryKey, Property, Index } from '@mikro-orm/core';

@Entity({ tableName: 'config' })
export class ConfigEntity {
  @PrimaryKey()
  conf_id!: number;

  @Property()
  @Index()
  conf_key!: string;

  @Property({ nullable: true })
  conf_val?: string;
}
