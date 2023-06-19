import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Board } from 'src/board/entities/board.entity';
import { TagsEntity } from './tags.entity';

@Entity()
@ObjectType()
export class BoardTagsEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Board, (board) => board.tag, {
    cascade: true,
  })
  board: Board;

  @OneToMany(() => TagsEntity, (TagsEntity) => TagsEntity.boardTags, {
    cascade: true,
  })
  tags: TagsEntity;
}
