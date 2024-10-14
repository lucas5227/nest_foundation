import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PostEntity } from '../entities/Post';
import { PostService } from './post.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([PostEntity]), // MemberEntity를 MikroORM 모듈에 등록
  ],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
