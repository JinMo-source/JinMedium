import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class output {
  @Field((type) => String)
  error?: string;

  @Field((type) => Boolean)
  success: boolean;
}
