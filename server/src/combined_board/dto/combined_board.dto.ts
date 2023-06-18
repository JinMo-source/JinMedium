import { IsString } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/core-output.dto';

@InputType()
export class CombinedBoard {
  @IsString()
  @Field(() => String, { nullable: true })
  title: string;

  @IsString()
  @Field(() => String, { nullable: true })
  subTitle?: string;

  @IsString()
  @Field(() => String, { nullable: true })
  imagePaths?: string;
}

@ObjectType()
export class CombinedBoardOutput extends CoreOutput {}
