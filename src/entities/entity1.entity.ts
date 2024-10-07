import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Entity1 {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ type: 'date' })
  createdAt: Date = new Date();
}
