import { Module } from '@nestjs/common';
import { BoardsResolver } from './boards.resolver';

@Module({
  providers: [BoardsResolver],
})
export class BoardsModule {}
