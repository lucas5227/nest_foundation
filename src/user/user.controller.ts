import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('')
export class UserController {
  @Get(':path(*)')
  async route(@Param('path') path: string, @Res() res: Response) {
    if (path === '') path = 'home';
    let page = '../' + path + '.ejs'; // page는 path와 동일한 파일 이름으로 사용

    const menus = ['home', 'admin']; // 메뉴 목록 (데이터베이스에서 가져올 수도 있음)
    const singlePage = ['register']; // 메뉴 목록 (데이터베이스에서 가져올 수도 있음)
    let route = path;

    if (!menus.includes(path) && !singlePage.includes(path)) {
      route = '404'; // 없는 메뉴일 경우 404 페이지 설정
    } else if (singlePage.includes(path)) {
      route = path;
    } else {
      route = 'layout/layout'; // layout.ejs를 기본 레이아웃 파일로 사용
    }
    path = `domain/${path}`; // 예: 'domain/home.ejs'

    const data = { path, page, message: `Rendering ${path}.ejs` };

    return res.render(route, data);
  }
}
