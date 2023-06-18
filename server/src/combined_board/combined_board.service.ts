import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CombinedBoardEntity } from './entities/combined_board.entity';
import { CombinedBoardOutput } from './dto/combined_board.dto';

@Injectable()
export class CombinedBoardService {
  constructor(
    @InjectRepository(CombinedBoardEntity)
    private combinedBoardEntity: CombinedBoardEntity,
  ) {}

  async CreateCombinedBoard(): Promise<CombinedBoardOutput> {
    try {
      return { ok: true };
    } catch (error) {
      return { ok: false, error: `${error}` };
    }
  }
}
