import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { Verification } from 'src/mail/entities/verification.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Verification]),
    EventEmitterModule.forRoot(),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService, TypeOrmModule],
})
export class UsersModule {}
