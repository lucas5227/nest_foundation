import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Delete,
  Put,
  Res,
  Query, Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service'; // Adjust the import path as needed
import { Response } from 'express';
import { Readable } from 'stream';
import { FileService } from '../file/file.service'; // Import Readable from stream module

@Controller('minio')
export class MinioController {
  constructor(private readonly minioService: MinioService,
              private readonly fileService: FileService) {}

  // File upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name in form-data
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('type') type: string,
  ): Promise<{ message: string; originalName: string; hashedName: string }> {
    console.log('type: ', type);
    const result = await this.minioService.uploadFile(file);
    await this.fileService.insertFile(result, type);
    return {
      message: 'File uploaded successfully',
      originalName: result.originalName,
      hashedName: result.hashedName,
    };
  }

  // File download
  @Get('download/:fileName')
  async downloadFile(
    @Param('fileName') fileName: string,
    @Res() res: Response,
  ) {
    const fileStream = await this.minioService.downloadFile(fileName);

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

    // Check if Body is Buffer or Readable Stream
    if (Buffer.isBuffer(fileStream.Body)) {
      // If it's a Buffer
      res.send(fileStream.Body);
    } else if (fileStream.Body instanceof Readable) {
      // If it's a Readable Stream
      fileStream.Body.pipe(res); // Stream the file to the response
    } else {
      // Handle other types with an error response
      res.status(500).send('Invalid file stream');
    }
  }

  // File deletion
  @Delete('delete')
  async deleteFile(@Body('fileName') fileName: string): Promise<string> {
    console.log('fileName: ', fileName);
    return this.minioService.deleteFile(fileName);
  }

  // File update
  @Put('update/:oldFileName')
  @UseInterceptors(FileInterceptor('file'))
  async updateFile(
    @Param('oldFileName') oldFileName: string,
    @UploadedFile() newFile: Express.Multer.File,
  ): Promise<string> {
    return this.minioService.updateFile(oldFileName, newFile);
  }

  @Get('file/:name')
  async getFile(@Param('name') name: string) {
    return await this.fileService.getFileByHashedName(name);
  }
}
