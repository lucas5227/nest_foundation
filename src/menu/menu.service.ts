import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { MenuEntity } from '../entities/Menu';
import { PageEntity } from '../entities/Page';
import { BoardEntity } from '../entities/Board';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity)
    private readonly menuRepository: EntityRepository<MenuEntity>,
    @InjectRepository(PageEntity) // PageEntity 주입
    private readonly pageRepository: EntityRepository<PageEntity>,
    @InjectRepository(BoardEntity) // BoardEntity 주입
    private readonly boardRepository: EntityRepository<BoardEntity>,
    private readonly em: EntityManager, // EntityManager 주입
  ) {}

  async writeMenu(parent, menuWriteDto: Partial<MenuEntity>) {
    let men_id;
    if (menuWriteDto.men_id === undefined) {
      menuWriteDto.men_parent = parent;
      const menu = this.menuRepository.create(menuWriteDto);
      await this.em.persistAndFlush(menu);
      men_id = menu.men_id;

      switch (menuWriteDto.men_type) {
        case 'page':
          const pageWriteDto: Partial<PageEntity> = {
            men_id: men_id,
            page_title: menuWriteDto.men_title,
            page_content: menuWriteDto.page_content,
          };
          const page = this.pageRepository.create(pageWriteDto);
          await this.em.persistAndFlush(page);
          break;

        case 'board':
          const boardWriteDto: Partial<BoardEntity> = {
            men_id: men_id,
            brd_title: menuWriteDto.men_title,
            brd_skin: menuWriteDto.brd_skin,
          };
          const board = this.boardRepository.create(boardWriteDto);
          await this.em.persistAndFlush(board);
          break;
      }
    } else {
      men_id = 0;
    }

    return men_id;
  }
  async getMenu() {
    const menus = await this.menuRepository.findAll();
    const menuTree = [];

    // Step 1: Add parent menus
    menus.forEach((menu) => {
      if (Number(menu.men_parent) === 0) {
        menuTree[menu.men_id] = { ...menu, children: [] }; // 부모 메뉴에 children 속성을 추가

      }
    });

    // // Step 2: Add child menus
    menus.forEach((menu) => {
      if (Number(menu.men_parent) !== 0) {
        const parentMenu = menuTree[menu.men_parent];
        if (parentMenu) {
          const childMenu = { ...menu, children: [] };
          parentMenu.children[menu.men_id] = childMenu; // 자식 메뉴를 부모의 children 배열에 추가
        }
      }
    });
    // Step 3: Add grandchild menus to the child menus
    menus.forEach((menu) => {
      if (Number(menu.men_parent) !== 0) {
        menuTree.forEach((mt) => {
          if (mt.children[menu.men_parent]) {
            mt.children[menu.men_parent].children[menu.men_id] = menu;
          }
        });
      }
    });
    return menuTree;
  }
}