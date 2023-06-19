import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { IsString } from 'class-validator';

import { BoardTagsEntity } from './board_tags.entity';

@Entity()
@ObjectType()
export class TagsEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Field(() => String)
  @Column({ type: String })
  tags: string;

  @ManyToOne(() => BoardTagsEntity)
  @JoinColumn()
  boardTags: BoardTagsEntity;
}
