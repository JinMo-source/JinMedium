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
  @IsString()
  @Field(() => String, { nullable: true })
  insert?: string;

  @IsNumber()
  @Field(() => Number, { nullable: true })
  delete?: number;

  @IsNumber()
  @Field(() => Number, { nullable: true })
  retain?: number;

  @IsObject()
  @Field(() => String, { nullable: true })
  attributes?: Record<string, any>;

  @ManyToOne((type) => User, (user) => user.board)
  @JoinColumn({ name: 'User_id' })
  @IsArray()
  writer: User;
}
