//src/app.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';

import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';

import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';

import { MemberController } from './member/member.controller';
import { MemberModule } from './member/member.module';

import { CommonService } from './common/common.service';

import { ConfigModule } from './config/config.module';

import { MenuModule } from './menu/menu.module';
import { PostModule } from './post/post.module';
import { PageModule } from './page/page.module';
import { BoardModule } from './board/board.module';
import { PopupModule } from './popup/popup.module';

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
    ConfigModule,
    PopupModule,
  ],
  controllers: [AdminController, UserController, MemberController],
  providers: [CommonService],
  // providers: [MemberService], // 이 줄을 제거합니다.
})
export class AppModule {}
