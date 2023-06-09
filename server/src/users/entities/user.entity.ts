import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsEnum,
} from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Board } from '../../board/entities/board.entity';

export enum UserRole {
  admin = 'admin',
  writer = 'writer',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
@Entity()
@ObjectType()
export class User extends CoreEntity {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
    {
      message: '대소문자, 숫자, 특수문자를 최소 하나씩 포함해야 합니다.',
    },
  )
  @Field((type) => String)
  @Column()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field((type) => UserRole)
  @Column({ nullable: true })
  @IsEnum(UserRole)
  role: UserRole;

  @Column({ default: false })
  @Field((type) => Boolean)
  @IsBoolean()
  verified: boolean;

  @OneToMany((type) => Board, (board) => board.writer, { cascade: true })
  @IsArray()
  board: Board[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }
}
