import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MinioService } from './minio.service';
import { MinioConfigModule } from '../minio-config/minio-config.module'; // 경로에 맞게 수정
import { FileEntity } from '../entities/File';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [FileEntity] }),
    MinioConfigModule, // MinioConfigModule 추가
  ],
  exports: [MinioService],
  providers: [MinioService],
})
export class MinioModule {}
