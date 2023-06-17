import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardOutput, Operation } from './dto/board.dto';
import { ImageEntity } from '../image/entity/image.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';

// import { FetchDataById } from './dto/fetchDataById';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,

    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async CreateBoard(boardData: Operation[], User_Id): Promise<BoardOutput> {
    const board = new Board();
    board.content = []; // content 배열 초기화

    const images = []; // 배열로 초기화

    const imagePaths = boardData.filter((item) => {
      if (item.insert.insertObject) {
        const imageType = item.insert.insertObject.image
          .split(',')[0]
          .split(':')[1]
          .split(';')[0];
        const imageData = item.insert.insertObject.image.split(',')[1];
        const uniqueId = uuidv4();
        const file = {
          originalname: uniqueId,
          buffer: Buffer.from(imageData, 'base64'),
          mimetype: imageType,
        };
        images.push(file);
        return true; // 필터링 조건이 true인 경우에만 유효한 값으로 간주
      }
      return false; // 필터링 조건이 false인 경우에는 유효하지 않은 값으로 간주
    });

    if (imagePaths) {
      const bucketName = 'jinmedium';
      // this.eventEmitter.emit('uploadImages', bucketName, images);
    }

    const imageName = images.map((item) => {
      return item.originalname;
    });

    for (const item of boardData) {
      if (item.insert.insertString) {
        board.content.push(item.insert.insertString);
      } else if (item.insert.insertObject) {
        // console.log(images);
        const boradImage = { imageName };
        board.content.push(boradImage);
      }
    }

    board.writer = User_Id;
    // await this.boardRepository.save(board);
    return {
      ok: true,
    };
  }
}
