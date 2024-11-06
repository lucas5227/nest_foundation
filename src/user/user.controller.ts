//app.e2e-spec.ts
import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { MenuService } from '../menu/menu.service';
import { PostService } from '../post/post.service';
import { CommonService } from '../common/common.service';

@Controller('')
export class UserController {
  constructor(
    private readonly PostService: PostService,
    private readonly CommonService: CommonService,
    private readonly MenuService: MenuService) {}

  @Get(':path(*)')
  async route(@Param('path') path: string, @Res() res: Response) {
    if (path === '') path = 'home';
    const menuTree = await this.MenuService.getMenuTree();
    const isWrite = path.indexOf('/write') !== -1;
    if (isWrite) {
      path = path.replace('/write', '');
    }
    const men_code = path.split('/').at(-1);
    let menu = null;
    if (path !== 'home') {
      menu = await this.MenuService.getOneMenuByMenCode(men_code);
    }

    let content = null;
    let link = null;
    // //TODO: 파비콘 개발후 제거
    if (path === 'favicon.ico') {
      return res.status(204).end(); // 빈 응답 반환
    }
    if (menu) {
      if (menu.men_type === 'page') {
        content = menu.page_content;
      }
      if (menu.men_type == 'board' && !isWrite) {
        // TODO: 리스트
        const page = 1;
        const total = await this.PostService.getListTotal(menu.brd_id); // 총 게시물 수 가져오기
        const pagenation = this.CommonService.pagenation(total, 10, 10, page); // 페이지네이션 처리
        const list = await this.PostService.getListPost(
          menu.brd_id,
          pagenation.offset,
          pagenation.limit);
        console.log('total', total);
        path = 'board/' + menu.brd_skin + '/list';
      }
      if (menu.men_type === 'board' && isWrite) {
        // TODO: 게시글 정보
        path = 'board/' + menu.brd_skin + '/write';
      }
      if (menu.men_type === 'link') {
        link = { url: menu.men_link, open: menu.men_link_window_open };
      }
    }

    let skin = '../' + path + '.ejs'; // page는 path와 동일한 파일 이름으로 사용
    console.log('skin', skin);
    const isMenu = path === 'home' || menu ? true : false;
    let route = path;

    const singlePage = ['register']; // 메뉴 목록 (데이터베이스에서 가져올 수도 있음)
    if (!isMenu && !singlePage.includes(path)) {
      route = '404'; // 없는 메뉴일 경우 404 페이지 설정
    } else if (singlePage.includes(path)) {
      route = path + '.ejs';
    } else {
      route = '_layout/layout.ejs'; // layout.ejs를 기본 레이아웃 파일로 사용
    }
    path = `domain/${path}`; // 예: 'domain/home.ejs'

    const data = {
      path,
      skin,
      menuTree,
      content,
      link,
    };

    return res.render(route, data);
  }
}
