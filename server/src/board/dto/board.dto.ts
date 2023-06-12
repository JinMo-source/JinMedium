import { InputType, ObjectType, Field } from '@nestjs/graphql';

import { CoreOutput } from 'src/common/dto/core-output.dto';

@InputType()
export class BoardInput {
  @Field((type) => String, { nullable: true })
  content: string;
}

@ObjectType()
export class BoardOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  content?: string;
}
