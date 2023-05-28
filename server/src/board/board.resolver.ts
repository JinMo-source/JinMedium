import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Board } from './entities/board.entity';
import { BoardService } from './board.service';
import { BoardInput, BoardOutput } from './dto/board.dto';
import { FetchDataById } from './dto/fetchDataById';

@Resolver((of) => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query((returns) => [Board])
  async getBoard(): Promise<Board[]> {
    return this.boardService.getBoards();
  }

  @Mutation((returns) => BoardOutput)
  async CreateBoard(
    @Args('input') boardInput: BoardInput,
  ): Promise<BoardOutput> {
    return this.boardService.CreateBoard(boardInput);
  }

  @Query((returns) => Board)
  async BoardFetchByDataId(
    @Args('ID') fetchDataById: FetchDataById,
  ): Promise<Board> {
    return this.boardService.BoardFetchByDataId(fetchDataById);
  }

  @Mutation((returns) => Board)
  async EditBoard(@Args('input') boardInput: BoardInput): Promise<BoardOutput> {
    return this.boardService.EditBoard(boardInput);
  }

  @Mutation((returns) => BoardOutput)
  async DeleteBoard(
    @Args('input') fetchDataById: FetchDataById,
  ): Promise<BoardOutput> {
    return this.boardService.DeleteBoard(fetchDataById);
  }
}
