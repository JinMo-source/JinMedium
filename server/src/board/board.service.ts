import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBoardInput, CreateBoardOutput } from './dto/create-board.dto';
import { FetchDataById } from './dto/fetchDataById';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getBoards(): Promise<Board[]> {
    return this.boardRepository.find();
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

  async EditBoard({ id }: FetchDataById): Promise<Board | undefined> {
    const DetailBoard = await this.boardRepository.findOne({ where: { id } });
    if (DetailBoard) {
      return DetailBoard;
    } else {
      return undefined;
    }
  }
}

// 수정 페이지?
// Detail?
