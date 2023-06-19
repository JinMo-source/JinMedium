import { ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { IsString, IsArray } from 'class-validator';
import { Board } from 'src/board/entities/board.entity';
import { BoardTagsEntity } from './board_tags.entity';

@Entity()
@ObjectType()
export class TagsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsArray()
  @Column()
  tags: [string];

  @ManyToOne(() => BoardTagsEntity, { lazy: true })
  @JoinColumn()
  boardTags: BoardTagsEntity;
}
