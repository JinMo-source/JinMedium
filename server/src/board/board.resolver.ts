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
    const GetBoards = await this.boardService.getBoards();
    console.log(GetBoards);
    return GetBoards;
  }

  @Mutation((returns) => BoardOutput)
  async CreateBoard(
    @Args('input') boardInput: BoardInput,
  ): Promise<BoardOutput> {
    const Create = await this.boardService.CreateBoard(boardInput);
    console.group(Create);
    return Create;
  }

  @Query((returns) => Board)
  async BoardFetchByDataId(
    @Args('ID') fetchDataById: FetchDataById,
  ): Promise<Board> {
    const FetchId = await this.boardService.BoardFetchByDataId(fetchDataById);
    console.log(FetchId);
    return FetchId;
  }

  @Mutation((returns) => BoardOutput)
  async EditBoard(@Args('input') boardInput: BoardInput): Promise<BoardOutput> {
    const Edit = await this.boardService.EditBoard(boardInput);
    console.log(Edit);
    return Edit;
  }

  @Mutation((returns) => BoardOutput)
  async DeleteBoard(
    @Args('ID') fetchDataById: FetchDataById,
  ): Promise<BoardOutput> {
    const Delete_board = await this.boardService.DeleteBoard(fetchDataById);
    console.log(Delete_board);
    return Delete_board;
  }
}
