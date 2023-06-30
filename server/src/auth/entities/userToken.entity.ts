import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/entities/User.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class RefreshToken {
  @PrimaryGeneratedColumn()
  @Field(() => Number)
  id: number;

  @Column()
  @Field(() => String)
  refreshToken: string;

  @Column({ type: 'date' })
  @Field(() => Date)
  expiresAt: Date;

  @OneToOne(() => User, (user) => user.refreshToken, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
