import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CombinedBoardEntity } from './entities/combined_board.entity';
import { CombinedBoardOutput } from './dto/combined_board.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Board } from 'src/board/entities/board.entity';

@Injectable()
export class CombinedBoardService {
  private ComarpeImages: [string, string][] = [];

  constructor(
    @InjectRepository(CombinedBoardEntity)
    private combinedBoardEntity: Repository<CombinedBoardEntity>,

    private readonly eventEmitter: EventEmitter2,
  ) {}

  async CreateCombinedImages(
    title: string,
    subTitle: string,
    imagePath: string,
  ): Promise<CombinedBoardOutput> {
    try {
      console.log('salkdnvlksdnkvlnasdjklvnjsdkvbnjdsbvkjasd', imagePath);
      const combined = new CombinedBoardEntity();
      combined.title = title;
      combined.subTitle = subTitle;
      this.eventEmitter.removeAllListeners('CompareBoardImages');
      this.eventEmitter.on(
        'CompareBoardImages',
        async (data: [string, string][], board: Board) => {
          console.log(board);
          if (imagePath) {
            this.ComarpeImages.push(...data);
            const isImageMatched = this.CompareImagePathWithData(
              imagePath,
              this.ComarpeImages,
            );
            if (isImageMatched) {
              console.log('이미지 경로와 일치하는 값이 존재합니다.');
              const matchedPaths = this.ComarpeImages.filter(
                (item) => item[0] === imagePath,
              ).map((item) => item[1]);

              combined.imagePath = matchedPaths[0];
              combined.board = Promise.resolve(board);
              await this.combinedBoardEntity.save(combined);
            } else {
              console.log('이미지 경로와 일치하는 값이 존재하지 않습니다');
              const imageData = imagePath.split(',')[1];

              const uniqueId = uuidv4();
              const imageType = imagePath
                .split(',')[0]
                .split(':')[1]
                .split(';')[0];
              const file = {
                originalname: uniqueId,
                buffer: Buffer.from(imageData, 'base64'),
                mimetype: imageType,
              };
              const bucketName = 'jinmedium';
              const images = [];
              images.push(file);
              // this.eventEmitter.emit('uploadImages', bucketName, images);
              combined.imagePath = file.originalname;
              combined.board = Promise.resolve(board);
              await this.combinedBoardEntity.save(combined);
            }
          } else {
            combined.imagePath = imagePath;
            combined.board = Promise.resolve(board);
            await this.combinedBoardEntity.save(combined);
          }
        },
      );

      console.log(this.ComarpeImages);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: `${error}` };
    }
  }

  CompareImagePathWithData(
    imagePath: string,
    data: [string, string][],
  ): boolean {
    for (const [path1, path2] of data) {
      if (path1 === imagePath || path2 === imagePath) {
        return true; // 같은 값이 존재하는 경우 true 반환
      }
    }
    return false; // 같은 값이 없는 경우 false 반환
  }
}
