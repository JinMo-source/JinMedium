import { ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IsArray, IsString } from 'class-validator';
import { User } from '../../users/entities/User.entity';

@Entity()
@ObjectType()
export class Board extends CoreEntity {
  @IsString()
  @Column()
  title: string;

  @IsArray()
  @Column({ type: 'jsonb' })
  content: object[];

  @IsArray()
  @ManyToOne((type) => User, (user) => user.board)
  @JoinColumn({ name: 'User_id' })
  writer: User;
}
