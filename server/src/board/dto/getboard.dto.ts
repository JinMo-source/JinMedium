import { ObjectType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ObjectType()
export class GetRecentCombinedBoard {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  subTitle: string;

  @Field()
  @IsString()
  imagePath: string;
}

@ObjectType()
export class GetRecentBoard {
  @Field()
  @IsString()
  content: string;

  @Field()
  @IsString()
  createAt: string;
}
