import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { MemberEntity } from '../entities/Member';
import { MemberService } from './member.service';

@Controller('')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('/member/register')
  async registerMember(
    @Body() createMemberDto: Partial<MemberEntity>,
  ): Promise<MemberEntity> {
    return this.memberService.registerMember(createMemberDto);
  }

  @Delete('/member/delete/:id')
  async deleteMember(@Param('id') mem_id: number) {
    return this.memberService.deleteMember(mem_id);
  }
}
