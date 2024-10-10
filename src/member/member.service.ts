// src/member/member.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MemberEntity } from '../entities/member.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: EntityRepository<MemberEntity>,
    private readonly em: EntityManager, // EntityManager 주입
  ) {}

  /**
   * 새로운 회원 등록 메서드
   * @param createMemberDto 새로운 회원의 정보를 포함한 DTO (Partial<MemberEntity> 타입)
   * @returns 등록된 회원 엔티티 객체
   */
  async registerMember(
    createMemberDto: Partial<MemberEntity>,
  ): Promise<MemberEntity> {
    // DTO 데이터를 사용하여 새로운 회원 엔티티 생성
    const newMember = this.memberRepository.create(createMemberDto);

    // EntityManager의 persistAndFlush 메서드를 사용하여 데이터베이스에 저장
    // await this.em.persist(newMember).flush();
    await this.em.persistAndFlush(newMember);
    return newMember; // 등록된 회원 엔티티 객체 반환
  }

  /**
   * 모든 회원 정보를 조회하는 메서드
   * @returns 모든 회원 엔티티 배열
   */
  async getAllMember(): Promise<MemberEntity[]> {
    const members = await this.memberRepository.findAll();
    return members;
  }

  async deleteMember(mem_id: number): Promise<void> {
    // id를 기준으로 회원을 조회하기 위해 객체로 전달합니다.
    const member = this.getOneMember(mem_id)
    if (!member) {
      throw new NotFoundException(`Member with ID ${mem_id} not found`);
    }
    await this.em.removeAndFlush(member); // 엔티티를 제거합니다.
  }

  async getOneMember(mem_id: number) {
    const member = await this.memberRepository.findOne({ mem_id: mem_id });
    return member;
  }
}
