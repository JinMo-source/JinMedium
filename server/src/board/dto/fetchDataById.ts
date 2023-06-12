import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';
import { BoardInput } from './board.dto';

@InputType()
export class FetchDataById {
  @Field((type) => Number)
  id: number;
}

@ObjectType()
export class FetchDataByIdOutPut extends PickType(BoardInput, ['content']) {}
