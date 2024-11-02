import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((res) => {
        expect(res.headers['content-type']).toContain('text/html'); // HTML 형식인지 확인
        expect(res.text).toContain('<html'); // 응답에 HTML 태그가 포함되어 있는지 확인
        expect(res.text).toContain('<body'); // 응답에 body 태그가 포함되어 있는지 확인
      });
  });
});
