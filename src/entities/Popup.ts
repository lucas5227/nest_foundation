import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'popup' }) // 테이블 이름 지정
export class PopupEntity {
  @PrimaryKey()
  pop_id!: number;

  @Property({ type: 'date', nullable: true })
  pop_start_date?: Date;

  @Property({ type: 'date', nullable: true })
  pop_end_date?: Date;

  @Property({ type: 'int', unsigned: true, default: 0 })
  pop_left!: number;

  @Property({ type: 'int', unsigned: true, default: 0 })
  pop_top!: number;

  @Property({ type: 'int', unsigned: true, default: 0 })
  pop_width!: number;

  @Property({ type: 'varchar', length: 255 })
  pop_title!: string;

  @Property({ type: 'text', nullable: true })
  pop_content?: string;

  @Property({ type: 'tinyint', unsigned: true, default: 0 })
  pop_activated!: number;

  @Property({
    type: 'datetime',
    defaultRaw: 'CURRENT_TIMESTAMP',
  })
  pop_datetime?: Date;

  @Property({ type: 'varchar', length: 50 })
  pop_ip!: string;

  @Property({ type: 'int', unsigned: true })
  mem_id!: number;

  @Property({ type: 'varchar', length: 255, nullable: true })
  pop_link?: string;

  @Property({ type: 'tinyint', unsigned: true, nullable: true })
  pop_today?: number;

  @Property({ type: 'tinyint', unsigned: true, nullable: true })
  pop_window?: number;

  pop_display_date: string;
}
