import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

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
  @Field(() => String)
  @Column({ select: false })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  //   @Column()
  //   profile:
}
