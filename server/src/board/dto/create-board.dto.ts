import { InputType, ObjectType, PickType, Field } from '@nestjs/graphql';
import { Board } from '../entities/board.entity';
import { CoreOutPut } from 'src/common/dto/core-output.dto';

@InputType()
export class CreateBoardInput extends PickType(Board, [
  'title',
  'description',
]) {
  @Field((type) => String)
  title: string;
  @Field((type) => String)
  description: string;
}

@ObjectType()
export class CreateBoardOutput extends CoreOutPut {}
