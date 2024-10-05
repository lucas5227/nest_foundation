import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity() // MikroORM의 엔티티 데코레이터
export class Member {
  @PrimaryKey()
  id!: number;

  @Property()
  username!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;
}
