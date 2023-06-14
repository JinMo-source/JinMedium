import { IsOptional, IsString, IsNumber, IsObject } from 'class-validator';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/core-output.dto';
import { GraphQLJSONObject } from 'graphql-scalars';

@InputType()
class InsertInput {
  @Field((type) => String, { nullable: true })
  insertString?: string;

  @Field((type) => GraphQLJSONObject, { nullable: true })
  insertObject?: Record<string, any>;
}

@InputType()
export class Operation {
  @IsOptional()
  @Field(() => InsertInput, { nullable: true })
  insert?: InsertInput;

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
  @Field(() => [Operation])
  ops: OperationInput[];
}

@ObjectType()
export class BoardOutput extends CoreOutput {}
