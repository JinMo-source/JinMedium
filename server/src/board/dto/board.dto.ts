import {
  IsOptional,
  IsString,
  IsNumber,
  IsObject,
  IsArray,
} from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/core-output.dto';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
export class Operation {
  @IsOptional()
  @Field(() => GraphQLJSONObject, { nullable: true })
  insert?: Record<string, any>;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  delete?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Number, { nullable: true })
  retain?: number;

  @IsOptional()
  @IsObject()
  @Field(() => GraphQLJSONObject, { nullable: true })
  attributes?: Record<string, any>;
}

@InputType()
export class OperationInput {
  @IsString()
  @Field(() => String, { nullable: true })
  title: string;

  @IsArray()
  @Field(() => [Operation], { nullable: true })
  ops: Operation[];
}

@ObjectType()
export class BoardOutput extends CoreOutput {}
