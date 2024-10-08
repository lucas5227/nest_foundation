import { Body, Controller, Post } from '@nestjs/common';
import { MemberEntity } from '../entities/member.entity';
import { MemberService } from './member.service';

@Controller('')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/register')
  async registerMember(
    @Body() createMemberDto: Partial<MemberEntity>,
  ): Promise<MemberEntity> {
    console.log(createMemberDto);
    console.log("LK::");
    return this.memberService.registerMember(createMemberDto);
  }
}
