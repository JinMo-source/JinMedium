import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardOutput } from './dto/board.dto';
import { ImageEntity } from './entities/image.entity';
// import { FetchDataById } from './dto/fetchDataById';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
    private ImageRepository: Repository<ImageEntity>,
  ) {}

  async getBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async CreateBoard(Board_Data): Promise<BoardOutput> {
    const Board_Data_Input = new Board();
    console.log(Board_Data);
    // await this.boardRepository.save({ ...Board_Data });
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

  // async BoardFetchByDataId({ id }: FetchDataById): Promise<Board | undefined> {
  //   const DetailBoard = await this.boardRepository.findOne({ where: { id } });

  //   if (DetailBoard) {
  //     return DetailBoard;
  //   }
  // }

  // async EditBoard({ content }: BoardInput): Promise<BoardOutput> {
  //   await this.boardRepository.update({ content });
  //   try {
  //     return {
  //       ok: true,
  //     };
  //   } catch (error) {
  //     return {
  //       ok: false,
  //       error: 'Could not load boards',
  //     };
  //   }
  // }

  // async DeleteBoard({ id }: FetchDataById): Promise<BoardOutput> {
  //   await this.boardRepository.delete({ id });
  //   try {
  //     return {
  //       ok: true,
  //     };
  //   } catch (error) {
  //     return {
  //       ok: false,
  //       error: 'Could not load boards',
  //     };
  //   }
  // }
}
