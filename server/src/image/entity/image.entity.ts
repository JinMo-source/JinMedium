import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Operation } from '../../board/dto/board.dto';

@Entity()
export class ImageEntity extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bucketName: string;

  @Column({ type: 'jsonb' })
  imagePath: object[];
}
