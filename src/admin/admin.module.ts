import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CommonService } from '../common/common.service';
import { AdminController } from './admin.controller';
import { MemberService } from '../member/member.service';
import { MemberEntity } from '../entities/member.entity';
import { PostEntity } from '../entities/Post';
import { PostService } from '../post/post.service';
import { MenuService } from '../menu/menu.service';
import { MenuEntity } from '../entities/Menu';

@Module({
  imports: [MikroOrmModule.forFeature([MemberEntity, PostEntity, MenuEntity])],
  controllers: [AdminController],
  providers: [MemberService, PostService, CommonService, MenuService],
})
export class AdminModule {}
