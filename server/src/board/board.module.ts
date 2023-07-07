import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardGateway } from 'src/websocket/websocket';
import { CombinedBoard } from 'src/combined_board/dto/combined_board.dto';

@Module({
  imports: [TypeOrmModule.forFeature([Board, CombinedBoard])],
  providers: [BoardResolver, BoardService, BoardGateway],
  exports: [BoardService],
})
export class BoardModule {}
