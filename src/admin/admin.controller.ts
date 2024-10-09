import { Controller, Get, Render } from '@nestjs/common';
import { MemberService } from '../member/member.service';

// TODO: .env 에서 admin 주소 변경가능하게끔 기존 conf 는 env 에 넣는다.
@Controller('admin')
export class AdminController {
  constructor(private readonly memberService: MemberService) {}

  @Get('')
  @Render('admin/layout/layout') // index.ejs 템플릿을 렌더링
  async main() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    return {page:'main.ejs', message: 'Here is ADMIN MAIN!' };
  }

  @Get('memberList')
  @Render('admin/layout/layout') // index.ejs 템플릿을 렌더링
  async memberList() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    const allMember = await this.memberService.getAllMember();

    return {page:'memberList.ejs', title: '회원관리' , members:allMember};
  }
}
