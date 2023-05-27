import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Board } from './entities/board.entity';
import { BoardService } from './board.service';
import { CreateBoardInput, CreateBoardOutput } from './dto/create-board.dto';

@Resolver((of) => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query((returns) => [Board])
  async getBoard(): Promise<Board[]> {
    return this.boardService.getBoards();
  }

  @Mutation((returns) => CreateBoardOutput)
  async createBoard(
    @Args('input') createBoardInput: CreateBoardInput,
  ): Promise<CreateBoardOutput> {
    return this.boardService.CreateBoard(createBoardInput);
  }
}