import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './User.entity';
import { v4 as uuidv4 } from 'uuid';
import { IsArray, IsString } from 'class-validator';

@InputType()
@ObjectType()
@Entity()
export class Verification extends CoreEntity {
  @Column()
  @IsString()
  @Field((type) => String)
  code: string;

  @OneToOne((type) => User, { onDelete: 'CASCADE' })
  @IsArray()
  @JoinColumn()
  user: User;

  @BeforeInsert()
  createCode(): void {
    this.code = uuidv4();
  }
}
