import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostEntity } from './entities/post.entity';
import { Query } from '@nestjs/common';

@Resolver((of) => PostEntity)
export class PostResolver {}

// resolver는 graphQL의 행동을 정의하는 곳
