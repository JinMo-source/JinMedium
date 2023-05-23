import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
class CommentModel {
  @Field((type) => Int)
  id: string;

  @Field()
  content: string;

  @Field((type) => Date)
  createAt: string;
}

export default CommentModel;
