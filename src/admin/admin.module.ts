import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { MemberService } from '../member/member.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MemberEntity } from '../entities/member.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([MemberEntity]),
  ],
  controllers: [AdminController],
  providers: [MemberService],
})
export class AdminModule {}
