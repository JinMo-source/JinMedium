import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from './entity/image.entity';
@Injectable()
export class ImageService {
  private s3: S3Client;

  constructor(
    private readonly eventEmitter: EventEmitter2,
    @InjectRepository(ImageEntity)
    private imageEntity: ImageEntity,
  ) {
    this.s3 = new S3Client({
      region: 'ap-northeast-2', // AWS 리전 정보
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }, // 직접 AWS 액세스 키와 시크릿 키 지정
    });
    this.eventEmitter.on('uploadImages', this.uploadImages.bind(this));
  }

  async uploadImage(
    bucketName: string,
    imageName: string,
    imageBuffer: Buffer,
    imageMimetype: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: imageName,
      Body: imageBuffer,
      ContentType: imageMimetype,
    });
    console.log('ImUpload', command);
    const response: PutObjectCommandOutput = await this.s3.send(command);

    if (response.$metadata.httpStatusCode) {
      console.log(response.$metadata.httpStatusCode);
      return;
    } else {
      throw new Error('Failed to get the image URL');
    }
  }

  async uploadImages(
    bucketName: string,
    images: Express.Multer.File[],
  ): Promise<string[]> {
    console.log(bucketName);
    const uploadPromises = images.map(async (image) => {
      const imageName = image.originalname;
      const imageBuffer = image.buffer;
      const imageMimetype = image.mimetype;
      const imageUrl = await this.uploadImage(
        bucketName,
        imageName,
        imageBuffer,
        imageMimetype,
      );
      return imageUrl;
    });

    // Wait for all upload promises to resolve and return an array of image URLs
    return Promise.all(uploadPromises);
  }
}
