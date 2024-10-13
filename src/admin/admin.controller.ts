import { Body, Controller, Get, Param, Post, Query, Redirect, Render, Req } from '@nestjs/common';
import { MemberService } from '../member/member.service';
import { PostService } from '../post/post.service';
import { PostEntity } from '../entities/Post';
import { Request } from 'express';

// TODO: .env 에서 admin 주소 변경가능하게끔 기존 conf 는 env 에 넣는다.
@Controller('admin')
export class AdminController {
  constructor(
    private readonly memberService: MemberService,
    private readonly PostService: PostService,
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
  async postWrite() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const post = await this.memberService.getAllMember();

    return { page: 'board/write.ejs', title: 'boardTitle', data: post };
  }

  @Post('/board/write/:brd_key')
  @Redirect('/admin/board/brd_key')
  async createPost(
    @Body() createPost: Partial<PostEntity>,
    @Req() req: Request,
  ): Promise<number> {
    createPost.post_register_ip = req.ip;
    return this.PostService.createPost(createPost);
  }

  @Get('board/:brd_key')
  @Render('_admin/_layout/layout')
  async list(
    @Param('brd_key') brd_key: string,
    @Query('cat_id') cat_id: string,
    @Query('page') page: number,
  ) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const limit = 10; // 페이지당 항목 수
    const offset = (page - 1) * limit; // 현재 페이지에 따라 offset 계산
    const list = await this.PostService.getListPost(offset, limit);

    return { page: 'board/list.ejs', title: 'boardTitle', data: list };
  }

  @Get('post/:post_id')
  @Render('_admin/_layout/layout')
  async post( @Param('post_id') post_id: number) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const post = await this.PostService.getPost(post_id);
    return { page: 'board/view.ejs', title: 'boardTitle', data: post };
  }
}
