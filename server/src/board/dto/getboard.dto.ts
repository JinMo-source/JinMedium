import { ObjectType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { Board } from '../entities/board.entity';

@ObjectType()
export class GetRecentCombinedBoard {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  subTitle: string;

  @Field()
  @IsString()
  imagePath: string;

  @Field()
  board: Board;
}

@ObjectType()
export class GetRecentBoard {
  @Field()
  @IsNumber()
  id: number;

  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  subTitle: string;

  @Field()
  @IsString()
  imagePath: string;

  @Field()
  board: Board;
}
