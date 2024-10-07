import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config'; // MikroORM 설정 파일 경로

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    AdminModule, UserModule],
  controllers: [AdminController, UserController],
  // providers: [AppService],
})
export class AppModule {}
