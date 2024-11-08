import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Inject, forwardRef } from '@nestjs/common';
import { MinioConfigService } from '../minio-config/minio-config.service';
import { createHash } from 'crypto'; // Import crypto to hash the file name
import * as path from 'path';


@Injectable()
export class MinioService {
  private s3: S3;

  constructor(
    @Inject(forwardRef(() => MinioConfigService))
    private minioConfigService: MinioConfigService,
  ) {
    this.s3 = new S3({
      endpoint: this.minioConfigService.get('MINIO_ENDPOINT'),
      accessKeyId: this.minioConfigService.get('MINIO_ACCESS_KEY'),
      secretAccessKey: this.minioConfigService.get('MINIO_SECRET_KEY'),
      region: this.minioConfigService.get('MINIO_REGION') || 'ap-northeast-2', // 서울 리전
      s3ForcePathStyle: true,
    });
  }

  // Check and create bucket if it does not exist
  private async ensureBucketExists(bucketName: string): Promise<void> {
    try {
      await this.s3.headBucket({ Bucket: bucketName }).promise();
    } catch (error) {
      if (error.statusCode === 404) {
        await this.s3.createBucket({ Bucket: bucketName }).promise();
        console.log(`Bucket created: ${bucketName}`);
      } else {
        console.error(`Error checking bucket: ${error.message}`);
        throw error;
      }
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<{
    originalName: string;
    hashedName: string;
    size: number;
    extension: string;
  }> {
    const bucketName =
      this.minioConfigService.get('MINIO_BUCKET_PREFIX') + 'bucket';
    await this.ensureBucketExists(bucketName); // Check and create bucket if needed
    // Create a hash for the file name
    const hash = createHash('sha256')
      .update(file.originalname + Date.now().toString())
      .digest('hex');
    const extension = path.extname(file.originalname).toLowerCase(); // Get the file extension
    // console.log('extension: ', file.originalname); //IMG_1290.JPG
    const hashedName = `${hash}${extension}`; // Combine hash with the extension

    const params = {
      Bucket: bucketName,
      Key: hashedName, // Use the hashed name as the key
      Body: file.buffer,
    };

    await this.s3.upload(params).promise(); // Upload the file

    return {
      originalName: file.originalname,
      hashedName: hashedName,
      size: file.size,
      extension: extension,
    };
  }

  async downloadFile(fileName: string): Promise<S3.GetObjectOutput> {
    const bucketName =
      this.minioConfigService.get('MINIO_BUCKET_PREFIX') + 'bucket';
    await this.ensureBucketExists(bucketName); // Check bucket existence

    const params = {
      Bucket: bucketName,
      Key: fileName,
    };
    return this.s3.getObject(params).promise();
  }

  async deleteFile(fileName: string): Promise<string> {
    const bucketName =
      this.minioConfigService.get('MINIO_BUCKET_PREFIX') + 'bucket';
    await this.ensureBucketExists(bucketName); // Check bucket existence

    const params = {
      Bucket: bucketName,
      Key: fileName,
    };
    const result = await this.s3.deleteObject(params).promise();
    console.log('result', result);
    return `File deleted successfully: ${fileName}`;
  }

  async updateFile(
    oldFileName: string,
    newFile: Express.Multer.File,
  ): Promise<string> {
    const bucketName =
      this.minioConfigService.get('MINIO_BUCKET_PREFIX') + 'bucket';
    await this.ensureBucketExists(bucketName); // Check bucket existence

    // Delete existing file
    await this.deleteFile(oldFileName);

    // Create a hash for the new file name
    const hash = createHash('sha256')
      .update(newFile.originalname + Date.now().toString())
      .digest('hex');
    const extension = path.extname(newFile.originalname); // Get the file extension
    const hashedName = `${hash}${extension}`; // Combine hash with the extension

    // Upload the new file
    const params = {
      Bucket: bucketName,
      Key: hashedName, // Use the hashed name as the key
      Body: newFile.buffer,
    };
    await this.s3.upload(params).promise();
    return `File updated successfully: ${hashedName}`;
  }
}
