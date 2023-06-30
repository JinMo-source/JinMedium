import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
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

  @OneToMany(() => BoardTagsEntity, (boardTagsEntity) => boardTagsEntity.tags)
  boardTags: BoardTagsEntity;
}
