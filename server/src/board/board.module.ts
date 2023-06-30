import { Module } from '@nestjs/common';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardGateway } from 'src/websocket/websocket';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardResolver, BoardService, BoardGateway],
  exports: [BoardService],
})
export class BoardModule {}
