import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module'; // AdminModule을 import
import { UserController } from './user.controller';
import { MenuModule } from '../menu/menu.module';
import { PageModule } from '../page/page.module';
import { PostModule } from '../post/post.module';
import { CommonService } from '../common/common.service';

@Module({
  imports: [AdminModule, MenuModule, PageModule, PostModule],
  providers: [CommonService],
  controllers: [UserController], // AdminModule을 import하여 사용
})
export class UserModule {}
