import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MenuService } from '../menu/menu.service';

@Controller('')
export class UserController {
  constructor(private readonly MenuService: MenuService) {}

  @Get(':path(*)')
  async route(@Param('path') path: string, @Res() res: Response) {
    if (path === '') path = 'home';
    const menus = await this.MenuService.getMenu();
    const isWrite = path.indexOf('/write/') !== -1;
    if (isWrite) {
      path = path.replace('/write/', '');
    }
    const men_code = path.split('/').at(-1);
    const menu = menus.find((menu) => menu?.men_code === men_code);
    let content = null;
    let link = null;
    //TODO: 파비콘 개발후 제거
    if (path === 'favicon.ico') {
      return res.status(204).end(); // 빈 응답 반환
    }
    if (menu) {
      if (menu.men_type === 'page') {
        const pageInfo = await this.MenuService.getPage(menu.men_id);
        console.log(pageInfo);
        content = pageInfo.page_content;
      }
      if (menu.men_type === 'board') {
        // page =
        if (isWrite) {
          // page =
        }
      }
      if (menu.men_type === 'link') {
        link = {url:menu.men_link, open:menu.men_link_window_open};
      }
    }
    let page = '../' + path + '.ejs'; // page는 path와 동일한 파일 이름으로 사용

    const isMenu = path === 'home' || menu ? true : false;
    let route = path;

    const singlePage = ['register']; // 메뉴 목록 (데이터베이스에서 가져올 수도 있음)
    if (!isMenu && !singlePage.includes(path)) {
      route = '404'; // 없는 메뉴일 경우 404 페이지 설정
    } else if (singlePage.includes(path)) {
      route = path;
    } else {
      route = '_layout/layout'; // layout.ejs를 기본 레이아웃 파일로 사용
    }
    path = `domain/${path}`; // 예: 'domain/home.ejs'

    const data = {
      path,
      page,
      menus,
      content,
      link,
    };

    return res.render(route, data);
  }
}
