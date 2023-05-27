import { Field, ID, InputType } from '@nestjs/graphql';
import { PickType } from '@nestjs/swagger';

@InputType()
export class FetchDataById {
  @Field((type) => Number)
  id: number;
}
