import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { UserService } from './service/user.service';
import { UserResolver } from './resolver/user.resolver';
import { Verification } from './entities/verification.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailgunService } from 'src/mail/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', // JWT 비밀 키 설정
      signOptions: { expiresIn: '1d' }, // 토큰 만료 시간 설정 (예: 1일)
    }),
  ],
  providers: [UserResolver, UserService, MailgunService],
  exports: [UserService],
})
export class UsersModule {}
