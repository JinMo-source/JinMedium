import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import {
  IsArray,
  IsNumber,
  IsObject,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { User } from '../../users/entities/User.entity';

@Entity()
@ObjectType()
export class Board extends CoreEntity {
  @IsArray()
  @Column('text', { array: true, nullable: true })
  content: string[];

  @IsArray()
  @ManyToOne((type) => User, (user) => user.board)
  @JoinColumn({ name: 'User_id' })
  writer: User;
}
