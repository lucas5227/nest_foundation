import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
  Req,
} from '@nestjs/common';
import { MemberService } from '../member/member.service';
import { PostService } from '../post/post.service';
import { PostEntity } from '../entities/Post';
import { Request } from 'express';
import { CommonService } from '../common/common.service';
import { MenuService } from '../menu/menu.service';
import { ConfigService } from '../config/config.service';
import { PopupService } from '../popup/popup.service';

// TODO: .env 에서 admin 주소 변경가능하게끔 기존 conf 는 env 에 넣는다.
@Controller('admin')
export class AdminController {
  constructor(
    private readonly memberService: MemberService,
    private readonly PostService: PostService,
    private readonly CommonService: CommonService,
    private readonly MenuService: MenuService,
    private readonly ConfigService: ConfigService,
    private readonly PopupService: PopupService,
  ) {}

  @Get('')
  @Render('admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async main() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    return { page: 'main.ejs', message: 'Here is ADMIN MAIN!' };
  }

  @Get('memberList')
  @Render('admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async memberList() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const allMember = await this.memberService.getAllMember();

    return { page: 'member/list.ejs', title: '회원관리', members: allMember };
  }

  @Get('layout/head')
  @Render('admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async head(@Query('update') update) {
    const conf_keys = [
      'site_meta_title_default',
      'site_meta_description_default',
      'site_meta_keywords_default',
      'site_meta_author_default',
      'og_title',
      'og_description',
    ];
    const head = await this.ConfigService.getConfig(conf_keys);
    return {
      page: 'layout/head.ejs',
      title: '&lt;head&gt; 설정',
      data: head,
      updated: update ? true : false,
    };
  }

  @Post('layout/head')
  @Redirect('/admin/layout/head?update=true')
  async headWrite(@Body() cofigData) {
    return await this.ConfigService.saveConfig(cofigData);
  }

  @Get('layout/sitemap')
  @Render('admin/_layout/layout')
  async siteMap() {
    const menuTree = await this.MenuService.getMenu();
    return {
      page: 'layout/list.ejs',
      title: '사이트맵 설정',
      data: menuTree,
    };
  }

  @Get('layout/sitemap/write/:parent')
  @Render('admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async menuWrite(@Param('parent') parent, @Query('update') men_id) {
    let menu = {
      men_parent: parent,
    };
    let title = '사이트맵 등록';
    if (men_id) {
      menu = await this.MenuService.getOneMenu(men_id);
      title = '사이트맵 수정';
    }
    return {
      page: 'layout/write.ejs',
      title: title,
      data: menu,
    };
  }

  @Post('layout/sitemap/write/:parent')
  @Redirect('/admin/layout/sitemap')
  async menuSave(@Param('parent') parent, @Body() menuWrite) {
    const men_id = await this.MenuService.writeMenu(parent, menuWrite);
    return men_id;
  }

  @Delete('layout/sitemap/delete')
  async deleteMenu(@Body('men_ids') men_ids) {
    return this.MenuService.deleteMenu(men_ids);
  }

  @Get('popup')
  @Render('admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async popupList(@Query('page') page: number) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const total = await this.PopupService.getListTotal(); // 총 게시물 수 가져오기
    const pagenation = this.CommonService.pagenation(total, 10, 10, page);
    const list = await this.PopupService.getPopups(
      pagenation.offset,
      pagenation.limit,
    );

    const popups = list.map((popup) => ({
      ...popup,
      pop_display_date: this.CommonService.formattedDatetime(
        popup.pop_datetime,
      ),
    }));
    return {
      page: 'popup/list.ejs',
      title: '팝업관리',
      data: popups,
      paging: pagenation,
    };
  }

  @Get('popup/write')
  @Render('admin/_layout/layout') // index.ejs 템플릿을 렌더x`링
  async popupWrite(@Query('pop_id') pop_id) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    let popup = null;
    let title = '팝업관리';
    if (pop_id) {
      popup = await this.PopupService.getOnePopup(pop_id);
      popup.pop_start_date = this.CommonService.formattedDatetime(popup.pop_start_date, 'YYYY-MM-DD');
      popup.pop_end_date = this.CommonService.formattedDatetime(popup.pop_end_date, 'YYYY-MM-DD');
      title = '팝업수정';
    }
    return { page: 'popup/write.ejs', title: title, data: popup };
  }

  @Post('popup/write')
  @Redirect('/admin/popup')
  async popupSave(@Body() popupWrite, @Req() req: Request) {
    popupWrite.pop_ip = req.ip;
    return await this.PopupService.writePopup(popupWrite);
  }

  @Delete('popup')
  async deletePopup(@Body('ids') pop_ids: string[]) {
    if (!Array.isArray(pop_ids)) {
      throw new BadRequestException('Invalid data format.');
    }

    return await this.PopupService.deletePopup(pop_ids);
  }

  @Get('member/:id')
  @Render('admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async memberView(@Param('id') mem_id: number) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const member = await this.memberService.getOneMember(mem_id);
    return { page: 'member/write.ejs', title: '회원정보수정', member: member };
  }

  @Get('board/write/:brd_key')
  @Render('admin/_layout/layout') // index.ejs 템플릿을 렌더x`링
  async postWrite(@Query('update') post_id: number) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    let post = null;
    if (post_id) {
      post = await this.PostService.getPost(post_id);
    }

    return { page: 'board/write.ejs', title: 'boardTitle', post: post };
  }

  @Post('/board/write/:brd_key')
  @Redirect('/admin/board/brd_key')
  async writePost(
    @Body() writePost: Partial<PostEntity>,
    @Req() req: Request,
  ): Promise<number> {
    let result = null;
    if (writePost.post_id) {
      result = this.PostService.updatePost(writePost);
    } else {
      delete writePost.post_id;
      writePost.post_register_ip = req.ip;
      result = this.PostService.createPost(writePost);
    }

    return result;
  }

  @Post('/post/delete')
  @Redirect('/admin/board/brd_key')
  async deletePost(@Body('post_id') post_id: number) {
    // post_id를 Body에서 가져옴
    await this.PostService.deletePost(post_id); // post_id를 사용하여 삭제
    return true;
  }

  @Get('board/:brd_key')
  @Render('admin/_layout/layout')
  async list(
    @Param('brd_key') brd_key: string,
    @Query('cat_id') cat_id: string,
    @Query('page') page: number,
  ) {
    // TODO: 비로그인 시 admin 접근 로그인 처리
    // TODO: 관리자가 아닐 경우 user 메인으로 리다이렉트

    const brd_id = '1'; // brd_key를 사용해서 실제 board 정보를 가져올 수 있음
    const total = await this.PostService.getListTotal(brd_id); // 총 게시물 수 가져오기
    const pagenation = this.CommonService.pagenation(total, 10, 10, page); // 페이지네이션 처리

    const list = await this.PostService.getListPost(
      pagenation.offset,
      pagenation.limit,
    );

    // 게시물의 날짜를 형식화하여 `post_display_date` 필드에 추가
    const posts = list.map((post) => ({
      ...post,
      post_display_date: this.CommonService.formattedDatetime(
        post.post_update_datetime,
      ),
    }));

    // 렌더링할 데이터 반환
    return {
      page: 'board/list.ejs',
      title: 'boardTitle',
      data: posts, // list 대신 posts를 반환
      paging: pagenation, // 페이지네이션 정보
    };
  }

  @Get('post/:post_id')
  @Render('admin/_layout/layout')
  async post(@Param('post_id') post_id: number) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const post = await this.PostService.getPost(post_id);
    return { page: 'board/view.ejs', title: 'boardTitle', data: post };
  }
}
