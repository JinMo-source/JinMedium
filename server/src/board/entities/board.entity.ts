import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsArray, IsString } from 'class-validator';
import { User } from '../../users/entities/User.entity';
import { BoardTagsEntity } from 'src/tags/entities/board_tags.entity';

@Entity()
@ObjectType()
export class Board extends CoreEntity {
  @IsString()
  @Field(() => String)
  @Column({ nullable: true })
  title: string;

  @IsArray()
  @Field(() => [String])
  @Column({ type: 'jsonb' })
  content: object[];

  @IsArray()
  @ManyToOne(
    (type) => BoardTagsEntity,
    (boardTagsEntity) => boardTagsEntity.board,
  )
  @JoinColumn({ name: 'BoardTag_Id' })
  tag: BoardTagsEntity;

  @IsArray()
  @ManyToOne((type) => User, (user) => user.board)
  @JoinColumn({ name: 'User_id' })
  writer: User;
}
