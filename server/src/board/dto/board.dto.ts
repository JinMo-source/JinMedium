import { IsString } from 'class-validator';

export class Board {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
// PartialType
