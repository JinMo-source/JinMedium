import { Board } from './entities/board.entity';
import { Args, Mutation, Resolver, Query, Context } from '@nestjs/graphql';
import { BoardService } from './board.service';
import { OperationInput, BoardOutput, Operation } from './dto/board.dto';
// import { FetchDataById } from './dto/fetchDataById';
import { User } from 'src/users/entities/User.entity';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GetRecentBoard, GetRecentCombinedBoard } from './dto/getboard.dto';

@Resolver(() => Board)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Mutation(() => BoardOutput)
  @UseGuards(GqlAuthGuard) // GraphQL 요청에 대해 인증을 검사하는 Guard 적용
  async CreateBoard(
    @Args('input') operationInput: OperationInput,
    @CurrentUser() user: User, // 현재 인증된 사용자 정보를 주입받음
    @Context() context: any, // NestJS 컨텍스트 객체를 주입받음
  ): Promise<BoardOutput> {
    // console.log('Current User:', user);
    // console.log('Context:', context);
    const boardTitle = operationInput.title as string;
    const boardData = operationInput.ops as Operation[];
    const User_Id = user.id;

    console.log(boardData);
    const createResult = await this.boardService.CreateBoard(
      boardTitle,
      boardData,
      User_Id,
    );
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

  @Query(() => [GetRecentBoard])
  async GetRecentBoard(): Promise<any> {
    const GetRecentBoard = await this.boardService.getRecentBoard();
    console.log(GetRecentBoard);
    return GetRecentBoard;
  }
}
