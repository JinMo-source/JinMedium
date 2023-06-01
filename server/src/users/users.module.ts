import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { Verification } from './entities/verification.entity';
import { MailgunService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  providers: [UserResolver, UserService, MailgunService],
  exports: [UserService],
})
export class UsersModule {}
