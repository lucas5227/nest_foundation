import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BoardEntity } from '../entities/Board';

@Module({
  imports: [MikroOrmModule.forFeature([BoardEntity])],
})
export class BoardModule {}
