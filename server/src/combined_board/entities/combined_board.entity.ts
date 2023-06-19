import { ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { IsString } from 'class-validator';
import { Board } from 'src/board/entities/board.entity';

@Entity()
@ObjectType()
export class CombinedBoardEntity extends CoreEntity {
  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column()
  subTitle: string;

  @IsString()
  @Column()
  imagePath: string;

  @OneToOne((type) => Board, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'Board_Id' })
  Board: Board;
}
