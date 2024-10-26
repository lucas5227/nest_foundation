import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CommonService } from '../common/common.service';
import { AdminController } from './admin.controller';
import { MemberService } from '../member/member.service';
import { MemberEntity } from '../entities/Member';
import { PostEntity } from '../entities/Post';
import { PostService } from '../post/post.service';
import { MenuService } from '../menu/menu.service';
import { MenuEntity } from '../entities/Menu';
import { PageEntity } from '../entities/Page';
import { BoardEntity } from '../entities/Board';
import { ConfigService } from '../config/config.service';
import { ConfigEntity } from '../entities/Config';
import { PopupEntity } from '../entities/Popup';
import { PopupService } from '../popup/popup.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      MemberEntity,
      PostEntity,
      MenuEntity,
      PageEntity,
      BoardEntity,
      ConfigEntity,
      PopupEntity,
    ]),
  ],
  controllers: [AdminController],
  providers: [
    MemberService,
    PostService,
    CommonService,
    MenuService,
    ConfigService,
    PopupService,
  ],
})
export class AdminModule {}
