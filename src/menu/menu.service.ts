import { Injectable } from '@nestjs/common';
import { MenuEntity } from '../entities/Menu';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: EntityRepository<MenuEntity>,
    private readonly em: EntityManager, // EntityManager 주입
  ) {}

  async writeMenu(parent, menuWriteDto: Partial<MenuEntity>) {
    menuWriteDto.men_parent = parent;
    const menu = this.menuRepository.create(menuWriteDto);
    await this.em.persistAndFlush(menu);
    return menu.men_id;
  }
}
