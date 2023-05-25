import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostEntity {
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  title: string;

  @Field((type) => [String], { nullable: true })
  hashtags?: string[];
}
