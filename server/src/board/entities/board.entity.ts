import { Field, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../users/entities/User.entity';

@Entity()
@ObjectType()
export class Board extends CoreEntity {
  @Field((type) => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  @Column()
  content: string;

  @Field((type) => [String])
  @Column({ type: 'varchar', array: true, nullable: true })
  hashtag: string[];

  @ManyToOne((type) => User, (user) => user.board)
  @JoinColumn({ name: 'User_id' })
  @IsArray()
  writer: User;
}
