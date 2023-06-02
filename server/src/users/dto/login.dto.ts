import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CoreOutPut } from 'src/common/dto/core-output.dto';

@InputType()
export class LoginInput {
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
export class LoginOutput extends CoreOutPut {}
