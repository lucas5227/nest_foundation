import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Inject, forwardRef } from '@nestjs/common';
import { MinioConfigService } from '../minio-config/minio-config.service';

@Injectable()
export class MinioService {
  private s3: S3;

  constructor(
    @Inject(forwardRef(() => MinioConfigService)) private minioConfigService: MinioConfigService,
  ) {
    this.s3 = new S3({
      endpoint: this.minioConfigService.get('MINIO_ENDPOINT'),
      accessKeyId: this.minioConfigService.get('MINIO_ACCESS_KEY'),
      secretAccessKey: this.minioConfigService.get('MINIO_SECRET_KEY'),
      region: this.minioConfigService.get('MINIO_REGION') || 'ap-northeast-2', // 서울 리전
      s3ForcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const params = {
      Bucket: 'your-bucket-name', // 여기에 실제 버킷 이름을 입력하세요
      Key: file.originalname,
      Body: file.buffer,
    };
    await this.s3.upload(params).promise();
    return `File uploaded successfully: ${file.originalname}`;
  }

  async downloadFile(fileName: string): Promise<S3.GetObjectOutput> {
    const params = {
      Bucket: 'your-bucket-name', // 여기에 실제 버킷 이름을 입력하세요
      Key: fileName,
    };
    return this.s3.getObject(params).promise();
  }

  async deleteFile(fileName: string): Promise<string> {
    const params = {
      Bucket: 'your-bucket-name', // 여기에 실제 버킷 이름을 입력하세요
      Key: fileName,
    };
    await this.s3.deleteObject(params).promise();
    return `File deleted successfully: ${fileName}`;
  }

  async updateFile(oldFileName: string, newFile: Express.Multer.File): Promise<string> {
    // 기존 파일 삭제
    await this.deleteFile(oldFileName);

    // 새로운 파일 업로드
    const params = {
      Bucket: 'your-bucket-name', // 여기에 실제 버킷 이름을 입력하세요
      Key: newFile.originalname,
      Body: newFile.buffer,
    };
    await this.s3.upload(params).promise();
    return `File updated successfully: ${newFile.originalname}`;
  }
}
