import { Controller, Get, Param, Post, Query, Redirect, Render } from '@nestjs/common';
import { MemberService } from '../member/member.service';

// TODO: .env 에서 admin 주소 변경가능하게끔 기존 conf 는 env 에 넣는다.
@Controller('admin')
export class AdminController {
  constructor(private readonly memberService: MemberService) { }

  @Get('')
  @Render('admin/layout/layout') // index.ejs 템플릿을 렌더링
  async main() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    return { page: 'main.ejs', message: 'Here is ADMIN MAIN!' };
  }

  @Get('memberList')
  @Render('admin/layout/layout') // index.ejs 템플릿을 렌더링
  async memberList() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const allMember = await this.memberService.getAllMember();

    return { page: 'memberList.ejs', title: '회원관리', members: allMember };
  }

  @Get('member/:id')
  @Render('admin/layout/layout') // index.ejs 템플릿을 렌더링
  async memberView(@Param('id') mem_id: number) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const member = await this.memberService.getOneMember(mem_id);
    return { page: 'memberWrite.ejs', title: '회원정보수정', member: member };
  }

  @Get('board/write/:board_key')
  @Render('admin/layout/layout') // index.ejs 템플릿을 렌더x`링
  async postWrite() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    console.log('board/write');
    const post = await this.memberService.getAllMember();

    return { page: 'boardWrite.ejs', title: 'boardTitle', data: post };
  }
  @Post('/board/write/:board_key')
  @Redirect('/admin/board/brd_key')
  async writePost(@Param('board_key') board_key: string){
    return `Redirecting to admin/board/${board_key}`;

  }

  @Get('board/:key')
  @Render('admin/layout/layout') // index.ejs 템플릿을 렌더x`링
  async list(@Param('key') board_key: string, @Query('category_id') category_id: string) {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    console.log('Board Key:', board_key);
    console.log('Category ID:', category_id);

    const list = await this.memberService.getAllMember();

    return { page: 'boardList.ejs', title: 'boardTitle', data: list };
  }

}
