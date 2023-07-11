import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardGateway } from 'src/websocket/websocket';
import { CombinedBoardEntity } from 'src/combined_board/entities/combined_board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, CombinedBoardEntity])],
  providers: [BoardResolver, BoardService, BoardGateway],
  exports: [BoardService],
})
export class BoardModule {}
