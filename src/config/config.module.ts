import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigEntity } from '../entities/Config';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [MikroOrmModule.forFeature([ConfigEntity])],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
