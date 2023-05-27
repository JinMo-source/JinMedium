import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@ObjectType()
export class Board extends CoreEntity {
  @ApiProperty()
  @Field((type) => String)
  @Column()
  title: string;

  @ApiProperty()
  @Field((type) => String)
  @Column()
  description: string;
}

//1. server - muetation CreatePost, AllPost
//2. client - gql(mutation createPost,getPostAll)
