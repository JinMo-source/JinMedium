import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Board } from '../entities/board.entity';
import { output } from 'src/common/dto/output.dto';

@InputType()
export class AllBoardInput extends Board {}

@ObjectType()
export class AllBoardOutput extends output {}
