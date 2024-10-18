import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MenuService } from './menu.service';
import { MenuEntity } from '../entities/Menu';
import { PageEntity } from '../entities/Page';
import { BoardEntity } from '../entities/Board';
@Module({
  imports: [MikroOrmModule.forFeature([MenuEntity, PageEntity, BoardEntity])],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
