import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { Verification } from './entities/verification.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailgunService } from 'src/mail/mail.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserResolver, UserService, MailgunService],
  exports: [UserService, TypeOrmModule],
})
export class UsersModule {}
