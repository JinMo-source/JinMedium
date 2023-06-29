import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { boolean } from 'joi';
import { UserRole } from 'src/users/entities/User.entity';

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
export class LoginOutput {
  @IsString()
  @Field((type) => String)
  userEmail: string;

  @IsBoolean()
  @Field((type) => Boolean)
  isLoggedIn: boolean;

  @IsString()
  @Field((type) => String, { nullable: true })
  accessToken: string;
}

@InputType()
export class RefreshTokenInput {
  @IsString()
  @Field((type) => String, { nullable: true })
  accessToken: string;
}

@ObjectType()
export class RefreshTokenOutput {
  @IsString()
  @Field((type) => String, { nullable: true })
  newAccessToken: string;

  @IsDate()
  @Field(() => Date)
  expiresInMs: Date;
}
