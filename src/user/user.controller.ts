import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('')
export class UserController {
  @Get(':path(*)') // 경로를 와일드카드 `(*)`로 모두 받아오기
  async route(@Param('path') path: string, @Res() res: Response) {
    const menus = ['admin'];
    let route = path;
    if(!menus.includes(path)) route = '404';
      // path에 따라 동적으로 EJS 템플릿 렌더링
      path += "domain/"
      return res.render(route, { path: path, message: `Rendering ${path}.ejs` });
  }
}
