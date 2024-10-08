//src/app.module.ts
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

// src/app.module.ts
@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    AdminModule,
    UserModule,
    MemberModule, // 회원 모듈 추가
  ],
  controllers: [AdminController, UserController, MemberController],
  // providers: [MemberService], // 이 줄을 제거합니다.
})
export class AppModule {}
