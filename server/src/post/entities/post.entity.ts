import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PrimaryColumn, Entity, Column } from 'typeorm';

@Entity()
@ObjectType()
export class PostEntity {
  @PrimaryColumn()
  @Field((type) => ID)
  id: number;

  @Field((type) => String)
  @Column()
  title: string;
}
