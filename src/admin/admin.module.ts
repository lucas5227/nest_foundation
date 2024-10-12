import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MemberService } from '../member/member.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MemberEntity } from '../entities/member.entity';
import { PostEntity } from '../entities/Post';
import { PostService } from '../post/post.service';

@Module({
  imports: [MikroOrmModule.forFeature([MemberEntity, PostEntity])],
  controllers: [AdminController],
  providers: [MemberService, PostService],
})
export class AdminModule {}
