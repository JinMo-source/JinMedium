import { Mutation, Query, Resolver } from '@nestjs/graphql';
import BoardService from './service/board.service';
import BoardModel from './model/board.model';

@Resolver(BoardModel)
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  //AllGetBoards
  @Query((returns) => [BoardModel], { nullable: true })
  getAllBoards(): BoardModel[] {
    return this.boardService.getAllBoard();
  }
}
