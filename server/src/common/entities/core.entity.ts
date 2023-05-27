import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @Field((type) => Number)
  id: number;

  @CreateDateColumn()
  @ApiProperty()
  @Field((type) => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  @Field((type) => Date)
  updatedAt: Date;
}
