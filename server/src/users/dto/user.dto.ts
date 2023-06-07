import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { CoreOutput } from 'src/common/dto/core-output.dto';

@InputType()
export class UserInput {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @Field(() => String)
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
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  //   @Column()
  //   profile:
}
@ObjectType()
export class UserOutput extends CoreOutput {}
