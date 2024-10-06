import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// 404
// import { NotFoundExceptionFilter } from "./http-exception/http-exception.filter";\
// postgre 접속확인
// import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
console.log(__dirname);
console.log(__dirname);
console.log(process.cwd());
  // EJS 템플릿 엔진 설정
  app.setViewEngine('ejs');
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  // 정적 파일 제공 (Bootstrap 및 기타 CSS, JS 파일)
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(process.cwd(), 'public'));

  // 예외 필터 등록 (글로벌 스코프) 하지만 와일드 카드로 라우트 하기떄문에 사용안함
  // app.useGlobalFilters(new NotFoundExceptionFilter());


  await app.listen(3000);
}
bootstrap();
