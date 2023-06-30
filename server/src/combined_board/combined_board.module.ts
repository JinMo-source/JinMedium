import { Module } from '@nestjs/common';
import { CombinedBoardService } from './combined_board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CombinedBoardEntity } from './entities/combined_board.entity';
import { CombinedBoardResolver } from './combined_board.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CombinedBoardEntity])],
  providers: [CombinedBoardService, CombinedBoardResolver],
})
export class CombinedBoardModule {}
