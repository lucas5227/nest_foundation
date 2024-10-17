import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MenuService } from './menu.service';
import { MenuEntity } from '../entities/Menu';
@Module({
  imports: [MikroOrmModule.forFeature([MenuEntity])],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
