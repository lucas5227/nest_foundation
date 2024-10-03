import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('')
export class UserController {
  @Get(':path(*)') // 경로를 와일드카드 `(*)`로 모두 받아오기
  async route(@Param('path') path: string, @Res() res: Response) {
    // TODO: postgre 에서 메뉴 정보가져오기 & 메뉴트리 정보 서비스로 만들기
    const menus = ['admin'];
    let route = path;
    if (!menus.includes(path)) route = '404';
    // path에 따라 동적으로 EJS 템플릿 렌더링
    path = 'domain/' + path;
    // TODO: layout + view 로 page rendering 하기
    // idea layout.ejs 를 가져오고 layout.ejs 에서 include
    return res.render(route, { path: path, message: `Rendering ${path}.ejs` });
  }
}
