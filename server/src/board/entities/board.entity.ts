import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/entities/User.entity';

@Entity()
@ObjectType()
export class Board extends CoreEntity {
  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @Field((type) => String)
  @IsNotEmpty()
  @IsString()
  @Column()
  description: string;

  @Field((type) => Array)
  @IsArray()
  @Column()
  hashtag: [];

  @ManyToOne((type) => User, (user) => user.board)
  @JoinColumn()
  @IsArray()
  writer: User;
}
