import { Controller, Get, Render } from '@nestjs/common';

// TODO: .env 에서 admin 주소 변경가능하게끔 기존 conf 는 env 에 넣는다.
@Controller('admin')
export class AdminController {
  @Get('')
  @Render('admin/index') // index.ejs 템플릿을 렌더링
  main() {
    // TODO: 비로그인시 admin 접근 로그인
    // TODO: 관리자 아닐때 user 메인으로
    return { message: 'Here is ADMIN MAIN!' };
  }
}
