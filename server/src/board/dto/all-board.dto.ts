import { InputType, ObjectType, Field, PickType } from '@nestjs/graphql';
import { Board } from '../entities/board.entity';
import { CoreOutPut } from 'src/common/dto/core-output.dto';
import { title } from 'process';

@ObjectType()
export class AllBoardOutput extends CoreOutPut {
  @Field((type) => [Board], { nullable: true })
  boards?: Board[];
}
