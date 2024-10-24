import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioConfigService } from './minio-config.service'; // 경로에 맞게 수정

@Module({
  imports: [ConfigModule], // ConfigModule 임포트
  providers: [MinioConfigService], // MinioConfigService 제공
  exports: [MinioConfigService], // 다른 모듈에서 사용할 수 있도록 내보내기
})
export class MinioConfigModule {}
