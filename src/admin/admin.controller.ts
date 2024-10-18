import {
  Body,
  Controller,
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

// TODO: .env 에서 admin 주소 변경가능하게끔 기존 conf 는 env 에 넣는다.
@Controller('admin')
export class AdminController {
  constructor(
    private readonly memberService: MemberService,
    private readonly PostService: PostService,
    private readonly CommonService: CommonService,
    private readonly MenuService: MenuService,
  ) {}

  @Get('')
  @Render('_admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async main() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    return { page: 'main.ejs', message: 'Here is ADMIN MAIN!' };
  }

  @Get('memberList')
  @Render('_admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async memberList() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const allMember = await this.memberService.getAllMember();

    return { page: 'member/list.ejs', title: '회원관리', members: allMember };
  }

  @Get('layout/sitemap')
  @Render('_admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async siteMap() {
    const data = await this.MenuService.getMenu();
    return {
      page: 'layout/list.ejs',
      title: '사이트맵 설정',
      data: data,
    };
  }
  @Get('layout/sitemap/write/:depth')
  @Render('_admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async menuWrite(@Param('depth') depth, @Query('update') men_id) {
    let menu = null;
    let title = '사이트맵 등록';
    if (men_id) {
      // menu = await this.PostService.getPost(post_id);
      title = '사이트맵 수정';
    }
    const data = '';
    return {
      page: 'layout/write.ejs',
      title: title,
      data: data,
    };
  }

  @Post('layout/sitemap/write/:parent')
  @Redirect('/admin/layout/sitemap')
  async menuWritePost(@Param('parent') parent, @Body() menuWrite){
    const men_id = await this.MenuService.writeMenu(parent, menuWrite);
   return men_id;
  }

  @Get('member/:id')
  @Render('_admin/_layout/layout') // index.ejs 템플릿을 렌더링
  async memberView(@Param('id') mem_id: number) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const member = await this.memberService.getOneMember(mem_id);
    return { page: 'member/write.ejs', title: '회원정보수정', member: member };
  }

  @Get('board/write/:brd_key')
  @Render('_admin/_layout/layout') // index.ejs 템플릿을 렌더x`링
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
  @Render('_admin/_layout/layout')
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
  @Render('_admin/_layout/layout')
  async post(@Param('post_id') post_id: number) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const post = await this.PostService.getPost(post_id);
    return { page: 'board/view.ejs', title: 'boardTitle', data: post };
  }
}
