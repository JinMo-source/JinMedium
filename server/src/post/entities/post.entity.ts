import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryColumn, Entity, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Post {
  @PrimaryColumn()
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  @Column()
  title: string;
}
