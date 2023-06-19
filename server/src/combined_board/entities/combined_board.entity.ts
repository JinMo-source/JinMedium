import { ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, IsArray } from 'class-validator';
import { Board } from 'src/board/entities/board.entity';

@Entity()
@ObjectType()
export class CombinedBoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  title: string;

  @IsString()
  @Column()
  subTitle: string;

  @IsString()
  @Column()
  imagePath: string;

  @IsArray()
  @Column()
  tags: [string];

  @OneToOne(() => Board, { lazy: true })
  @JoinColumn()
  board: Promise<Board>;
}
