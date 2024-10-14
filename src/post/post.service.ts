import { Injectable, NotFoundException } from '@nestjs/common';
import { PostEntity } from '../entities/Post';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: EntityRepository<PostEntity>,
    private readonly em: EntityManager,
  ) {}

  /**
   * 새로운 게시물 등록 메서드
   * @param createPostDto 새로운 게시물의 정보를 포함한 DTO (Partial<PostEntity> 타입)
   * @returns 등록된 게시물의 ID
   */
  async createPost(createPostDto: Partial<PostEntity>): Promise<number> {
    const newPost = this.postRepository.create(createPostDto);
    await this.em.persistAndFlush(newPost);

    return newPost.post_id;
  }

  /**
   * 모든 게시물 정보를 조회하는 메서드
   * @param offset 시작 위치
   * @param limit 가져올 항목 수
   * @returns 모든 게시물 엔티티 배열
   */
  async getListPost(offset: number, limit: number = 0): Promise<PostEntity[]> {
    const posts = await this.postRepository.findAll({
      limit: limit,
      offset: offset,
    });
    return posts;
  }

  /**
   * 특정 게시물을 조회하는 메서드
   * @param post_id 조회할 게시물의 ID
   * @returns 요청한 게시물 엔티티
   * @throws NotFoundException 게시물이 존재하지 않는 경우
   */
  async getPost(post_id: number): Promise<PostEntity> {
    const post = await this.postRepository.findOne({ post_id }); // findOne 사용으로 수정
    if (!post) {
      throw new NotFoundException(`Post with id ${post_id} not found`); // 템플릿 리터럴로 수정
    }

    return post;
  }
}
