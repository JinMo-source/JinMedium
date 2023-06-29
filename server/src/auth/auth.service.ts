import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/User.entity';
import { UserService } from '../users/service/user.service';
import { ValidateUser, LoginOutput } from './dto/validateUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshToken } from './entities/userToken.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,

    @InjectRepository(RefreshToken)
    private refreshTokenEntity: Repository<RefreshToken>,
    @InjectRepository(User)
    private userEntity: Repository<User>,
  ) {}

  async validateUser(validateUser: ValidateUser): Promise<User | null> {
    try {
      const user = await this.userService.findByEmail(validateUser.email);
      if (
        user &&
        (await bcrypt.compare(validateUser.password, user.password))
      ) {
        return user;
      }
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async validateUserByEmail(userEmail: string): Promise<User | null> {
    const user = await this.userService.findByEmail(userEmail);
    if (user) {
      return user;
    }
    return null;
  }

  async login(validateUser: ValidateUser): Promise<LoginOutput> {
    const user = await this.validateUser(validateUser);
    if (user) {
      const expirationTime = new Date();

      const payload = {
        username: user.username,
        email: user.email,
      };
      const accessToken = this.jwtService.sign(payload);

      const refreshTokenPayload = { userId: user.id }; // 예시로 사용자 ID를 refreshToken 페이로드에 포함
      const refreshToken = this.jwtService.sign(refreshTokenPayload, {
        expiresIn: '7d',
      });

      const newRefreshToken = new RefreshToken();
      newRefreshToken.user = user;
      newRefreshToken.refreshToken = refreshToken;
      newRefreshToken.expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000,
      ); // 7일 후의 시간을 설정
      // await this.refreshTokenEntity.save(newRefreshToken);
      await this.userEntity.findOne({ where: { id: user.id } });
      return {
        userEmail: user.email,
        isLoggedIn: true,
        accessToken,
      };
    }
    // 사용자 인증 실패 시에는 예외 처리 등을 수행할 수 있습니다.
    throw new Error('사용자 인증에 실패했습니다.');
  }

  async RefreshAccessToken(userEmail: string) {
    const checkRefreshToken = await this.userEntity.findOne({
      where: { email: userEmail },
      relations: ['refreshToken'],
    });
    console.log(userEmail);
    if (checkRefreshToken) {
      const userData = await this.userEntity.findOne({
        where: { email: userEmail },
      });
      const payload = { username: userData.username, email: userData.email };
      const newAccessToken = this.jwtService.sign(payload);

      return { accessToken: newAccessToken };
    }
    // Else일때 추가 해야함
  }
}
