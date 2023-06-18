import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CombinedBoardService } from './combined_board.service';
import { CombinedBoard, CombinedBoardOutput } from './dto/combined_board.dto';
import { CombinedBoardEntity } from './entities/combined_board.entity';

@Resolver(() => CombinedBoardEntity)
export class CombinedBoardResolver {
  constructor(private readonly combinedBoardService: CombinedBoardService) {}

  @Mutation((returns) => CombinedBoardOutput)
  async CreateCombinedBoard(
    @Args('input') combinedBoard: CombinedBoard,
  ): Promise<CombinedBoardOutput> {
    const { title, subTitle, imagePaths } = combinedBoard;
    // const combined_board = new Board();
    return this.combinedBoardService.CreateCombinedBoard();
  }
}
