import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (!menuWriteDto.men_id) {
      delete menuWriteDto.men_id;
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
      men_id = menuWriteDto.men_id;
      if (!men_id) {
        throw new Error('메뉴 ID가 없습니다.');
      }
      const existingMenu = await this.menuRepository.findOne({ men_id });
      if (!existingMenu) {
        throw new NotFoundException('해당 메뉴가 존재하지 않습니다.');
      }
      this.menuRepository.assign(existingMenu, menuWriteDto);
      await this.em.flush();

      switch (menuWriteDto.men_type) {
        case 'page':
          const existingPage = await this.pageRepository.findOne({ men_id });
          if (existingPage) {
            this.pageRepository.assign(existingPage, {
              page_title: menuWriteDto.men_title,
              page_content: menuWriteDto.page_content,
            });
            await this.em.flush();
          } else {
            const newPageWriteDto: Partial<PageEntity> = {
              men_id: men_id,
              page_title: menuWriteDto.men_title,
              page_content: menuWriteDto.page_content,
            };
            const newPage = this.pageRepository.create(newPageWriteDto);
            await this.em.persistAndFlush(newPage);
          }
          break;

        case 'board':
          const existingBoard = await this.boardRepository.findOne({ men_id });
          if (existingBoard) {
            this.boardRepository.assign(existingBoard, {
              brd_title: menuWriteDto.men_title,
              brd_skin: menuWriteDto.brd_skin,
            });
            await this.em.flush();
          } else {
            const newBoardWriteDto: Partial<BoardEntity> = {
              men_id: men_id,
              brd_title: menuWriteDto.men_title,
              brd_skin: menuWriteDto.brd_skin,
            };
            const newBoard = this.boardRepository.create(newBoardWriteDto);
            await this.em.persistAndFlush(newBoard);
          }
          break;
      }

      men_id = existingMenu.men_id;
    }

    return men_id;
  }

  async getMenu() {
    const menus = await this.menuRepository.findAll();
    const menuTree = [];

    menus.forEach((menu) => {
      if (Number(menu.men_parent) === 0) {
        menuTree[menu.men_id] = { ...menu, children: [] }; // 부모 메뉴에 children 속성을 추가
      }
    });

    menus.forEach((menu) => {
      if (Number(menu.men_parent) !== 0) {
        const parentMenu = menuTree[menu.men_parent];
        if (parentMenu) {
          const childMenu = { ...menu, children: [] };
          parentMenu.children[menu.men_id] = childMenu; // 자식 메뉴를 부모의 children 배열에 추가
        }
      }
    });

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

  async getOneMenu(men_id: number) {
    const menu = await this.menuRepository.findOne({ men_id });
    if (!menu) {
      throw new NotFoundException(`Post with id ${men_id} not found`); // 템플릿 리터럴로 수정
    }
    if (menu.men_type === 'page') {
      const page = await this.pageRepository.findOne({ men_id });
      if (page) {
        menu.page_content = page.page_content;
      } else {
        console.log(`Page with men_id ${men_id} not found.`);
      }
    }
    if (menu.men_type === 'board') {
      const board = await this.boardRepository.findOne({ men_id });
      if (board) {
        menu.brd_skin = board.brd_skin;
      } else {
        console.log(`Page with men_id ${men_id} not found.`);
      }
    }

    return menu;
  }

  async deleteMenu(men_ids: number[]): Promise<void> {
    if (!men_ids || men_ids.length === 0) {
      throw new Error('No menu IDs provided for deletion.');
    }

    // Begin a transaction
    await this.em.transactional(async (em) => {
      for (const men_id of men_ids) {
        const menu = await em.findOne(MenuEntity, { men_id });
        if (menu) {
          await em.removeAndFlush(menu);
        } else {
          console.warn(`Menu with ID ${men_id} not found.`);
        }
      }
    });
  }

  async getBoards() {
    const boards = await this.boardRepository.findAll();
    return boards;
  }

  async getPage(men_id) {
    const page = await this.pageRepository.findOne({ men_id });
    return page;
  }
}
