import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Board } from 'src/board/entities/board.entity';
import { TagsEntity } from './tags.entity';

@Entity()
@ObjectType()
export class BoardTagsEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Board, (board) => board.boardTags, { onDelete: 'CASCADE' })
  @JoinTable()
  board: Board;

  @ManyToOne(() => TagsEntity, (tagsEntity) => tagsEntity.boardTags, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  tags: TagsEntity;
}
