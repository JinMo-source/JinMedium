import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AllBoardOutput } from './dto/all-board.dto';
import { CreateBoardInput, CreateBoardOutput } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async AllBoard(): Promise<AllBoardOutput> {
    try {
      const allBoards: Board[] = await this.boardRepository.find();
      return {
        ok: true,
        boards: allBoards,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load boards',
      };
    }
  }

  async CreateBoard({
    title,
    description,
  }: CreateBoardInput): Promise<CreateBoardOutput> {
    await this.boardRepository.save({ title, description });
    try {
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error: 'Could not load boards',
      };
    }
  }
}
