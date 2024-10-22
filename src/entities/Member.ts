// src/entities/Member.ts
import { Entity, PrimaryKey, Property, Unique, Index } from '@mikro-orm/core';

@Entity({ tableName: 'member' })
export class MemberEntity {
  @PrimaryKey()
  mem_id!: number;

  @Property()
  @Unique()
  mem_userid!: string;

  @Property()
  @Index()
  mem_email!: string;

  @Property()
  mem_password!: string;

  @Property()
  mem_username!: string;

  @Property({ type: 'tinyint', default: 0 })
  mem_receive_email!: number;

  @Property({ type: 'datetime', nullable: true })
  mem_register_datetime?: Date;

  // @Property()
  // mem_register_ip!: string;

  @Property({ type: 'datetime', nullable: true })
  mem_lastlogin_datetime?: Date;

  // @Property()
  // mem_lastlogin_ip!: string;

  @Property({ type: 'tinyint', default: 0 })
  mem_is_admin!: number;

}
