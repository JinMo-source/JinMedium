import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsArray, IsString } from 'class-validator';
import { User } from '../../users/entities/User.entity';
import { BoardTagsEntity } from 'src/tags/entities/board_tags.entity';
import { CombinedBoardEntity } from 'src/combined_board/entities/combined_board.entity';

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

  @OneToOne(() => CombinedBoardEntity, (combinedBoard) => combinedBoard.board)
  @JoinColumn()
  combinedBoard: CombinedBoardEntity;

  @OneToMany(() => BoardTagsEntity, (boardTagsEntity) => boardTagsEntity.board)
  boardTags: BoardTagsEntity[];

  @ManyToOne(() => User, (user) => user.board)
  @JoinColumn({ name: 'User_id' })
  writer: User;
}
