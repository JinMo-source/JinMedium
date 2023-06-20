import { Injectable } from '@nestjs/common';
import { TagsInput, TagsOutput } from './dto/tags.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsEntity } from './entities/tags.entity';
import { Repository } from 'typeorm';
import { BoardTagsEntity } from './entities/board_tags.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Board } from 'src/board/entities/board.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsEntity)
    private tagsEntity: Repository<TagsEntity>,
    @InjectRepository(BoardTagsEntity)
    private boardTagsEntity: Repository<BoardTagsEntity>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async GetTags(tagsInput: TagsInput): Promise<TagsOutput> {
    try {
      const TagsData = tagsInput.tags;
      for (const item of TagsData) {
        const existingItem = await this.tagsEntity.findOne({
          where: { tags: item },
        });
        if (!existingItem) {
          console.log('X');
          await this.tagsEntity.save({ tags: item });
        }
      }

      const tagsToSave = [];
      for (const item of TagsData) {
        const existingItem = await this.tagsEntity.findOne({
          where: { tags: item },
        });
        if (!existingItem) {
          console.log('X');
          await this.tagsEntity.save({ tags: item });
        }
        tagsToSave.push(existingItem);
      }

      this.SaveBoardTags(tagsToSave);

      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: '태그를 추가하는데 실패했습니다.' };
    }
  }

  async SaveBoardTags(tagsToSave): Promise<TagsOutput> {
    try {
      console.log(tagsToSave);
      this.eventEmitter.removeAllListeners('BoardTags');
      this.eventEmitter.on('BoardTags', async (savedBoard: Board) => {
        for (const item of tagsToSave) {
          await this.boardTagsEntity.save({
            board: savedBoard,
            tags: item,
          });
        }
      });

      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false, error: `tags_Board :${error}` };
    }
  }
}
