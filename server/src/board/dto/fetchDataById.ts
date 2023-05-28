import { Field, ID, InputType, ObjectType, extend } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';
import { Board } from './board.dto';

@InputType()
export class FetchDataById {
  @Field((type) => Number)
  id: number;
}

@ObjectType()
export class FetchDataByIdOutPut extends PickType(Board, [
  'title',
  'description',
]) {}
