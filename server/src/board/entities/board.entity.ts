import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Board extends CoreEntity {
  @Field((type) => String)
  @Column()
  title: string;
}

//1. server - muetation CreatePost, AllPost
//2. client - gql(mutation createPost,getPostAll)
