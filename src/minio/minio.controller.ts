import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Delete, Put, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service'; // 경로에 맞게 수정
import { Response } from 'express';
import { Readable } from 'stream'; // stream 모듈에서 Readable 임포트

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  // 파일 업로드
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file'은 form-data의 필드 이름
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.minioService.uploadFile(file);
  }

  // 파일 다운로드
  @Get('download/:fileName')
  async downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    const fileStream = await this.minioService.downloadFile(fileName);

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    // Body가 Buffer인지 또는 Readable Stream인지 확인 후 처리
    if (Buffer.isBuffer(fileStream.Body)) {
      // Buffer인 경우
      res.send(fileStream.Body);
    } else if (fileStream.Body instanceof Readable) {
      // Readable Stream인 경우
      fileStream.Body.pipe(res); // 파일을 스트리밍하여 응답
    } else {
      // 다른 타입인 경우 오류 처리
      res.status(500).send('Invalid file stream');
    }
  }

  // 파일 삭제
  @Delete('delete/:fileName')
  async deleteFile(@Param('fileName') fileName: string): Promise<string> {
    return this.minioService.deleteFile(fileName);
  }

  // 파일 업데이트
  @Put('update/:oldFileName')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Param('oldFileName') oldFileName: string,
    @UploadedFile() newFile: Express.Multer.File,
  ): Promise<string> {
    return this.minioService.updateFile(oldFileName, newFile);
  }
}
