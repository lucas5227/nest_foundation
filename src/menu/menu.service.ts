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
  ) {
  }

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

    // 첫 번째 단계: 부모 메뉴 추가
    menus.forEach((menu) => {
      if (Number(menu.men_parent) === 0) {
        menuTree.push({ ...menu, children: [] }); // children 속성을 추가
      }
    });

    // 두 번째 단계: 자식 메뉴 추가
    menus.forEach((menu) => {
      if (Number(menu.men_parent) !== 0) {
        menuTree.forEach((parentMenu) => {
          if (Number(parentMenu.men_id) === Number(menu.men_parent)) {
            // menu 객체를 복사하고 children 속성 추가
            const childMenu = { ...menu, children: [] };
            parentMenu.children.push(childMenu);
          }
        });
      }
    });
    // 세 번째 단계: 손자 메뉴 추가
    menus.forEach((menu) => {
      if (Number(menu.men_parent) !== 0) {
        menuTree.forEach((parentMenu) => {
          parentMenu.children.forEach((childMenu) => {
            if (Number(childMenu.men_id) === Number(menu.men_parent)) {
              childMenu.children.push(menu);
            }
          });
        });
      }
    });

    console.log(JSON.stringify(menuTree, null, 2));

    return menuTree;
  }

}
