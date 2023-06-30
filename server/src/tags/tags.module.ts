import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsEntity } from './entities/tags.entity';
import { BoardTagsEntity } from './entities/board_tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagsEntity, BoardTagsEntity])],
  providers: [TagsService, TagsResolver],
})
export class TagsModule {}
