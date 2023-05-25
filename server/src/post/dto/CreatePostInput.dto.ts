import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Post } from '../entities/post.entity';

@ObjectType()
export class createPostInput extends Post {
  @Field((type) => String)
  test: string;
}
