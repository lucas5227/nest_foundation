import { Controller, Get, Param } from '@nestjs/common';

@Controller('')
export class UserController {
  @Get(':path(*)') // 경로를 와일드카드 `(*)`로 모두 받아오기
  async route(@Param('path') path: string) {
    return path;
  }
}
