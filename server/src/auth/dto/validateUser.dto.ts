import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  @Field((type) => String)
  accessToken: string;
}
