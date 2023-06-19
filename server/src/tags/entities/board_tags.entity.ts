import { ObjectType } from '@nestjs/graphql';
import { Entity, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Board } from 'src/board/entities/board.entity';
import { TagsEntity } from './tags.entity';

@Entity()
@ObjectType()
export class BoardTagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Board, { lazy: true })
  board: Promise<Board>;

  @OneToMany(() => TagsEntity, (TagsEntity) => TagsEntity.boardTags, {
    cascade: true,
  })
  tags: TagsEntity;
}
