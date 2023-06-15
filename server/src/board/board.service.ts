import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardOutput, Operation } from './dto/board.dto';
import { ImageEntity } from './entities/image.entity';
import { User } from 'src/users/entities/User.entity';
// import { FetchDataById } from './dto/fetchDataById';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,

    @InjectRepository(ImageEntity)
    private imageRepository: Repository<ImageEntity>,
  ) {}

  async getBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  async CreateBoard(boardData: Operation[], User_Id): Promise<BoardOutput> {
    const board = new Board();
    board.content = []; // content 배열 초기화

    const imageEntity = new ImageEntity();
    imageEntity.imagePath = []; // 배열로 초기화

    const imagePaths = boardData.filter((item) => {
      if (item.insert.insertObject) {
        imageEntity.imagePath.push(item.insert.insertObject);
        console.log(item.insert.insertObject);
        return true; // 필터링 조건이 true인 경우에만 유효한 값으로 간주
      }
      return false; // 필터링 조건이 false인 경우에는 유효하지 않은 값으로 간주
    });

    if (imagePaths) {
      imageEntity.imagePath = imagePaths;
      await this.imageRepository.save(imageEntity);
      board.image = imageEntity;
    }

    for (const item of boardData) {
      if (item.insert.insertString) {
        board.content.push(item.insert.insertString);
      } else if (item.insert.insertObject) {
        const objectId = { imageId: imageEntity.id };
        board.content.push(objectId);
      }
    }

    // const imageId = await this.imageRepository.findOne({
    //   where: { imagePath },
    // });
    // console.log(imageId);
    board.writer = User_Id;
    await this.boardRepository.save(board);
    return {
      ok: true,
    };
  }
}
