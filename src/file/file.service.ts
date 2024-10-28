import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { FileEntity } from '../entities/File';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity) // 올바른 엔티티 클래스인 FileEntity를 사용
    private readonly fileRepository: EntityRepository<FileEntity>,
    private readonly em: EntityManager,
  ) {}

  async insertFile(file: any, type: string) {
    // Partial<FileEntity>의 형태로 객체를 생성 및 속성 할당
    const createFileDto: Partial<FileEntity> = {
      file_original_name: file.originalName,
      file_hashed_name: file.hashedName,
      file_size: file.size,
      mem_id: 1, // TODO: 회원번호 입력
      file_type: type,
    };
    console.log(createFileDto);
    const fileEntity = this.fileRepository.create(createFileDto);
    await this.em.persistAndFlush(fileEntity);

    return fileEntity;
  }

  async getFileByHashedName(hashedName: string) {
    return await this.fileRepository.findOne({ file_hashed_name: hashedName });
  }
}
