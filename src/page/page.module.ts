import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PageEntity } from '../entities/Page';

@Module({
  imports: [MikroOrmModule.forFeature([PageEntity])],
})
export class PageModule {}
