import { Field, Int, ID, ObjectType } from '@nestjs/graphql';
import Comment from './comment.model';

@ObjectType()
export class Board {
  @Field((type) => Int)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field((type) => [String])
  photo: string[];

  @Field((type) => [String])
  genres: string[];

  @Field((type) => [String], { nullable: true })
  hashtags?: string[];

  @Field((type) => [Comment], { nullable: true })
  comments?: Comment[];

  @Field()
  likes: number;

  @Field((type) => Int)
  views: number;

  @Field((type) => Date)
  createAt: Date;
}

export default Board;
