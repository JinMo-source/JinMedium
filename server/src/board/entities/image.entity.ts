// ImageEntity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  imagePath: string;

  // 다른 필드들을 추가로 정의할 수 있습니다.
}
