import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';
import { MemberModule } from './member/member.module';
import mikroOrmConfig from './mikro-orm.config'; // MikroORM 설정 파일 경로

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    AdminModule, //관리자
    UserModule, //사용자
    MemberModule, //회원
  ],
  controllers: [AdminController, UserController, MemberController],
  providers: [MemberService],
})
export class AppModule {}
