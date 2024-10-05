import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../mikro-orm.config'; // 설정 파일 import

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig), // MikroORM 설정 추가
    // MikroOrmModule.forFeature([User]), //  MikroORM 엔티티 추가 확인 필요
    AdminModule, UserModule],
  controllers: [AdminController, UserController],
  // providers: [AppService],
})
export class AppModule {}
