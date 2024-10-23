import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PopupEntity } from '../entities/Popup';
import { PopupService } from './popup.service';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [PopupEntity] })],
  exports: [PopupService],
  providers: [PopupService],
})
export class PopupModule {}
