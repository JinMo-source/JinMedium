import { Board } from './entities/board.entity';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { OperationInput, BoardOutput } from './dto/board.dto';
// import { FetchDataById } from './dto/fetchDataById';
import { User } from 'src/users/entities/User.entity';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';

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
  @UseGuards(GqlAuthGuard) // GraphQL 요청에 대해 인증을 검사하는 Guard 적용
  async CreateBoard(
    @Args('input') operationInput: OperationInput,
    @CurrentUser() user: User, // 현재 인증된 사용자 정보를 주입받음
    @Context() context: any, // NestJS 컨텍스트 객체를 주입받음
  ): Promise<BoardOutput> {
    // console.log('Current User:', user.id);
    // console.log('Context:', context);
    const Board_Data = operationInput.ops;

    const createResult = await this.boardService.CreateBoard(Board_Data);
    if (createResult.ok) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: createResult.error,
      };
    }
  }

  // @Query((returns) => Board)
  // async BoardFetchByDataId(
  //   @Args('ID') fetchDataById: FetchDataById,
  // ): Promise<Board> {
  //   const FetchId = await this.boardService.BoardFetchByDataId(fetchDataById);
  //   console.log(FetchId);
  //   return FetchId;
  // }

  // @Mutation((returns) => BoardOutput)
  // // async EditBoard(@Args('input') boardInput: BoardInput): Promise<BoardOutput> {
  // //   const Edit = await this.boardService.EditBoard(boardInput);
  // //   console.log(Edit);
  // //   return Edit;
  // // }

  // @Mutation((returns) => BoardOutput)
  // async DeleteBoard(
  //   @Args('ID') fetchDataById: FetchDataById,
  // ): Promise<BoardOutput> {
  //   const Delete_board = await this.boardService.DeleteBoard(fetchDataById);
  //   console.log(Delete_board);
  //   return Delete_board;
  // }
}
