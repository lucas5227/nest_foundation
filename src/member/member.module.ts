// src/member/member.module.ts
import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MemberEntity } from '../entities/Member';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';

@Module({
  imports: [
    MikroOrmModule.forFeature([MemberEntity]), // MemberEntity를 MikroORM 모듈에 등록
  ],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService], // 다른 모듈에서 사용할 수 있도록 서비스 export
})
export class MemberModule {}
