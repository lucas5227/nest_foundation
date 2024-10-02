import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { AdminModule } from './admin/admin.module';
import { AdminController } from './admin/admin.controller';

@Module({
  imports: [AdminModule, UserModule],
  controllers: [AdminController, UserController],
  // providers: [AppService],
})
export class AppModule {}
