import { Controller, Get, Render } from '@nestjs/common';

// TODO: .env 에서 admin 주소 변경가능하게끔 기존 conf 는 env 에 넣는다.
@Controller('admin')
export class AdminController {
  @Get('')
  @Render('admin/index') // index.ejs 템플릿을 렌더링
  main() {
    return { message: 'Here is ADMIN MAIN!' };
  }
}
