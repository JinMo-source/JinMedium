import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { BoardService } from './board.service';
import { AllBoardInput } from './dto/all-board.dto';

@Resolver((of) => Board)
export class BoardResolver {
  constructor(private readonly BoardService: BoardService) {}

  @Query((returns) => [AllBoardInput])
  AllPost(): Repository<Board> {
    return this.BoardService.AllBoard();
  }
}
