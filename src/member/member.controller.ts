import { Body, Controller, Delete, Param, Post, Req } from '@nestjs/common';
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

  @Delete('layout/sitemap/delete')
  async deleteMenu(@Req() req: Request) { // Import the Request from 'express'
    console.log('Received request:', req.body); // Log the raw body of the request
  }
}
