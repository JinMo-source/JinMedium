import { InputType } from '@nestjs/graphql';
import { PostEntity } from '../entities/post.entity';

@InputType()
export class createPostInput extends PostEntity {}
