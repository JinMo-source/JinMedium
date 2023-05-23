import { Injectable } from '@nestjs/common';
import BoardModel from '../model/board.model';

@Injectable()
export class BoardService {
  private boards: BoardModel[] = [];

  //Board 전체
  getAllBoard(): BoardModel[] {
    return this.boards;
  }
  //Board 추가
  createBoard(board: BoardModel): BoardModel {
    const newBoard: BoardModel = { ...board };
    this.boards.push(newBoard);
    return newBoard;
  }
}

export default BoardService;
