import { Field, ObjectType } from '@nestjs/graphql';
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
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  @Field(() => String)
  title: string;

  @IsString()
  @Column()
  @Field(() => String)
  subTitle: string;

  @IsString()
  @Column()
  @Field(() => String)
  imagePath: string;

  @OneToOne(() => Board, { lazy: true })
  @JoinColumn()
  board: Promise<Board>;
}
