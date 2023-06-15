// ImageEntity.ts
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageEntity extends CoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  imagePath: object[];
}
