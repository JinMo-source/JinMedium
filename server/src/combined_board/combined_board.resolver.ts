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
    try {
      const { title, subTitle, imagePath } = combinedBoard;
      console.log(combinedBoard);
      // await this.combinedBoardService.CreateCombinedBoard(title, subTitle);
      await this.combinedBoardService.CreateCombinedImages(
        title,
        subTitle,
        imagePath,
      );
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: `${error}`,
      };
    }
  }
}
