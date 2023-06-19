import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardOutput, Operation } from './dto/board.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async CreateBoard(
    boardTitle: string,
    boardData: Operation[],
    User_Id,
  ): Promise<BoardOutput> {
    const board = new Board();
    board.title = boardTitle;
    board.writer = User_Id;
    board.content = []; // content 배열 초기화

    const images = []; // 배열로 초기화
    const compareImages = [];
    const imagePaths = boardData.filter(async (item) => {
      if (item.insert.insertObject) {
        const imageType = item.insert.insertObject.image
          .split(',')[0]
          .split(':')[1]
          .split(';')[0];

        const insertObjectImage = item.insert.insertObject.image;
        const imageData = item.insert.insertObject.image.split(',')[1];

        const uniqueId = uuidv4();
        const file = {
          originalname: uniqueId,
          buffer: Buffer.from(imageData, 'base64'),
          mimetype: imageType,
        };
        images.push(file);
        compareImages.push([insertObjectImage, file.originalname]);
        return true; // 필터링 조건이 true인 경우에만 유효한 값으로 간주
      }
      return false; // 필터링 조건이 false인 경우에는 유효하지 않은 값으로 간주
    });

    if (imagePaths) {
      const bucketName = 'jinmedium';
      const temporaryBoard = await this.boardRepository.save(board);
      const Board_Id = temporaryBoard.id;

      this.eventEmitter.emit('CompareBoardImages', compareImages, Board_Id);
      // this.eventEmitter.emit('uploadImages', bucketName, images);
    }

    const imageName = images.map((item) => {
      return item.originalname;
    });

    for (const item of boardData) {
      if (item.insert.insertString) {
        const insertString = item.insert.insertString;
        board.content.push(insertString);
      } else if (item.insert.insertObject) {
        // console.log(images);
        const boradImage = { ImagePaths: imageName };
        board.content.push(boradImage);
      }
    }

    await this.boardRepository.save(board);

    return {
      ok: true,
    };
  }
}
