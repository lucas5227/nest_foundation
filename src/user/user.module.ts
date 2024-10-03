import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module'; // AdminModule을 import
import { UserController } from './user.controller';

@Module({
  imports: [AdminModule],
  controllers: [UserController], // AdminModule을 import하여 사용
})
export class UserModule {}
