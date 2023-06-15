import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { User } from '../../users/entities/User.entity';
import { ImageEntity } from './image.entity';

@Entity()
@ObjectType()
export class Board extends CoreEntity {
  @IsArray()
  @Column({ type: 'jsonb' })
  content: object[];

  @OneToOne(() => ImageEntity, { cascade: true })
  @JoinColumn()
  image: ImageEntity;

  @IsArray()
  @ManyToOne((type) => User, (user) => user.board)
  @JoinColumn({ name: 'User_id' })
  writer: User;
}
