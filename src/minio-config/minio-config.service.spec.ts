import { Test, TestingModule } from '@nestjs/testing';
import { MinioConfigService } from './minio-config.service';

describe('MinioConfigService', () => {
  let service: MinioConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MinioConfigService],
    }).compile();

    service = module.get<MinioConfigService>(MinioConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
