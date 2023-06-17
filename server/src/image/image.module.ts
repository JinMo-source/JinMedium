import { Module } from '@nestjs/common';

import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from './entity/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity])],

  providers: [ImageService],
})
export class ImageModule {}
