import { InputType, ObjectType, Field } from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dto/core-output.dto';

@InputType()
export class BoardInput {
  @Field((type) => Number, { nullable: true })
  id?: number;
  @Field((type) => String)
  title: string;
  @Field((type) => String)
  description: string;
}

@ObjectType()
export class BoardOutput extends CoreOutput {}
