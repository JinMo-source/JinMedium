import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { User } from 'src/users/entities/User.entity';
import { UsersModule } from 'src/users/Users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Verification, User]), UsersModule],
  providers: [MailController, MailService],
  exports: [MailService],
})
export class MailModule {}
