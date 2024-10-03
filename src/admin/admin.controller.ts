import { Controller, Get } from '@nestjs/common';

// TODO: .env 에서 admin 주소 변경가능하게끔 기존 conf 는 env 에 넣는다.
@Controller('admin')
export class AdminController {
  @Get('')
  main(): string {
    return 'Here is ADMIN MAIN!';
  }
}
