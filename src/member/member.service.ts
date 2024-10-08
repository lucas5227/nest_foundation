// src/member/member.service.ts
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core'; // EntityManager 임포트
import { InjectRepository, InjectEntityManager } from '@mikro-orm/nestjs';
import { MemberEntity } from '../entities/member.entity';
import { EntityRepository } from '@mikro-orm/core';

@Injectable()
export class MemberService {
  // constructor(
  //   @InjectRepository(MemberEntity)
  //   private readonly memberRepository: EntityRepository<MemberEntity>, // MemberEntity Repository 주입
  //   @InjectEntityManager() private readonly em: EntityManager, // EntityManager 주입
  // ) {}
  //
  // // 모든 회원 조회 메서드
  // async findAll(): Promise<MemberEntity[]> {
  //   return this.memberRepository.findAll();
  // }
  //
  // // 특정 회원 조회 메서드
  // async findById(id: number): Promise<MemberEntity | null> {
  //   return this.memberRepository.findOne({ mem_id: id });
  // }
  //
  // // 새로운 회원 등록 메서드
  // async registerMember(createMemberDto: Partial<MemberEntity>): Promise<MemberEntity> {
  //   const newMember = this.memberRepository.create(createMemberDto);
  //   await this.em.persistAndFlush(newMember); // EntityManager의 persistAndFlush 메서드 사용
  //   return newMember;
  // }
}
