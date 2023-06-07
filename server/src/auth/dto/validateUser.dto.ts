import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutput } from '../../common/dto/core-output.dto';

@InputType()
export class ValidateUser {
  @IsString()
  @IsNotEmpty()
  @Field((type) => String)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field((type) => String)
  password: string;
}

@ObjectType()
export class ValidateUserOutput {
  @Field((type) => String)
  accessToken: string;
}
