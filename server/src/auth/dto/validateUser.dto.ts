import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
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
export class ValidateUserOutput {
  @IsNumber()
  @Field((type) => Number)
  id: number;

  @IsString()
  @Field((type) => String)
  userEmail: string;

  @IsString()
  @Field((type) => String)
  username: string;

  @IsString()
  @Field((type) => String, { nullable: true })
  accessToken: string;

  @IsBoolean()
  @Field((type) => Boolean, { nullable: true })
  verified: boolean;

  @IsEnum(UserRole)
  @Field((type) => UserRole, { nullable: true })
  role: UserRole;
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
