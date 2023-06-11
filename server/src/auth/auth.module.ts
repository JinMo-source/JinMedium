import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UserService } from 'src/users/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/User.entity';
import { AuthResolver } from './auth.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/Users.module';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: 'askncsajkncjsa',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    UserService,
    TypeOrmModule,
    JwtStrategy,
    JwtService,
  ],
})
export class AuthModule {}
