import { Body, Controller, Post } from '@nestjs/common';
import { MemberEntity } from '../entities/member.entity';
import { MemberService } from './member.service';

@Controller('')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/register')
  async registerMember()
  {
    return "registerMember";
  }
  // async registerMember(
  //   @Body() createMemberDto: Partial<MemberEntity>,
  // ): Promise<MemberEntity> {
  //   return this.memberService.registerMember(createMemberDto);
  // }
}
