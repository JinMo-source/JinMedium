import { IsArray } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/core-output.dto';

@InputType()
export class TagsInput {
  @IsArray()
  @Field(() => [String], { nullable: true })
  tags?: string[];
}

@ObjectType()
export class TagsOutput extends CoreOutput {}
