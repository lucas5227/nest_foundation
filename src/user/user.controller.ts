//app.e2e-spec.ts
import { Controller, Get, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { MenuService } from '../menu/menu.service';
import { PostService } from '../post/post.service';
import { CommonService } from '../common/common.service';
import { ConfigService } from '../config/config.service';



@Controller('')
export class UserController {
  constructor(
    private readonly PostService: PostService,
    private readonly CommonService: CommonService,
    private readonly MenuService: MenuService,
    private readonly ConfigService: ConfigService,
  ) {}

  @Get(':path(*)')
  async route(
    @Param('path') path: string,
    @Query('post_id') postId: string, // post_id 쿼리 파라미터 받기
    @Req() req: Request,
    @Res() res: Response,
  ) {
    let skin = null;
    let content: any = {};

    if (path === '') skin = 'home';
    const menuTree = await this.MenuService.getMenuTree();
    const isWrite = path.indexOf('/write') !== -1;
    if (isWrite) {
      // skin = path.replace('/write', '');
    }
    const men_code = path.split('/').at(-1);
    let menu = null;
    if (skin !== 'home') {
      menu = await this.MenuService.getOneMenuByMenCode(men_code);
    } else {
      const main_content = await this.ConfigService.getConfig(['main_content']);
      content.page = main_content['main_content'];
    }
    // //TODO: 파비콘 개발후 제거f
    if (path === 'favicon.ico') {
      return res.status(204).end(); // 빈 응답 반환
    }
    let skinPath = '../page/' + skin + '.ejs'; // page는 path와 동일한 파일 이름으로 사용
    if (menu) {
      if (menu.men_type === 'page') {
        content = { page: menu.page_content };
      }
      if (menu.men_type == 'board' && !isWrite) {
        // TODO: 리스트
        const page = 1;
        const total = await this.PostService.getListTotal(menu.brd_id);
        const pagenation = this.CommonService.pagenation(total, 10, 10, page);
        const list = await this.PostService.getListPost(
          menu.brd_id,
          pagenation.offset,
          pagenation.limit,
        );
        skinPath = '../board/' + menu.brd_skin + '/list';
        content = { posts: list, paging: pagenation };
      }
      if (menu.men_type === 'board' && isWrite) {
        // TODO: 게시글 정보
        skin = 'board/' + menu.brd_skin + '/write';
      }
      if (menu.men_type === 'link') {
        content = {
          link: { url: menu.men_link, open: menu.men_link_window_open },
        };
      }
    }

    const showMenu = skin === 'home' || menu ? true : false;

    let route = null;
    const singlePage = ['register']; // 메뉴 목록 (데이터베이스에서 가져올 수도 있음)
    if (!showMenu && !singlePage.includes(path)) {
      route = './page/404.ejs'; // 없는 메뉴일 경우 404 페이지 설정
    } else if (singlePage.includes(path)) {
      skinPath = '../page' + skin + '.ejs';
    } else {
      route = '_layout/layout.ejs';
    }

    const protocol = req.protocol;
    const domain = req.get('host');
    path = `${protocol}://${domain}/${path}`;

    const data = {
      path,
      skinPath,
      menuTree,
      content: content,
    };
    console.log('LK:: route', route);
    return res.render(route, data);
  }
}
