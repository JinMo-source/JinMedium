import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';
import { createPostInput } from './dto/CreatePostInput.dto';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query((returns) => [createPostInput])
  AllPost(): Repository<Post> {
    return this.postService.AllPost();
  }
}

// resolver는 graphQL의 행동을 정의하는 곳
// @Query((returns) => [BoardModel])
// getAllBoards(): BoardModel[] {
//   return this.boardService.getAllBoard();
// }
