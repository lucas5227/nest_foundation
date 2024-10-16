//src/app.module.ts
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MemberController } from './member/member.controller';
import { MemberModule } from './member/member.module';
import { PostModule } from './post/post.module';
import { CommonService } from './common/common.service';
import { MenuService } from './menu/menu.service';
import { MenuModule } from './menu/menu.module';
import { PageModule } from './page/page.module';
import mikroOrmConfig from './mikro-orm.config';
import { BoardModule } from './board/board.module'; // MikroORM 설정 파일 경로

// src/app.module.ts
@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    AdminModule,
    UserModule,
    MemberModule,
    PostModule,
    MenuModule,
    PageModule,
    BoardModule,
  ],
  controllers: [AdminController, UserController, MemberController],
  providers: [CommonService],
  // providers: [MemberService], // 이 줄을 제거합니다.
})
export class AppModule {}
